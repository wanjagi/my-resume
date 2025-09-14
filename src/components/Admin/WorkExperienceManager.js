import React, { useState, useEffect } from 'react';

const WorkExperienceManager = ({ token }) => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    duration: '',
    description: '',
    technologies: []
  });

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const response = await fetch('/api/work-experience');
      const data = await response.json();
      setExperiences(data);
    } catch (error) {
      console.error('Error fetching experiences:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      const url = editingId ? `/api/work-experience/${editingId}` : '/api/work-experience';
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setMessage(editingId ? 'Experience updated successfully!' : 'Experience added successfully!');
        setShowForm(false);
        setEditingId(null);
        setFormData({ company: '', position: '', duration: '', description: '', technologies: [] });
        fetchExperiences();
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Error saving experience');
      }
    } catch (error) {
      setMessage('Error saving experience');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (experience) => {
    setFormData({
      company: experience.company,
      position: experience.position,
      duration: experience.duration,
      description: experience.description,
      technologies: experience.technologies
    });
    setEditingId(experience.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this experience?')) {
      return;
    }

    try {
      const response = await fetch(`/api/work-experience/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setMessage('Experience deleted successfully!');
        fetchExperiences();
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Error deleting experience');
      }
    } catch (error) {
      setMessage('Error deleting experience');
    }
  };

  const addTechnology = () => {
    const tech = prompt('Enter technology:');
    if (tech && tech.trim()) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, tech.trim()]
      }));
    }
  };

  const removeTechnology = (index) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index)
    }));
  };

  if (loading) {
    return <div className="loading">Loading experiences...</div>;
  }

  return (
    <div className="work-experience-manager">
      <h2>Manage Work Experience</h2>
      
      {message && (
        <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      <button 
        onClick={() => setShowForm(true)} 
        className="add-btn"
      >
        + Add New Experience
      </button>

      {showForm && (
        <div className="form-overlay">
          <div className="form-container">
            <h3>{editingId ? 'Edit Experience' : 'Add New Experience'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Company:</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Position:</label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Duration:</label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="e.g., 2023 - 2024"
                  required
                />
              </div>
              <div className="form-group">
                <label>Description:</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows="4"
                  required
                />
              </div>
              <div className="form-group">
                <label>Technologies:</label>
                <button type="button" onClick={addTechnology} className="add-tech-btn">
                  + Add Technology
                </button>
                <div className="technologies-list">
                  {formData.technologies.map((tech, index) => (
                    <div key={index} className="tech-item">
                      <span>{tech}</span>
                      <button type="button" onClick={() => removeTechnology(index)}>×</button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="form-actions">
                <button type="submit" disabled={saving}>
                  {saving ? 'Saving...' : (editingId ? 'Update' : 'Add')}
                </button>
                <button type="button" onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setFormData({ company: '', position: '', duration: '', description: '', technologies: [] });
                }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="experiences-list">
        {experiences.map((experience) => (
          <div key={experience.id} className="experience-item">
            <div className="experience-header">
              <h3>{experience.position}</h3>
              <div className="experience-actions">
                <button onClick={() => handleEdit(experience)} className="edit-btn">
                  Edit
                </button>
                <button onClick={() => handleDelete(experience.id)} className="delete-btn">
                  Delete
                </button>
              </div>
            </div>
            <p className="company">{experience.company}</p>
            <p className="duration">{experience.duration}</p>
            <p className="description">{experience.description}</p>
            <div className="technologies">
              {experience.technologies.map((tech, index) => (
                <span key={index} className="tech-tag">{tech}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkExperienceManager;
