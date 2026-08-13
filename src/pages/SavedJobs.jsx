import { Link } from 'react-router-dom';
import { Heart, Trash2 } from 'lucide-react';
import JobCard from '../components/JobCard';

const SavedJobs = ({ savedJobs, removeSavedJob }) => {
  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
        <Heart size={28} color="var(--danger)" fill="var(--danger)" />
        <h1 style={{ fontSize: '2rem', margin: 0 }}>Saved Jobs</h1>
      </div>

      {savedJobs.length > 0 ? (
        <div className="job-grid">
          {savedJobs.map(job => (
            <div key={job.id} style={{ position: 'relative' }}>
              <JobCard job={job} />
              <button 
                onClick={() => removeSavedJob(job.id)}
                className="btn btn-outline"
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  backgroundColor: 'white',
                  color: 'var(--danger)',
                  borderColor: 'var(--danger)',
                  padding: '0.5rem',
                  borderRadius: '50%'
                }}
                title="Remove from saved"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="card" style={{ textAlign: 'center', padding: '6rem 2rem' }}>
          <Heart size={48} color="var(--border-color)" style={{ marginBottom: '1.5rem', margin: '0 auto' }} />
          <h2 style={{ marginBottom: '1rem' }}>No saved jobs yet</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '400px', margin: '0 auto 2rem' }}>
            You haven't saved any jobs yet. Browse our job listings and save the ones you're interested in!
          </p>
          <Link to="/jobs" className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>
            Browse Jobs
          </Link>
        </div>
      )}
    </div>
  );
};

export default SavedJobs;
