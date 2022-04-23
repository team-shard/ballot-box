import './App.css';
import {BrowserRouter as Router, Routes, Route, BrowserRouter} from 'react-router-dom';
import Home from './pages/Home/Home';
import Chairman from './pages/Admin/Chairman';
import Election from './pages/Election/Election';
import Teacher from './pages/teacher/Teacher';
// import Student from './pages/student/Student';
import Result from './pages/result/Result';
import New from './pages/New/New';
import {Contract} from 'ethers';
import { ethers, utils } from "ethers";
// import getEthers from "./getEthers";
import Control from "./contracts/AccessControl.json";
import Shard from "./contracts/ShardDAO.json";
import React, { useEffect, useState } from "react";


function App()
{
  const[isWalletConnected,setIsWalletConnected] = useState(false);
  const [daoMethod, setDAOMethod] = useState({});
  const [controlMethods, setControlMethods] = useState({});
  const [view, setView] = useState("admin");
  const [customerAddress, setCustomerAddress] = useState(null);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState(null);
  
  

  
  //Creating 4 public routes ,
  //Home, Admin, Election, Student
  //and 3 private routes ,
  //Chairman, Teacher, Board and New (For Creating New Election)
  return (

    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home/>} />  
            <Route path="admin" >
            <Route index element={<Teacher />} />  
              <Route path='chairman' element={<Chairman/>} />
              <Route path='result' element={<Result/>} />
              <Route path='new' element={<New/>} />
            </Route>
            <Route path="election" element={<Election />} />
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