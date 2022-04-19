import './Navbar.css';

export default function Navbar() {
  return (
    <header className="App-header">
    <span href='/' className='logo'>Zuri.</span>
    <nav>
      <a href="/">Home</a>
      <a href="/" className='pry-btn'>Sign in</a>
      <a href="/" className='sec-btn'>Enroll</a>
    </nav>
  </header>
  )
}
