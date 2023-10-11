import React from 'react';
import '../src/app/App.css';
import { Link } from 'next/navigation';

function SignIn() {
    return (
        <div className="App">
            <header className="App-header">
                <img className="App-logo" alt="logo" />
                <p>
                    Welcome to Bet Track!
                </p>

                <Link to='/'>
                    <a className='App-link'>Test </a>
                </Link>


            </header>
        </div>
    )
}

export default SignIn;
