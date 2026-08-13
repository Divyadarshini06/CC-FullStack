import { Link } from 'react-router-dom';
import { Briefcase, Heart, PlusCircle } from 'lucide-react';

const Navbar = () => {
  return (
    <nav style={{
      backgroundColor: 'var(--surface-color)',
      borderBottom: '1px solid var(--border-color)',
      padding: '1rem 0',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1.5rem', color: 'var(--primary-color)' }}>
          <Briefcase size={28} />
          JobFinder
        </Link>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <Link to="/" style={{ fontWeight: 500 }}>Home</Link>
          <Link to="/jobs" style={{ fontWeight: 500 }}>Jobs</Link>
          <Link to="/saved-jobs" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 500 }}>
            <Heart size={18} /> Saved
          </Link>
          <Link to="/add-job" className="btn btn-primary">
            <PlusCircle size={18} /> Post a Job
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
