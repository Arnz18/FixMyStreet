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
        return response()->json([
            'complaints' => Complaint::with('user:id,name,email')->latest()->get()
        ]);
    }

    /**
     * Store a newly created complaint.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'image' => 'required|image|max:5048', // 5MB max
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'issue_type' => 'required|in:pothole,road_damage,drainage,other',
            'details' => 'required|string|max:500',
        ]);

        // Handle image upload
        $path = $request->file('image')->store('complaints', 'public');
        
        // Create the complaint
        $complaint = $request->user()->complaints()->create([
            'image_path' => $path,
            'latitude' => $validated['latitude'],
            'longitude' => $validated['longitude'],
            'issue_type' => $validated['issue_type'],
            'details' => $validated['details'],
            'status' => 'reported',
        ]);

        return response()->json([
            'message' => 'Complaint reported successfully',
            'complaint' => $complaint
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
