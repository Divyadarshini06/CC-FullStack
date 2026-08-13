import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import JobCard from '../components/JobCard';

const Home = ({ jobs }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/jobs?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        backgroundColor: 'var(--primary-color)',
        color: 'white',
        padding: '6rem 0',
        textAlign: 'center',
        marginBottom: '4rem'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem', color: 'white' }}>Find Your Dream Job Today</h1>
          <p style={{ fontSize: '1.25rem', marginBottom: '2.5rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto 2.5rem' }}>
            Discover thousands of job opportunities with top companies and fast-growing startups.
          </p>
          
          <form onSubmit={handleSearch} style={{
            display: 'flex',
            maxWidth: '600px',
            margin: '0 auto',
            backgroundColor: 'white',
            padding: '0.5rem',
            borderRadius: '9999px',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '0 1rem', color: 'var(--text-secondary)' }}>
              <Search size={20} />
              <input 
                type="text" 
                placeholder="Job title, skills, or company" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  border: 'none',
                  outline: 'none',
                  padding: '0.75rem',
                  width: '100%',
                  fontSize: '1rem'
                }}
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ borderRadius: '9999px', padding: '0.75rem 2rem' }}>
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="container" style={{ marginBottom: '4rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2>Featured Jobs</h2>
          <Link to="/jobs" style={{ color: 'var(--primary-color)', fontWeight: 500 }}>View All Jobs &rarr;</Link>
        </div>
        
        <div className="job-grid">
          {jobs.slice(0, 3).map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
