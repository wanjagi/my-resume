import React, { useState, useEffect } from 'react';

const SkillsManager = ({ token }) => {
  const [skills, setSkills] = useState({ technical: [], professional: [] });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await fetch('/api/portfolio');
      const data = await response.json();
      setSkills(data.skills);
    } catch (error) {
      console.error('Error fetching skills:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    try {
      const response = await fetch('/api/skills', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(skills)
      });

      if (response.ok) {
        setMessage('Skills updated successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Error updating skills');
      }
    } catch (error) {
      setMessage('Error updating skills');
    } finally {
      setSaving(false);
    }
  };

  const addSkill = (type) => {
    const newSkill = prompt('Enter new skill:');
    if (newSkill && newSkill.trim()) {
      setSkills(prev => ({
        ...prev,
        [type]: [...prev[type], newSkill.trim()]
      }));
    }
  };

  const removeSkill = (type, index) => {
    if (window.confirm('Are you sure you want to remove this skill?')) {
      setSkills(prev => ({
        ...prev,
        [type]: prev[type].filter((_, i) => i !== index)
      }));
    }
  };

  const updateSkill = (type, index, newValue) => {
    setSkills(prev => ({
      ...prev,
      [type]: prev[type].map((skill, i) => i === index ? newValue : skill)
    }));
  };

  if (loading) {
    return <div className="loading">Loading skills...</div>;
  }

  return (
    <div className="skills-manager">
      <h2>Manage Skills</h2>
      
      {message && (
        <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      <div className="skills-section">
        <div className="skill-category">
          <h3>Technical Skills</h3>
          <button onClick={() => addSkill('technical')} className="add-btn">
            + Add Technical Skill
          </button>
          <div className="skills-list">
            {skills.technical.map((skill, index) => (
              <div key={index} className="skill-item">
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => updateSkill('technical', index, e.target.value)}
                  className="skill-input"
                />
                <button 
                  onClick={() => removeSkill('technical', index)}
                  className="remove-btn"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="skill-category">
          <h3>Professional Skills</h3>
          <button onClick={() => addSkill('professional')} className="add-btn">
            + Add Professional Skill
          </button>
          <div className="skills-list">
            {skills.professional.map((skill, index) => (
              <div key={index} className="skill-item">
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => updateSkill('professional', index, e.target.value)}
                  className="skill-input"
                />
                <button 
                  onClick={() => removeSkill('professional', index)}
                  className="remove-btn"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button 
        onClick={handleSave} 
        disabled={saving}
        className="save-btn"
      >
        {saving ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  );
};

export default SkillsManager;
