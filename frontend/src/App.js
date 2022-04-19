import './App.css';
import {BrowserRouter as Router, Routes, Route, BrowserRouter} from 'react-router-dom';
import Home from './pages/Home/Home';
import Admin from './pages/Admin/Admin';
import Election from './pages/Election/Election';
import Teacher from './pages/teacher/Teacher';
import Student from './pages/student/Student';
import Board from './pages/board/Board';
import New from './pages/New/New';


function App()
{
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />  
            <Route path="admin" >
            <Route index element={<Admin />} />  
              <Route path='board' element={<Board/>} />
              <Route path='teacher' element={<Teacher/>} />
              <Route path='new' element={<New/>} />
            </Route>
            <Route path="election" element={<Election />} />
            <Route path="student" element={<Student />} />
            
          </Route>
        </Routes>
      </BrowserRouter>
      {/* <Router>
        {/* <Navbar /> */}
        {/* <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/election" element={<Election />} />
        </Routes>
     
        
      </Router> */}
     
    </div>
  );
}

export default App;
