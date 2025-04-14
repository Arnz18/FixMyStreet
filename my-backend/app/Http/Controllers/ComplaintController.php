<?php

namespace App\Http\Controllers;

use App\Models\Complaint;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ComplaintController extends Controller
{
    /**
     * Display a listing of all complaints (admin only).
     */
    public function index()
    {
        // This would typically have admin authorization
        // Changed to retrieve ALL complaints, not just the current user's
        $complaints = Complaint::with('user:id,name,email')->latest()->get();
        
        return response()->json([
            'complaints' => $complaints
        ]);
    }

    /**
     * Store a newly created complaint.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg|max:5048', // 5MB max
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'issue_type' => 'required|in:Pothole,Roa Damage,Broken Pavement,Other',
            'details' => 'required|string|max:500',
        ]);
    
        // Handle image upload
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('complaints', 'public');
            $imageFullPath = storage_path('app/public/' . $imagePath);
            
            // Call AI service for road damage verification
            try {
                $client = new \GuzzleHttp\Client();
                $response = $client->post('http://localhost:5000/analyze', [
                    'multipart' => [
                        [
                            'name' => 'image',
                            'contents' => fopen($imageFullPath, 'r')
                        ]
                    ]
                ]);
                
                $aiResult = json_decode($response->getBody(), true);
                $severity = $aiResult['severity'] ?? 'low';
                $damageDetected = $aiResult['damage_detected'] ?? false;
                $damageScore = $aiResult['final_score'] ?? 0;
            } catch (\Exception $e) {
                // If AI service fails, default to low severity
                $severity = 'low';
                $damageDetected = false;
                $damageScore = 0;
                \Log::error('AI service error: ' . $e->getMessage());
            }
        } else {
            return response()->json(['message' => 'Image file is required'], 422);
        }
    
        // Create the complaint
        $complaint = $request->user()->complaints()->create([
            'image_path' => $imagePath,
            'latitude' => $validated['latitude'],
            'longitude' => $validated['longitude'],
            'issue_type' => $validated['issue_type'],
            'details' => $validated['details'],
            'status' => 'reported',
            'severity' => $severity,
            'damage_score' => $damageScore,
            'is_verified' => $damageDetected
        ]);
    
        return response()->json([
            'message' => 'Complaint reported successfully',
            'complaint' => $complaint,
            'image_url' => asset('storage/' . $imagePath),
            'ai_analysis' => $aiResult ?? null
        ], 201);
    }
    

    /**
     * Display the specified complaint.
     */
    public function show(Complaint $complaint)
    {
        // Authorization check would go here
        return response()->json(['complaint' => $complaint]);
    }

    /**
     * Update the specified complaint status (admin only).
     */
    public function update(Request $request, $id)
    {
        // This would typically have admin authorization
        $complaint = Complaint::findOrFail($id);
        
        $validated = $request->validate([
            'status' => 'required|in:reported,in_progress,resolved',
            'severity' => 'sometimes|nullable|in:low,medium,high',
        ]);

        $complaint->update($validated);

        return response()->json([
            'message' => 'Complaint updated successfully',
            'complaint' => $complaint
        ]);
    }

    /**
     * Get all complaints for the authenticated user.
     */
    public function userReports(Request $request)
    {
        return response()->json([
            'complaints' => $request->user()->complaints()->latest()->get()
        ]);
    }
}
