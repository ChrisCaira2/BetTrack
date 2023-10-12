'use client'
import '/app/App.css';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import money from '/app/money.svg';
import Image from 'next/image';


function NFL() {
    const router = useRouter()

    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let date = today.getDate();

    if (date < 10) { date = "0" + date.toString() } else { date = date.toString() }
    if (month < 10) { month = "0" + month.toString() } else { month = month.toString() }

    const currentDate = year + '' + month + '' + date;


    const [container, setContainer] = useState([]);


    const [isActive, setIsActive] = useState(false);

    const [isML, setML] = useState(true);
    const [isSpread, setSpread] = useState(false);
    const [isTotal, setTotal] = useState(false);

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


    const handleClick = () => {
        setIsActive(!isActive);
    };



    useEffect(() => {
        fetchMe()
    }, [])

    //20231008
    //${currentDate}
    const fetchMe = () => {

        fetch(`https://tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com/getNFLBettingOdds?gameDate=${currentDate}`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '9441af4572msh072585be2e742b1p199714jsnc836d63d57d2',
                'X-RapidAPI-Host': 'tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com'
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

    return (
        <div className='App'>
            <div className='topLeftLogo'>
                <Image src={money} />
            </div>
            <header className="MLB-header">
                <p>NFL ODDS</p>
            </header>

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
                                <p className='space'>{item[1].fanduel.awayTeamSpread}{" ♦ "}{item[1].fanduel.homeTeamSpread}</p>
                                <p className='space'>{item[1].fanduel.awayTeamSpreadOdds}{" ♦ "}{item[1].fanduel.homeTeamSpreadOdds}</p>
                            </p>
                            : ""}

                        {isTotal ?
                            <p className='box'>{item[1].awayTeam}  {' @ '}  {item[1].homeTeam}
                                <p className='space'>{"O/U: "}{item[1].fanduel.totalUnder}</p>
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


export default NFL;