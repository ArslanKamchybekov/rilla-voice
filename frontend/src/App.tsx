import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import AppLayout from './components/AppLayout';
import NavBar from './components/NavBar';

const App = () => {
  return (
    <Router>
      <div>
        {/* NavBar will always be visible */}
        <NavBar />
        {/* Define your routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sales" element={<AppLayout />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
