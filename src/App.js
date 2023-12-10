import { Box } from "@mui/material";
import Dashboard from "./component/dashboard/dashboard";
import Header from "./component/header/header";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Leftnav from './component/leftnav/leftnav'
import Activedrive from "./component/activedrive";
import Footer from "./component/footer/Footer";
import PlacedStudent from "./component/placedstudent";
import "./App.css";
import StudentProfile from "./component/StudentProfile";
import RecruiterProfile from "./component/RecruiterProfile";
function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Box sx={{ display: 'flex', height: '100%' }}>
          <Leftnav />
          <Routes>
             <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/activedrive" element={<Activedrive/>} />

            <Route path="/placedstudent" element={<PlacedStudent/>}/>
            
            <Route path="/studentprofile" element={<StudentProfile/>}/>
           
            {/* Add more routes for other components/pages */}
            <Route path="/recruiterprofile" element={<RecruiterProfile/>}/>
          </Routes>
         
        </Box>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
