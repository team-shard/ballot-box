
import Candidate from '../candidate/Candidate'
import './widget.css'

export default function Widget() {
  return (
    <div className='widget'>
      <div className='widget-header'>
        <div className='widget-title'>
          <h1>Election</h1>
        </div>

      </div>
      <div className='widget-body'>
      <div className='election-title'>Presidential Vote</div>
        <div className='candidate-list'>
        <Candidate />
        <Candidate />
        <Candidate />
        <Candidate />
        <Candidate />
        <Candidate />
        <Candidate />
        <Candidate />
        </div>
        </div>
      
    </div>
  )
}
