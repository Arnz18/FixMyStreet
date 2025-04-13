/***********************************************************************
 * Import Dependencies
 * ---------------------------------------------------------------------
 * Import the React library and the useState hook for managing component
 * state within this functional component.
 ***********************************************************************/
import React, { useState } from 'react';

/***********************************************************************
 * MapPreview Component
 * ---------------------------------------------------------------------
 * This component represents an interactive map preview with a dual-view
 * system: one for citizens and another for municipal authorities. It 
 * utilizes a tab interface to switch between views and displays a mocked 
 * set of issue markers on a placeholder map image.
 ***********************************************************************/
const MapPreview = () => {

    /***********************************************************************
   * State: activeTab
   * ---------------------------------------------------------------------
   * Manages the current active tab ('citizen' or 'authority').
   ***********************************************************************/
  const [activeTab, setActiveTab] = useState('citizen');
  
  /***********************************************************************
   * Mock Data: mockIssues
   * ---------------------------------------------------------------------
   * This array holds sample data representing road issues with properties 
   * such as id, type, severity, status, and coordinates (lat, lng). It is 
   * used to simulate markers on the map.
   ***********************************************************************/
  const mockIssues = [
    { id: 1, type: "Pothole", severity: "High", status: "In Progress", lat: 40, lng: -70 },
    { id: 2, type: "Broken Pavement", severity: "Medium", status: "Reported", lat: 40.05, lng: -70.1 },
    { id: 3, type: "Road Damage", severity: "Low", status: "Resolved", lat: 39.95, lng: -70.15 }
  ];

  /***********************************************************************
   * Component Rendering
   * ---------------------------------------------------------------------
   * Returns the main JSX structure for the map preview section. This 
   * structure includes:
   *   - A header with the section title and a description.
   *   - Tabs for toggling between 'Citizen View' and 'Authority Dashboard'.
   *   - A map display area with a placeholder image and dynamic issue markers.
   *   - A sidebar that changes content based on the active tab.
   ***********************************************************************/
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
            <div className="map-placeholder">
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
              </div>
            </div>
            
            <div className="map-sidebar">
              <h3>{activeTab === 'citizen' ? 'Report an Issue' : 'Issue Analytics'}</h3>
              
              {activeTab === 'citizen' ? (
                /*******************************************************************
                 * Citizen Controls Section
                 * -----------------------------------------------------------------
                 * Provides a form for citizens to report an issue. It includes:
                 *   - A dropdown for selecting the issue type.
                 *   - A button to upload a photo.
                 *   - A textarea for additional description.
                 *   - A submit button to report the issue.
                 *******************************************************************/
                <div className="citizen-controls">
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
                  
                  <button className="btn-primary">Submit Report</button>
                </div>
              ) : (
                /*******************************************************************
                 * Authority Controls Section
                 * -----------------------------------------------------------------
                 * This section is designed for municipal authorities and includes:
                 *   - A summary of issue statistics (open, in progress, resolved).
                 *   - A filter to narrow down the displayed issues.
                 *   - A list of issues rendered using the mock data.
                 *******************************************************************/
                <div className="authority-controls">
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

/***********************************************************************
 * Export Component
 * ---------------------------------------------------------------------
 * Export the MapPreview component as the default export so it can be 
 * imported and used in other parts of the application.
 ***********************************************************************/
export default MapPreview;