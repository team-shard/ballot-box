import Card from '../../components/card/Card'
import Navbar from '../../components/Navbar/Navbar'
import './New.css'


export default function New() {
  return (
    <div className='new'>
      <Navbar />
      <div className='container'>
  
        <div className='container-body'>
         <Card title='Register New User' subtitle='Add new student to ZURI DAO'/>
         <Card title='Add New Contestant' subtitle='Create New contest to participate in election'/>
        </div>
      </div>
    </div>
  )
}
