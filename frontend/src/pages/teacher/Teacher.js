import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Widget from '../../components/widget/widget'
import './Teacher.css'



export default function Teacher() {
  return (
      <div className='Teacher'>
      <Sidebar />
      
      <div className='container'>
        <Navbar />
        <div className='widgets'>
        <Widget/>
          </div>
      </div>
    </div>
  )
}
