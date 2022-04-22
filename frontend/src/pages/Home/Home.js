import Button from '../../components/button/Button'
import './Home.css'
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import abi from '../../contracts/ShardDAO.json';
import {Link} from 'react-router-dom';

export var address 
export default function Home()
{
  const [currentAccount, setCurrentAccount] = useState("");
  const contractAddress = "0x0dD19D155ba6bc04106801B05d21FFfCa32521Ea";

  const contractABI = abi.abi;


  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account)
        address = account;
        console.log(address);
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  return (
    <div className='Home'> 
     <header className="App-header">
    <span href='/' className='logo'>Zuri.</span>
    <nav>
      <a href="/">Home</a>
      <Button  text="Sign In"  handleClick={connectWallet}></Button>
    </nav>
  </header>

    <h1>The <span>No. 1 </span> <br/>
    World Class Organization where tech talents are brewed
    </h1>
    <p> Register now to kickstart your career
      </p>
      <Link to="/election"><Button text='Connect your wallet' handleClick={connectWallet}/></Link>
    </div>

  )
}
