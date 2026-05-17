import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Default redirect to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Placeholder for future dashboard routes */}
        <Route path="/student/dashboard" element={<div className="container-center"><h1>🎓 ছাত্র ড্যাশবোর্ড (শীঘ্রই আসছে...)</h1></div>} />
        <Route path="/staff/dashboard" element={<div className="container-center"><h1>👨‍💼 স্টাফ ড্যাশবোর্ড (শীঘ্রই আসছে...)</h1></div>} />
        <Route path="/teacher/dashboard" element={<div className="container-center"><h1>👨‍🏫 শিক্ষক ড্যাশবোর্ড (শীঘ্রই আসছে...)</h1></div>} />
        <Route path="/head/dashboard" element={<div className="container-center"><h1>👔 বিভাগীয় প্রধান ড্যাশবোর্ড (শীঘ্রই আসছে...)</h1></div>} />
      </Routes>
    </Router>
  );
}

export default App;
