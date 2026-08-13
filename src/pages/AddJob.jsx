import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddJob = ({ onAddJob }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Full-time',
    salary: '',
    experience: 'Entry Level',
    category: '',
    skills: '',
    description: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Job title is required';
    if (!formData.company.trim()) newErrors.company = 'Company is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.salary.trim()) newErrors.salary = 'Salary is required';
    if (!formData.category.trim()) newErrors.category = 'Category is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Prepare job object
    const newJob = {
      ...formData,
      id: Date.now().toString(),
      skills: formData.skills.split(',').map(s => s.trim()).filter(s => s !== '')
    };

    onAddJob(newJob);
    navigate('/jobs');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when typing
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  return (
    <div className="container" style={{ maxWidth: '800px', padding: '2rem 1rem' }}>
      <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>Post a New Job</h1>
      
      <div className="card">
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Job Title *</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} className="input" placeholder="e.g. Frontend Developer" />
              {errors.title && <span style={{ color: 'var(--danger)', fontSize: '0.875rem' }}>{errors.title}</span>}
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Company *</label>
              <input type="text" name="company" value={formData.company} onChange={handleChange} className="input" placeholder="e.g. Acme Corp" />
              {errors.company && <span style={{ color: 'var(--danger)', fontSize: '0.875rem' }}>{errors.company}</span>}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Location *</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} className="input" placeholder="e.g. Remote, or New York, NY" />
              {errors.location && <span style={{ color: 'var(--danger)', fontSize: '0.875rem' }}>{errors.location}</span>}
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Salary *</label>
              <input type="text" name="salary" value={formData.salary} onChange={handleChange} className="input" placeholder="e.g. $80k - $100k" />
              {errors.salary && <span style={{ color: 'var(--danger)', fontSize: '0.875rem' }}>{errors.salary}</span>}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Job Type</label>
              <select name="type" value={formData.type} onChange={handleChange} className="select">
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Experience Level</label>
              <select name="experience" value={formData.experience} onChange={handleChange} className="select">
                <option value="Entry Level">Entry Level</option>
                <option value="Mid Level">Mid Level</option>
                <option value="Senior">Senior</option>
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Category *</label>
              <input type="text" name="category" value={formData.category} onChange={handleChange} className="input" placeholder="e.g. Engineering" />
              {errors.category && <span style={{ color: 'var(--danger)', fontSize: '0.875rem' }}>{errors.category}</span>}
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Skills (comma separated)</label>
            <input type="text" name="skills" value={formData.skills} onChange={handleChange} className="input" placeholder="e.g. React, JavaScript, CSS" />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Job Description *</label>
            <textarea name="description" value={formData.description} onChange={handleChange} className="textarea" rows="6" placeholder="Describe the job role, responsibilities, etc."></textarea>
            {errors.description && <span style={{ color: 'var(--danger)', fontSize: '0.875rem' }}>{errors.description}</span>}
          </div>

          <button type="submit" className="btn btn-primary" style={{ padding: '1rem', fontSize: '1.125rem' }}>
            Post Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddJob;
