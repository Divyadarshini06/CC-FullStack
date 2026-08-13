import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import JobCard from '../components/JobCard';

const Jobs = ({ jobs, saveJob, savedJobs }) => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [filters, setFilters] = useState({
    location: '',
    type: '',
    experience: '',
    category: ''
  });
  
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  useEffect(() => {
    let result = jobs;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(job => 
        job.title.toLowerCase().includes(query) || 
        job.company.toLowerCase().includes(query) ||
        job.skills?.some(skill => skill.toLowerCase().includes(query))
      );
    }

    // Other filters
    if (filters.location) result = result.filter(j => j.location.includes(filters.location));
    if (filters.type) result = result.filter(j => j.type === filters.type);
    if (filters.experience) result = result.filter(j => j.experience === filters.experience);
    if (filters.category) result = result.filter(j => j.category === filters.category);

    setFilteredJobs(result);
  }, [searchQuery, filters, jobs]);

  const clearFilters = () => {
    setSearchQuery('');
    setFilters({ location: '', type: '', experience: '', category: '' });
  };

  return (
    <div className="container">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '2rem' }}>
        
        {/* Top Search Bar */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input 
              type="text" 
              className="input" 
              placeholder="Search jobs..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '3rem' }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
          {/* Sidebar Filters */}
          <aside style={{ width: '250px', flexShrink: 0 }} className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontWeight: 600 }}>
              <Filter size={20} /> Filters
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: 500 }}>Job Type</label>
                <select className="select" value={filters.type} onChange={(e) => setFilters({...filters, type: e.target.value})}>
                  <option value="">All Types</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: 500 }}>Experience Level</label>
                <select className="select" value={filters.experience} onChange={(e) => setFilters({...filters, experience: e.target.value})}>
                  <option value="">All Levels</option>
                  <option value="Entry Level">Entry Level</option>
                  <option value="Mid Level">Mid Level</option>
                  <option value="Senior">Senior</option>
                </select>
              </div>
              
              <button onClick={clearFilters} className="btn btn-outline" style={{ width: '100%', marginTop: '1rem' }}>
                Clear Filters
              </button>
            </div>
          </aside>

          {/* Job List */}
          <div style={{ flex: 1 }}>
            <div style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
              Showing {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'}
            </div>
            
            {filteredJobs.length > 0 ? (
              <div className="job-grid">
                {filteredJobs.map(job => (
                  <JobCard 
                    key={job.id} 
                    job={job} 
                    onSave={saveJob} 
                    isSaved={savedJobs.some(sj => sj.id === job.id)} 
                  />
                ))}
              </div>
            ) : (
              <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                <h3 style={{ marginBottom: '1rem' }}>No jobs found</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Try adjusting your search or filters to find what you're looking for.</p>
                <button onClick={clearFilters} className="btn btn-primary">Clear all filters</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
