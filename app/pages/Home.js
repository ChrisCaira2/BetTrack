import money from '../src/app/money.svg';
import React from 'react';
import '../src/app/App.css';
import { useRouter } from 'next/navigation'


function Home() {
    const router = useRouter()
    return (

        <div className="App">
            <header className="App-header">
                <img src={money} className="App-logo" alt="logo" />
                <p>
                    Welcome to Bet Track!
                </p>

                <button onClick={() => router.push('/SignIn')} className='button'>Sign In </button>
                <button onClick={() => router.push('/BetHome')} className='button'>Continue </button>



            </header>
        </div>

    );
}

export default Home;