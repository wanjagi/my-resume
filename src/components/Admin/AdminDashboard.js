import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SkillsManager from './SkillsManager';
import WorkExperienceManager from './WorkExperienceManager';
import ProjectsManager from './ProjectsManager';
import ResumeManager from './ResumeManager';
import './Admin.css';

const AdminDashboard = ({ token, onLogout }) => {
  const [activeTab, setActiveTab] = useState('skills');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }
    setLoading(false);
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    onLogout();
    navigate('/admin/login');
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Portfolio Admin Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </header>

      <nav className="admin-nav">
        <button 
          className={activeTab === 'skills' ? 'active' : ''} 
          onClick={() => setActiveTab('skills')}
        >
          Skills
        </button>
        <button 
          className={activeTab === 'experience' ? 'active' : ''} 
          onClick={() => setActiveTab('experience')}
        >
          Work Experience
        </button>
        <button 
          className={activeTab === 'projects' ? 'active' : ''} 
          onClick={() => setActiveTab('projects')}
        >
          Projects
        </button>
        <button 
          className={activeTab === 'resume' ? 'active' : ''} 
          onClick={() => setActiveTab('resume')}
        >
          Resume
        </button>
      </nav>

      <main className="admin-content">
        {activeTab === 'skills' && <SkillsManager token={token} />}
        {activeTab === 'experience' && <WorkExperienceManager token={token} />}
        {activeTab === 'projects' && <ProjectsManager token={token} />}
        {activeTab === 'resume' && <ResumeManager token={token} />}
      </main>

      <footer className="admin-footer">
        <a href="/">← Back to Portfolio</a>
      </footer>
    </div>
  );
};

export default AdminDashboard;
