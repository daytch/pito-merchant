import React, { useState, useEffect } from 'react'
import Moment from 'moment'


const Countdown = ({ StartTime }) => {
    // const [minutes, setMinutes] = useState(5);
    // const [seconds, setSeconds] = useState(60);

    Moment.locale('en-sg');
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        let myInterval = setInterval(() => {

            const then = Moment(StartTime);
            const now = Moment();
            const countdown = Moment(then - now);
            const day = countdown.format('DD');
            const hour = countdown.format('HH');
            const minute = countdown.format('mm');
            const second = countdown.format('ss');
            setDays(day);
            setHours(hour);
            setMinutes(minute);
            setSeconds(second);
        }, 1000)
        return () => {
            clearInterval(myInterval);
        };
    });


    return (
        <div className="container-countdown space-x-4">
            <div className="text-starting inline-block text-red-600">Starting in<br />
                <p className="starting-in font-light text-white">{Moment(StartTime).format('lll')}</p>
            </div>
            <div className="inline-block">
                <div className="timer font-light text-white">{days}:{hours}:{minutes}:{seconds}</div>
                <p className="font-starting-in font-light text-white">day : hour : minute : second</p>
            </div>
        </div>
    )
}

export default Countdown;
