import React, { useState, useEffect } from 'react';

const ProjectsManager = ({ token }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    githubUrl: '',
    image: ''
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('githubUrl', formData.githubUrl);
      
      if (formData.image && formData.image instanceof File) {
        formDataToSend.append('image', formData.image);
      }

      const url = editingId ? `/api/projects/${editingId}` : '/api/projects';
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      });

      if (response.ok) {
        setMessage(editingId ? 'Project updated successfully!' : 'Project added successfully!');
        setShowForm(false);
        setEditingId(null);
        setFormData({ title: '', githubUrl: '', image: '' });
        fetchProjects();
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Error saving project');
      }
    } catch (error) {
      setMessage('Error saving project');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (project) => {
    setFormData({
      title: project.title,
      githubUrl: project.githubUrl,
      image: project.image
    });
    setEditingId(project.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) {
      return;
    }

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setMessage('Project deleted successfully!');
        fetchProjects();
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Error deleting project');
      }
    } catch (error) {
      setMessage('Error deleting project');
    }
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  if (loading) {
    return <div className="loading">Loading projects...</div>;
  }

  return (
    <div className="projects-manager">
      <h2>Manage Projects</h2>
      
      {message && (
        <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      <button 
        onClick={() => setShowForm(true)} 
        className="add-btn"
      >
        + Add New Project
      </button>

      {showForm && (
        <div className="form-overlay">
          <div className="form-container">
            <h3>{editingId ? 'Edit Project' : 'Add New Project'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Project Title:</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>GitHub URL:</label>
                <input
                  type="url"
                  value={formData.githubUrl}
                  onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Project Image:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {formData.image && typeof formData.image === 'string' && (
                  <p>Current image: {formData.image}</p>
                )}
              </div>
              <div className="form-actions">
                <button type="submit" disabled={saving}>
                  {saving ? 'Saving...' : (editingId ? 'Update' : 'Add')}
                </button>
                <button type="button" onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setFormData({ title: '', githubUrl: '', image: '' });
                }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="projects-list">
        {projects.map((project) => (
          <div key={project.id} className="project-item">
            <div className="project-image">
              <img src={project.image} alt={project.title} />
            </div>
            <div className="project-details">
              <h3>{project.title}</h3>
              <p><a href={project.githubUrl} target="_blank" rel="noopener noreferrer">GitHub</a></p>
              <div className="project-actions">
                <button onClick={() => handleEdit(project)} className="edit-btn">
                  Edit
                </button>
                <button onClick={() => handleDelete(project.id)} className="delete-btn">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsManager;
