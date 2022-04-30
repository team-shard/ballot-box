import { useEffect, useState } from 'react'
import { ElectionDuration } from '../../pages/result/Result'
import './countdown.css'

console.log(ElectionDuration);
const Countdown = () =>
{
   
    const calculateTimeLeft = () =>
    {
        let year = new Date().getFullYear()
        let difference = ElectionDuration

        let timeLeft = {}

        if (difference > 0)
        {
            timeLeft = {
                days: Math.floor(difference/ (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference/ (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference/1000 / 60) % 60) ,
                seconds: Math.floor((difference/1000) % 60) ,
                
            }
        }

        return timeLeft;

    }
 const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())
    // //declaring the election duration in hours 72h == 3 days
    // const  electionduration = 72

    useEffect(() =>
    {
        const timer = setTimeout(() =>
        {
            setTimeLeft(calculateTimeLeft())
        }, 1000);

        return () => clearTimeout(timer)
    })
 

    // console.log(timeLeft);

  return (
      <div className='countdown'>
          <h3>
              Election ends in:
          </h3>
          <div className='timer'> 
          <div className='timer-card'>
                  {timeLeft.hours}
                  <p>Hours</p>
              </div>
          <div className='timer-card'>
                  {timeLeft.minutes}
                  <p>Minutes</p></div>
          <div className='timer-card'>
                  {timeLeft.seconds}
                  <p>Seconds</p>
              </div>
          </div>
          
    </div>
  )
}


export default Countdown;