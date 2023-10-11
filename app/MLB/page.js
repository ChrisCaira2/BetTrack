'use client'
import '/app/App.css';
import React, { useState, useEffect } from 'react';
import { Router, useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from '/app/logo.ico';
import money from '/app/money.svg';


function MLB() {
    const router = useRouter()

    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let date = today.getDate();

    if (date < 10) { date = "0" + date.toString() } else { date = date.toString() }
    if (month < 10) { month = "0" + month.toString() } else { month = month.toString() }

    const currentDate = year + '' + month + '' + date;


    const [container, setContainer] = useState([]);


    useEffect(() => {
        fetchMe()
    }, [])

    //20231001
    const fetchMe = () => {

        fetch(`https://tank01-mlb-live-in-game-real-time-statistics.p.rapidapi.com/getMLBBettingOdds?gameDate=${currentDate}`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '9441af4572msh072585be2e742b1p199714jsnc836d63d57d2',
                'X-RapidAPI-Host': 'tank01-mlb-live-in-game-real-time-statistics.p.rapidapi.com'
            }
        })
            .then(response => {
                return response.json();
            }).then(data => {
                setContainer(data.body)
            }).catch(err => {
                console.error(err);
            });
    }

    const arr = Object.keys(container).map((key) => [key, container[key]]);

    const [isActive, setIsActive] = useState(false);

    const [isML, setML] = useState(true);
    const [isSpread, setSpread] = useState(false);
    const [isTotal, setTotal] = useState(false);


    const handleClick = () => {
        setIsActive(!isActive);
    };

    const ML = () => {
        setML(!isML)
        setSpread(false)
        setTotal(false)
    }
    const spread = () => {
        setSpread(!isSpread)
        setML(false)
        setTotal(false)
    }
    const total = () => {
        setTotal(!isTotal)
        setML(false)
        setSpread(false)
    }

    return (
        <div className='App'>
            <header className="MLB-header">
                <p>MLB ODDS</p>
            </header>
            <div className='topLeftLogo'>
                <Image src={money} />
            </div>

            <div className={`navigation${isActive ? " active" : ""}`}>
                <div className="userBx">
                    <p className="username">Select Bet</p>
                </div>
                <div className="menuToggle" onClick={handleClick}>
                    <span></span>
                </div>
                <ul className="menu">
                    <li>
                        <a onClick={ML}>ML Odds</a>
                    </li>
                    <li>
                        <a onClick={spread}>Spread</a>
                    </li>
                    <li>
                        <a onClick={total}>Total</a>
                    </li>
                </ul>
            </div>

            {arr && arr.map((item) => {
                return (
                    <div key={item[0]} className='body'>

                        {isML ?
                            <div>
                                <p className='box'>{item[1].awayTeam}  {' @ '}  {item[1].homeTeam}
                                    <p className='space'>{item[1].fanduel.awayTeamMLOdds}{" ♦ "}{item[1].fanduel.homeTeamMLOdds}</p></p>
                            </div>
                            : ""}

                        {isSpread ?
                            <p className='box'>{item[1].awayTeam}  {' @ '}  {item[1].homeTeam}
                                <p className='space'>{item[1].fanduel.awayTeamRunLine}{" ♦ "}{item[1].fanduel.homeTeamRunLine}</p>
                                <p className='space'>{item[1].fanduel.awayTeamRunLineOdds}{" ♦ "}{item[1].fanduel.homeTeamRunLineOdds}</p></p>
                            : ""}

                        {isTotal ?
                            <p className='box'>{item[1].awayTeam}  {' @ '}  {item[1].homeTeam}
                                <p className='space'>{"O/U: "}{item[1].fanduel.totalOver}</p>
                                <p className='space'>{"U "}{item[1].fanduel.totalUnderOdds}{" ♦ "}{" O "}{item[1].fanduel.totalOverOdds}</p></p>
                            : ""}

                    </div>
                )
            })}
            <footer>
                <button onClick={() => router.push('/')} className='button'>Home</button>
            </footer>

        </div>
    )
}


export default MLB;