'use client'

import { useState, React } from "react";
import '/app/App.css';
import money from '/app/money.svg';
import Image from 'next/image';

export default function TrackBets() {
    const [sport, setSport] = useState("")
    const [team, setTeam] = useState("")
    const [betType, setBetType] = useState("")
    const [odds, setOdds] = useState("")
    const [error, setError] = useState([]);
    const [success, setSuccess] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("api/contact", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                sport,
                team,
                betType,
                odds,
            }),
        });

        const { msg, success } = await res.json();
        setError(msg);
        setSuccess(success);

        if (success) {
            setSport("");
            setTeam("");
            setBetType("");
            setOdds("");
        }
    };

    return (
        <div className="App">
            <div className='topLeftLogo'>
                <Image src={money} alt="logo" />
            </div>
            <header className="MLB-header">
                <p>PLACE AND TRACK BETS</p>
            </header>

            <div className="betSlip">

                <label className="label">Enter League</label>
                <input
                    onChange={(e) => setSport(e.target.value)}
                    className='form'
                    value={sport}
                    type="text"
                    id="Team"
                    placeholder="Enter Sport Here (NFL, NBA)"
                />

                <label className="label" >Enter Team</label>
                <input
                    onChange={(e) => setTeam(e.target.value)}
                    className='form'
                    value={team}
                    type="text"
                    id="Team"
                    placeholder="Enter Team Abbreviation Here (CHI)"
                />

                <label className="label">Enter Bet Type</label>
                <input
                    onChange={(e) => setBetType(e.target.value)}
                    className='form'
                    value={betType}
                    type="text"
                    id="BetType"
                    placeholder="Enter Bet Type (ML, Spread, Total)"
                />

                <label className="label">Enter Odds</label>
                <input
                    onChange={(e) => setOdds(e.target.value)}
                    className='form'
                    value={odds}
                    id="odds"
                    type="text"
                    placeholder="Enter Odds for your bet (-110, +110)"
                />

                <button onClick={handleSubmit} className="button" type="submit">
                    Send
                </button>
            </div>

            <div className="displayBets">

            </div>

        </div>
    )
}