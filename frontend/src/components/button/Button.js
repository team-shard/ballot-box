import './button.css'
export default function Button({ text, handleClick })
{
  
    // const handleClick = () =>
    // {
    //   console.log("Clicked")
    // }
    return (
      <div className="btn" onClick={handleClick} >{text} </div>
    )
  }
