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
  const [isAdmin, setUser] = useState(false);
  

  // const checkIfWalletIsConnected = async () => {
  //   try {
  //     if (window.ethereum) {
  //       const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  //       const account = accounts[0];
  //       setIsWalletConnected(true);
  //       setCustomerAddress(account);
  //       console.log("Account Connected: ", account);
  //     } else {
  //       setError("Please install a MetaMask wallet to use our bank.");
  //       console.log("No Metamask detected");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // const getUserRole = async () => {
  //   try {
  //     if (window.ethereum) {
  //       const provider = new ethers.providers.Web3Provider(window.ethereum);
  //       const signer = provider.getSigner();
  //       const controlContract = new ethers.Contract(0x7b69499D987ba0058A7AB30C6F8dA54c5168deF4, Control.abi, signer);
  
  //       let role = await controlContract.isAdminSH(signer);
  //       setUser(true);
  //     } else {
  //       console.log("Ethereum object not found, install Metamask.");
  //       setError("Please install a MetaMask wallet to use our bank.");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // useEffect(() => {
  //   const getData = async () => {

     
  //       checkIfWalletIsConnected();
        
  //       getUserRole();
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     const signer = provider.getSigner();
  //     const address = signer.getAddress();
      
  //     const shardDAO = new Contract(
  //       "0x0dD19D155ba6bc04106801B05d21FFfCa32521Ea",
  //       Shard.abi,
  //       provider
  //     );
  //     const controlContract = new Contract(
  //       "0x7b69499D987ba0058A7AB30C6F8dA54c5168deF4 ",
  //       Control.abi,
  //       provider
  //     );

  //     setDAOMethod(shardDAO.connect(signer));
  //     setControlMethods(controlContract.connect(signer));
      
      
     
  //   };
  //   getData().then(() => {});
  // }, [isWalletConnected]);
  //Creating 4 public routes ,
  //Home, Admin, Election, Student
  //and 3 private routes ,
  //Chairman, Teacher, Board and New (For Creating New Election)
  return (

    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />  
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
