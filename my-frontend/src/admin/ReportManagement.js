import React, { useState } from 'react';
import '../styles/Adminglobal.css';

const ReportManagement = () => {
  // Mock data for reports
  const [reports, setReports] = useState([
    { 
      id: 'REP-2025-1089', 
      type: 'Pothole', 
      location: '24 Park Avenue', 
      severity: 'High', 
      status: 'Pending', 
      reportedAt: '2025-04-13T09:45:00',
      reportedBy: 'Rajesh Kumar',
      assignedTo: null,
      images: ['/images/pothole1.jpg'],
      description: 'Large pothole approximately 30cm wide and 10cm deep. Causing traffic to swerve dangerously.',
      aiVerified: true,
      aiSeverity: 'High',
      upvotes: 12
    },
    { 
      id: 'REP-2025-1088', 
      type: 'Broken Pavement', 
      location: 'Gandhi Road', 
      severity: 'Medium', 
      status: 'In Progress', 
      reportedAt: '2025-04-13T08:30:00',
      reportedBy: 'Priya Sharma',
      assignedTo: 'Roads & Infrastructure',
      images: ['/images/pavement1.jpg'],
      description: 'Broken pavement creating trip hazard for pedestrians, especially elderly residents.',
      aiVerified: true,
      aiSeverity: 'Medium',
      upvotes: 8
    },
    { 
      id: 'REP-2025-1087', 
      type: 'Road Damage', 
      location: 'Nehru Street', 
      severity: 'Low', 
      status: 'Resolved', 
      reportedAt: '2025-04-12T16:20:00',
      reportedBy: 'Amit Patel',
      assignedTo: 'Public Works',
      images: ['/images/road1.jpg'],
      description: 'Minor cracks in the road surface. Not urgent but could worsen with monsoon rains.',
      aiVerified: true,
      aiSeverity: 'Low',
      upvotes: 3,
      resolvedAt: '2025-04-13T10:15:00',
      resolutionNotes: 'Applied quick-set asphalt to prevent water ingress and further damage.'
    },
    { 
      id: 'REP-2025-1086', 
      type: 'Pothole', 
      location: 'MG Road', 
      severity: 'High', 
      status: 'In Progress', 
      reportedAt: '2025-04-12T14:15:00',
      reportedBy: 'Sanjay Verma',
      assignedTo: 'Roads & Infrastructure',
      images: ['/images/pothole2.jpg'],
      description: 'Deep pothole near busy intersection causing vehicles to brake suddenly. Multiple near-misses observed.',
      aiVerified: true,
      aiSeverity: 'High',
      upvotes: 24
    },
    { 
      id: 'REP-2025-1085', 
      type: 'Street Light Broken', 
      location: 'Indira Nagar', 
      severity: 'Medium', 
      status: 'Assigned', 
      reportedAt: '2025-04-12T11:30:00',
      reportedBy: 'Neha Gupta',
      assignedTo: 'Municipal Services',
      images: ['/images/light1.jpg'],
      description: 'Street light not working for past 3 days, creating safety concerns in residential area.',
      aiVerified: false,
      aiSeverity: null,
      upvotes: 7
    }
  ]);

  const [filter, setFilter] = useState({
    severity: '',
    status: '',
    type: ''
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'

  // Filter reports based on search and filter criteria
  const filteredReports = reports.filter(report => {
    const matchesSearch = 
      report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reportedBy.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSeverity = filter.severity ? report.severity === filter.severity : true;
    const matchesStatus = filter.status ? report.status === filter.status : true;
    const matchesType = filter.type ? report.type === filter.type : true;
    
    return matchesSearch && matchesSeverity && matchesStatus && matchesType;
  });

  // Get unique values for filters
  const severities = [...new Set(reports.map(report => report.severity))];
  const statuses = [...new Set(reports.map(report => report.status))];
  const types = [...new Set(reports.map(report => report.type))];

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Update report status
  const updateReportStatus = (id, newStatus) => {
    setReports(reports.map(report => {
      if (report.id === id) {
        const updatedReport = { ...report, status: newStatus };
        if (newStatus === 'Resolved') {
          updatedReport.resolvedAt = new Date().toISOString();
        }
        return updatedReport;
      }
      return report;
    }));
    
    if (selectedReport && selectedReport.id === id) {
      setSelectedReport(prev => ({ ...prev, status: newStatus }));
    }
  };

  // Assign report to department
  const assignReport = (id, department) => {
    setReports(reports.map(report => {
      if (report.id === id) {
        const updatedReport = { 
          ...report, 
          assignedTo: department,
          status: report.status === 'Pending' ? 'Assigned' : report.status
        };
        return updatedReport;
      }
      return report;
    }));
    
    if (selectedReport && selectedReport.id === id) {
      setSelectedReport(prev => ({ 
        ...prev, 
        assignedTo: department,
        status: prev.status === 'Pending' ? 'Assigned' : prev.status
      }));
    }
  };

  // Get status class for styling
  const getStatusClass = (status) => {
    switch(status.toLowerCase()) {
      case 'resolved':
        return 'status-resolved';
      case 'in progress':
        return 'status-in-progress';
      case 'assigned':
        return 'status-assigned';
      case 'pending':
      default:
        return 'status-pending';
    }
  };
  
  // Get severity class for styling
  const getSeverityClass = (severity) => {
    switch(severity.toLowerCase()) {
      case 'high':
        return 'severity-high';
      case 'medium':
        return 'severity-medium';
      case 'low':
        return 'severity-low';
      default:
        return '';
    }
  };

  return (
    <div className="report-management-container">
      <h1 className="report-management-title">Report Management</h1>
      
      <div className="report-management-actions">
        <div className="search-filter-container">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search reports by ID, location, or description"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filters-container">
            <select 
              value={filter.severity} 
              onChange={(e) => setFilter({...filter, severity: e.target.value})}
              className="filter-select"
            >
              <option value="">All Severities</option>
              {severities.map(severity => (
                <option key={severity} value={severity}>{severity}</option>
              ))}
            </select>
            
            <select 
              value={filter.status} 
              onChange={(e) => setFilter({...filter, status: e.target.value})}
              className="filter-select"
            >
              <option value="">All Statuses</option>
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            
            <select 
              value={filter.type} 
              onChange={(e) => setFilter({...filter, type: e.target.value})}
              className="filter-select"
            >
              <option value="">All Types</option>
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="view-toggle">
          <button 
            className={`btn-view ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            📋 List View
          </button>
          <button 
            className={`btn-view ${viewMode === 'map' ? 'active' : ''}`}
            onClick={() => setViewMode('map')}
          >
            🗺️ Map View
          </button>
        </div>
      </div>
      
      {viewMode === 'list' ? (
        <div className="reports-table-container">
          <table className="reports-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Location</th>
                <th>Severity</th>
                <th>Status</th>
                <th>Reported</th>
                <th>Assigned To</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map(report => (
                <tr key={report.id}>
                  <td>{report.id}</td>
                  <td>{report.type}</td>
                  <td>{report.location}</td>
                  <td>
                    <span className={`severity-indicator ${getSeverityClass(report.severity)}`}>
                      {report.severity}
                    </span>
                  </td>
                  <td>
                    <span className={`status-indicator ${getStatusClass(report.status)}`}>
                      {report.status}
                    </span>
                  </td>
                  <td>{formatDate(report.reportedAt)}</td>
                  <td>{report.assignedTo || 'Unassigned'}</td>
                  <td className="action-buttons">
                    <button 
                      className="btn-view-details" 
                      onClick={() => setSelectedReport(report)}
                      title="View Details"
                    >
                      👁️
                    </button>
                    <button 
                      className="btn-edit" 
                      onClick={() => setSelectedReport(report)}
                      title="Edit Report"
                    >
                      ✏️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="reports-map-container">
          <div className="map-visualization">
            {/* This would be replaced with an actual map component */}
            <div className="map-placeholder">
              <div className="map-markers">
                {filteredReports.map(report => (
                  <div 
                    key={report.id}
                    className={`map-marker ${report.severity.toLowerCase()}`}
                    onClick={() => setSelectedReport(report)}
                    title={`${report.type} - ${report.severity} Severity`}
                  />
                ))}
              </div>
            </div>
            
            <div className="map-legend">
              <div className="legend-item">
                <span className="legend-marker high"></span>
                <span>High Severity</span>
              </div>
              <div className="legend-item">
                <span className="legend-marker medium"></span>
                <span>Medium Severity</span>
              </div>
              <div className="legend-item">
                <span className="legend-marker low"></span>
                <span>Low Severity</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {selectedReport && (
        <div className="report-modal-overlay">
          <div className="report-modal">
            <div className="report-modal-header">
              <h2>{selectedReport.id}: {selectedReport.type}</h2>
              <button 
                className="btn-close" 
                onClick={() => setSelectedReport(null)}
              >
                ✕
              </button>
            </div>
            <div className="report-modal-body">
              <div className="report-details">
                <div className="report-image-container">
                  {/* Placeholder for image */}
                  <div className="report-image-placeholder">
                    {selectedReport.type} Image
                  </div>
                  {selectedReport.aiVerified && (
                    <div className="ai-verification">
                      <span className="ai-badge">AI Verified</span>
                      <span className={`severity-indicator ${getSeverityClass(selectedReport.aiSeverity)}`}>
                        {selectedReport.aiSeverity} Severity
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="report-info">
                  <div className="info-row">
                    <div className="info-label">Status:</div>
                    <div className="info-value">
                      <select 
                        value={selectedReport.status}
                        onChange={(e) => updateReportStatus(selectedReport.id, e.target.value)}
                        className={`status-select ${getStatusClass(selectedReport.status)}`}
                      >
                        {statuses.map(status => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="info-row">
                    <div className="info-label">Assigned To:</div>
                    <div className="info-value">
                      <select 
                        value={selectedReport.assignedTo || ''}
                        onChange={(e) => assignReport(selectedReport.id, e.target.value || null)}
                        className="assign-select"
                      >
                        <option value="">Unassigned</option>
                        <option value="Roads & Infrastructure">Roads & Infrastructure</option>
                        <option value="Public Works">Public Works</option>
                        <option value="Municipal Services">Municipal Services</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="info-row">
                    <div className="info-label">Location:</div>
                    <div className="info-value">{selectedReport.location}</div>
                  </div>
                  
                  <div className="info-row">
                    <div className="info-label">Reported By:</div>
                    <div className="info-value">{selectedReport.reportedBy}</div>
                  </div>
                  
                  <div className="info-row">
                    <div className="info-label">Reported At:</div>
                    <div className="info-value">{formatDate(selectedReport.reportedAt)}</div>
                  </div>
                  
                  {selectedReport.resolvedAt && (
                    <div className="info-row">
                      <div className="info-label">Resolved At:</div>
                      <div className="info-value">{formatDate(selectedReport.resolvedAt)}</div>
                    </div>
                  )}
                  
                  <div className="info-row">
                    <div className="info-label">Upvotes:</div>
                    <div className="info-value">{selectedReport.upvotes}</div>
                  </div>
                </div>
              </div>
              
              <div className="report-description">
                <h3>Description</h3>
                <p>{selectedReport.description}</p>
              </div>
              
              {selectedReport.resolutionNotes && (
                <div className="resolution-notes">
                  <h3>Resolution Notes</h3>
                  <p>{selectedReport.resolutionNotes}</p>
                </div>
              )}
              
              {selectedReport.status !== 'Resolved' && (
                <div className="resolution-form">
                  <h3>Add Resolution Notes</h3>
                  <textarea 
                    rows="4" 
                    placeholder="Enter details about how this issue was resolved..."
                    className="resolution-textarea"
                  ></textarea>
                  <button 
                    className="btn-resolve"
                    onClick={() => updateReportStatus(selectedReport.id, 'Resolved')}
                  >
                    Mark as Resolved
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportManagement;
