import './App.css';
import Button from './components/button/Button';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <span href='/' className='logo'>Zuri.</span>
        <nav>
          <a href="/">Home</a>
          <a href="/" className='pry-btn'>Sign in</a>
          <a href="/" className='sec-btn'>Enroll</a>
        </nav>
      </header>

      <main>
        <div className='hero'>
        <h1>The <span>No. 1 </span> <br/>
        World Class Organisation where tech talents are brewed
        </h1>
        <p> Register now to kickstart your career
        </p>
       <Button text='Connect your wallet' />
        </div>
        
      </main>
    </div>
  );
}

export default App;
