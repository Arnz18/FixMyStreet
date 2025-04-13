import React, { useState, useEffect } from 'react';

const GeoLocationButton = ({ onLocationDetected }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setIsLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        onLocationDetected({ lat: latitude, lng: longitude });
        setIsLoading(false);
      },
      (err) => {
        setError(`Error getting location: ${err.message}`);
        setIsLoading(false);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  };

  return (
    <div className="geolocation-control">
      <button 
        className="btn-outline location-btn"
        onClick={detectLocation}
        disabled={isLoading}
      >
        {isLoading ? 'Detecting...' : 'Use My Current Location'} 📍
      </button>
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

// Enhanced MapPreview component with geolocation
const MapPreviewWithGeolocation = () => {
  const [activeTab, setActiveTab] = useState('citizen');
  const [userLocation, setUserLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  
  const mockIssues = [
    { id: 1, type: "Pothole", severity: "High", status: "In Progress", lat: 40, lng: -70 },
    { id: 2, type: "Broken Pavement", severity: "Medium", status: "Reported", lat: 40.05, lng: -70.1 },
    { id: 3, type: "Road Damage", severity: "Low", status: "Resolved", lat: 39.95, lng: -70.15 }
  ];

  // Handle detected location
  const handleLocationDetected = (location) => {
    setUserLocation(location);
    setSelectedLocation(location);
    // In a real implementation, you would update the map view to center on this location
    console.log("Location detected:", location);
  };

  // Simulate map click to set a manual location
  const handleMapClick = (e) => {
    // In a real map implementation, you would get coords from the event
    // Here we're just simulating it with random values near the user's location
    if (userLocation) {
      const newLocation = {
        lat: userLocation.lat + (Math.random() * 0.01 - 0.005),
        lng: userLocation.lng + (Math.random() * 0.01 - 0.005)
      };
      setSelectedLocation(newLocation);
    }
  };

  return (
    <section className="map-preview-section">
      <div className="container">
        <div className="section-header">
          <h2>Interactive Maps for Everyone</h2>
          <p>Seamless experience for both citizens and municipal authorities</p>
          
          <div className="tabs">
            <button 
              className={`tab ${activeTab === 'citizen' ? 'active' : ''}`}
              onClick={() => setActiveTab('citizen')}
            >
              Citizen View
            </button>
            <button 
              className={`tab ${activeTab === 'authority' ? 'active' : ''}`}
              onClick={() => setActiveTab('authority')}
            >
              Authority Dashboard
            </button>
          </div>
        </div>
        
        <div className="map-container">
          <div className="map-interface">
            <div className="map-placeholder" onClick={handleMapClick}>
              <img src="/api/placeholder/800/500" alt="Interactive Map" />
              
              {/* Mock issue markers */}
              <div className="map-markers">
                {mockIssues.map(issue => (
                  <div 
                    key={issue.id}
                    className={`marker ${issue.severity.toLowerCase()} ${issue.status.toLowerCase().replace(' ', '-')}`}
                    style={{ 
                      top: `${Math.random() * 80 + 10}%`, 
                      left: `${Math.random() * 80 + 10}%` 
                    }}
                    title={`${issue.type} - ${issue.severity} - ${issue.status}`}
                  />
                ))}
                
                {/* User's current location marker */}
                {userLocation && (
                  <div 
                    className="marker user-location"
                    style={{ 
                      top: '50%', 
                      left: '50%' 
                    }}
                    title="Your location"
                  />
                )}
                
                {/* Selected location marker */}
                {selectedLocation && selectedLocation !== userLocation && (
                  <div 
                    className="marker selected-location"
                    style={{ 
                      top: '45%', 
                      left: '55%' 
                    }}
                    title="Selected location"
                  />
                )}
              </div>
            </div>
            
            <div className="map-sidebar">
              <h3>{activeTab === 'citizen' ? 'Report an Issue' : 'Issue Analytics'}</h3>
              
              {activeTab === 'citizen' ? (
                <div className="citizen-controls">
                  <GeoLocationButton onLocationDetected={handleLocationDetected} />
                  
                  {selectedLocation && (
                    <div className="location-info">
                      <p><strong>Selected Location:</strong></p>
                      <p>Lat: {selectedLocation.lat.toFixed(5)}</p>
                      <p>Lng: {selectedLocation.lng.toFixed(5)}</p>
                      <p className="location-help">Click elsewhere on the map to change location</p>
                    </div>
                  )}
                  
                  <div className="form-group">
                    <label>Issue Type</label>
                    <select>
                      <option>Pothole</option>
                      <option>Broken Pavement</option>
                      <option>Road Damage</option>
                      <option>Other</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Upload Photo</label>
                    <button className="btn-outline">Choose File</button>
                  </div>
                  
                  <div className="form-group">
                    <label>Description</label>
                    <textarea placeholder="Describe the issue..."></textarea>
                  </div>
                  
                  <button className="btn-primary" disabled={!selectedLocation}>
                    Submit Report
                  </button>
                </div>
              ) : (
                <div className="authority-controls">
                  {/* Same as before */}
                  <div className="stats-summary">
                    <div className="stat">
                      <h4>24</h4>
                      <p>Open Issues</p>
                    </div>
                    <div className="stat">
                      <h4>12</h4>
                      <p>In Progress</p>
                    </div>
                    <div className="stat">
                      <h4>156</h4>
                      <p>Resolved</p>
                    </div>
                  </div>
                  
                  <div className="issue-filter">
                    <label>Filter by:</label>
                    <select>
                      <option>All Issues</option>
                      <option>High Severity</option>
                      <option>Recent Reports</option>
                      <option>Most Voted</option>
                    </select>
                  </div>
                  
                  <div className="issue-list">
                    {mockIssues.map(issue => (
                      <div key={issue.id} className={`issue-item ${issue.severity.toLowerCase()}`}>
                        <span className="issue-type">{issue.type}</span>
                        <span className={`issue-status ${issue.status.toLowerCase().replace(' ', '-')}`}>
                          {issue.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapPreviewWithGeolocation;