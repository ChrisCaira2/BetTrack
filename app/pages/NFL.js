'use client'
import React, { useState, useEffect } from 'react';


function NFL() {
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

    const fetchMe = () => {

        // fetch(`https://tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com/getNFLBettingOdds?gameDate=20231008`, {
        //     method: 'GET',
        //     headers: {
        //         'X-RapidAPI-Key': '9441af4572msh072585be2e742b1p199714jsnc836d63d57d2',
        //         'X-RapidAPI-Host': 'tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com'
        //     }
        // })
        //     .then(response => {
        //         return response.json();
        //     }).then(data => {
        //         setContainer(data.body)
        //     }).catch(err => {
        //         console.error(err);
        //     });
    }

    return (
        <div className='App'>
            <header className="App-header">
                <p>NFL ODDS</p>
            </header>

            {/* {Array.from(container).map(item => {
                return (
                    <div key={item.gameID} className='App-header'>
                        {item.fanduel && item.fanduel.map(data => (
                            <div key={data.gameID}>
                                <p>hello</p>
                            </div>
                        ))}
                    </div>
                )
            })} */}
        </div>
    )
}


export default NFL;