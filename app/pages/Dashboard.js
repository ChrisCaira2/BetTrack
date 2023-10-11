import React from 'react';
import '../src/app/App.css';
import { Router, useRouter } from 'next/navigation'

function Dashboard() {
    const router = useRouter()

    return (
        <div className="App">
            <header className="App-header">

                <p>
                    Select Sport To View Odds!
                </p>

                <button onClick={() => router.push('/NFL')} className='button'>NFL </button>
                <button onClick={() => router.push('/MLB')} className='button'>MLB </button>
                <button onClick={() => router.push('/NBA')} className='button'>NBA </button>


            </header>
        </div>
    )
}

export default Dashboard;
