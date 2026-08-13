import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import AddJob from './pages/AddJob';
import SavedJobs from './pages/SavedJobs';
import jobData from './data/jobs.json';

function App() {
  const [jobs, setJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    // Load initial jobs from JSON and any added jobs from localStorage
    const localJobs = JSON.parse(localStorage.getItem('addedJobs') || '[]');
    setJobs([...jobData, ...localJobs]);

    const localSaved = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    setSavedJobs(localSaved);
  }, []);

  const addJob = (newJob) => {
    const updatedJobs = [newJob, ...jobs];
    setJobs(updatedJobs);
    
    // Save to localStorage
    const localJobs = JSON.parse(localStorage.getItem('addedJobs') || '[]');
    localStorage.setItem('addedJobs', JSON.stringify([newJob, ...localJobs]));
  };

  const saveJob = (job) => {
    const isAlreadySaved = savedJobs.some(j => j.id === job.id);
    if (!isAlreadySaved) {
      const newSaved = [...savedJobs, job];
      setSavedJobs(newSaved);
      localStorage.setItem('savedJobs', JSON.stringify(newSaved));
    }
  };

  const removeSavedJob = (id) => {
    const newSaved = savedJobs.filter(job => job.id !== id);
    setSavedJobs(newSaved);
    localStorage.setItem('savedJobs', JSON.stringify(newSaved));
  };

  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ flex: 1, padding: '2rem 0' }}>
          <Routes>
            <Route path="/" element={<Home jobs={jobs} />} />
            <Route path="/jobs" element={<Jobs jobs={jobs} saveJob={saveJob} savedJobs={savedJobs} />} />
            <Route path="/jobs/:id" element={<JobDetails jobs={jobs} saveJob={saveJob} savedJobs={savedJobs} />} />
            <Route path="/add-job" element={<AddJob onAddJob={addJob} />} />
            <Route path="/saved-jobs" element={<SavedJobs savedJobs={savedJobs} removeSavedJob={removeSavedJob} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
