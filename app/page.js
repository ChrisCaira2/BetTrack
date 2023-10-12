'use client'
import "./App.css";
import money from './money.svg';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import logo from './money.svg';
import Image from "next/image";

function App() {
  const router = useRouter()
  return (
    <div className="App">
      <div className='topLeftLogo'>
        <Image src={money} />
      </div>
      <header className="App-header">
        <Image src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to Bet Track!
        </p>

        {/* <button onClick={() => router.push('/SignIn')} className='button'>Sign In </button> */}
        <button onClick={() => router.push('/Dashboard')} className='button'>Continue </button>



      </header>
    </div>
  );
}

export default App;