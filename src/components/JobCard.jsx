import { Link } from 'react-router-dom';
import { MapPin, Building, DollarSign, Clock, Heart } from 'lucide-react';

const JobCard = ({ job, onSave, isSaved }) => {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{job.title}</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            <Building size={16} /> {job.company}
          </div>
        </div>
        {onSave && (
          <button 
            onClick={(e) => { e.preventDefault(); onSave(job); }}
            style={{ 
              color: isSaved ? 'var(--danger)' : 'var(--text-secondary)',
              transition: 'var(--transition)'
            }}
          >
            <Heart size={20} fill={isSaved ? 'currentColor' : 'none'} />
          </button>
        )}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <MapPin size={16} /> {job.location}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <Clock size={16} /> {job.type}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <DollarSign size={16} /> {job.salary}
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {job.skills?.slice(0, 3).map((skill, index) => (
          <span key={index} style={{
            backgroundColor: '#e0e7ff',
            color: 'var(--primary-color)',
            padding: '0.25rem 0.75rem',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: 500
          }}>
            {skill}
          </span>
        ))}
        {job.skills?.length > 3 && (
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', padding: '0.25rem' }}>
            +{job.skills.length - 3} more
          </span>
        )}
      </div>

      <div style={{ marginTop: 'auto' }}>
        <Link to={`/jobs/${job.id}`} className="btn btn-outline" style={{ width: '100%' }}>
          View Details
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
