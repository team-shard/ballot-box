import Card from '../../components/card/Card'
import Navbar from '../../components/Navbar/Navbar'
import './New.css'
import { Contract } from 'ethers';
import { useState } from 'react';
import { ethers } from 'ethers';
import Button from '../../components/button/Button'
import Shard from "../../contracts/ShardDAO.json";

// import ABI from '../';

export default function New()
{
  const [error, setError] = useState(null);
    // const [inputValue, setInputValue] = useState({ walletAddress: "", contestantName: '',});
    const [state, setState] = useState({contestantAddress: ""});
    const handleChange = (e) =>
    { 
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    //     setList({
    //       ...state,
    //       [e.target.name]: e.target.value
    //   })
    //   setListAddress({
    //     ...state,
    //     [e.target.name]: e.target.value
    // })
    }
    
    const contractAddress = "0x6A08244EF41483B197847630709919BE209135A5"
    const addStudents = async () => {
      try {
        if (window.ethereum) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          console.log("test add")
          const shardContract = new ethers.Contract(contractAddress, Shard.abi, signer);
          console.log("details :",state.contestantAddress)
          const pause = await shardContract.registerStudent([state.contestantAddress]);
          
          console.log( "get result:",pause)
          
        } else {
          console.log("Ethereum object not found, install Metamask.");
          setError("Please install a MetaMask wallet to use our bank.");
        }
      } catch (error) {
        console.log(error);
      }
    }
    const addTeachers = async () => {
      try {
        if (window.ethereum) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          console.log("test add")
          const shardContract = new ethers.Contract(contractAddress, Shard.abi, signer);
          console.log("details :",state.contestantAddress)
          const pause = await shardContract.registerTeacher([state.contestantAddress]);
          
          console.log( "get result:",pause)
          
        } else {
          console.log("Ethereum object not found, install Metamask.");
          setError("Please install a MetaMask wallet to use our bank.");
        }
      } catch (error) {
        console.log(error);
      }
    }
    const addBoard = async () => {
      try {
        if (window.ethereum) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          console.log("test add")
          const shardContract = new ethers.Contract(contractAddress, Shard.abi, signer);
          console.log("details :",state.contestantAddress)
          const pause = await shardContract.registerBoardMember([state.contestantAddress]);
          
          console.log( "get result:",pause)
          
        } else {
          console.log("Ethereum object not found, install Metamask.");
          setError("Please install a MetaMask wallet to use our bank.");
        }
      } catch (error) {
        console.log(error);
      }
    }
   
    
  const [option, setOption] = useState('');
  const handleOptionChange = (e) =>
  {
    setOption(e.target.value);
  }
  return (
    <div className='new'>
      <Navbar />
      <div className='container'>
  
        <div className='container-body'>
         
          
          <Card title='Add New Contestant' subtitle='Create New contestant to participate in election' />
          <div className='newUser'>
            <h1>Add New User to ZURI DAO</h1>
            <div className='card-content'>
                  
                  <input type='text' placeholder="Contestant Address" name='contestantAddress' value={state.contestantAddress} onChange={handleChange} />

                  <Button text='Register Student' handleClick={addStudents} /> 
                  <Button text='Register Teacher' handleClick={addTeachers} /><Button text='Register Board Member' handleClick={addBoard} />
              </div>
            {/* <select
              name='option'
              value={option}
              onChange={handleOptionChange}
            >
             <option value="Student">Student</option> 
             <option value="Teacher">Teacher</option> 
             <option value="Board Member">Board Member</option> 
          </select> */}
          </div>
          
        </div>
        </div>
    </div>
  )
}

