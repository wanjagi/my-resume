import React, { useState, useEffect } from 'react';

const ResumeManager = ({ token }) => {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const response = await fetch('/api/portfolio');
      const data = await response.json();
      setResume(data.resume);
    } catch (error) {
      console.error('Error fetching resume:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setMessage('Please upload a PDF file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setMessage('File size must be less than 5MB');
      return;
    }

    setUploading(true);
    setMessage('');

    try {
      const formData = new FormData();
      formData.append('resume', file);

      const response = await fetch('/api/resume', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        setResume(data.resume);
        setMessage('Resume updated successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Error uploading resume');
      }
    } catch (error) {
      setMessage('Error uploading resume');
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading resume info...</div>;
  }

  return (
    <div className="resume-manager">
      <h2>Manage Resume</h2>
      
      {message && (
        <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      <div className="resume-info">
        {resume && (
          <div className="current-resume">
            <h3>Current Resume</h3>
            <p><strong>Filename:</strong> {resume.filename}</p>
            <p><strong>Path:</strong> {resume.path}</p>
            <a href={resume.path} target="_blank" rel="noopener noreferrer" className="view-resume-btn">
              View Current Resume
            </a>
          </div>
        )}

        <div className="upload-section">
          <h3>Upload New Resume</h3>
          <div className="upload-area">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              disabled={uploading}
              id="resume-upload"
              className="file-input"
            />
            <label htmlFor="resume-upload" className="upload-label">
              {uploading ? 'Uploading...' : 'Choose PDF File'}
            </label>
            <p className="upload-info">
              Maximum file size: 5MB<br />
              Accepted format: PDF only
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeManager;
