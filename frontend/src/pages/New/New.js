import Card from '../../components/card/Card'
import Navbar from '../../components/Navbar/Navbar'
import './New.css'
import { Contract } from 'ethers';
import { useState } from 'react';

// import ABI from '../';

export default function New()
{
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
          <div>
            <select
              name='option'
              value={option}
              onChange={handleOptionChange}
            >
             <option value="Student">Student</option> 
             <option value="Teacher">Teacher</option> 
             <option value="Board Member">Board Member</option> 
          </select>
          </div>
          
        </div>
        </div>
    </div>
  )
}

