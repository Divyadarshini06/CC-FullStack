import { useParams, Link } from 'react-router-dom';
import { MapPin, Building, DollarSign, Clock, ArrowLeft, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const JobDetails = ({ jobs, saveJob, savedJobs }) => {
  const { id } = useParams();
  const job = jobs.find(j => j.id === id);
  const [applied, setApplied] = useState(false);

  if (!job) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '4rem 0' }}>
        <h2>Job not found</h2>
        <Link to="/jobs" className="btn btn-primary" style={{ marginTop: '1rem' }}>Back to Jobs</Link>
      </div>
    );
  }

  const isSaved = savedJobs.some(j => j.id === job.id);

  const handleApply = () => {
    // Simulate apply API call
    setTimeout(() => {
      setApplied(true);
    }, 500);
  };

  return (
    <div className="container">
      <Link to="/jobs" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
        <ArrowLeft size={16} /> Back to Jobs
      </Link>

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        
        {/* Main Content */}
        <div style={{ flex: 2, minWidth: '300px' }} className="card">
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{job.title}</h1>
          <div style={{ fontSize: '1.25rem', color: 'var(--primary-color)', marginBottom: '2rem', fontWeight: 500 }}>
            {job.company}
          </div>

          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Job Description</h2>
            <p style={{ color: 'var(--text-secondary)', whiteSpace: 'pre-line' }}>{job.description}</p>
          </div>

          {job.responsibilities && (
            <div style={{ marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Responsibilities</h2>
              <ul style={{ color: 'var(--text-secondary)', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {job.responsibilities.map((resp, i) => <li key={i}>{resp}</li>)}
              </ul>
            </div>
          )}

          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Required Skills</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {job.skills?.map((skill, index) => (
                <span key={index} style={{
                  backgroundColor: 'var(--bg-color)',
                  border: '1px solid var(--border-color)',
                  padding: '0.5rem 1rem',
                  borderRadius: 'var(--radius)',
                  fontSize: '0.875rem'
                }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ flex: 1, minWidth: '250px', position: 'sticky', top: '100px' }}>
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <MapPin className="text-secondary" />
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Location</div>
                  <div style={{ fontWeight: 500 }}>{job.location}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <DollarSign className="text-secondary" />
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Salary</div>
                  <div style={{ fontWeight: 500 }}>{job.salary}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Clock className="text-secondary" />
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Job Type</div>
                  <div style={{ fontWeight: 500 }}>{job.type}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Building className="text-secondary" />
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Experience</div>
                  <div style={{ fontWeight: 500 }}>{job.experience}</div>
                </div>
              </div>
            </div>

            {applied ? (
              <button className="btn" style={{ width: '100%', backgroundColor: 'var(--success)', color: 'white', cursor: 'default' }}>
                <CheckCircle size={18} /> Applied successfully
              </button>
            ) : (
              <button onClick={handleApply} className="btn btn-primary" style={{ width: '100%', marginBottom: '1rem', padding: '0.75rem' }}>
                Apply Now
              </button>
            )}
            
            {!applied && (
              <button onClick={() => saveJob(job)} className="btn btn-outline" style={{ width: '100%' }}>
                {isSaved ? 'Saved to Favorites' : 'Save Job'}
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default JobDetails;
