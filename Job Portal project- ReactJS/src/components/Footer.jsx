const Footer = () => {
  return (
    <footer style={{
      backgroundColor: 'var(--surface-color)',
      borderTop: '1px solid var(--border-color)',
      padding: '2rem 0',
      marginTop: 'auto'
    }}>
      <div className="container" style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
        <p>&copy; {new Date().getFullYear()} JobFinder. All rights reserved.</p>
        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
