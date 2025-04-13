<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Complaint extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'user_id',
        'image_path',
        'latitude',
        'longitude',
        'issue_type',
        'details',
        'status',
        'severity'
    ];
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
