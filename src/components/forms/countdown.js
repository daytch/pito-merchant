import React, { useState, useEffect } from 'react'
import Moment from 'moment'
import Converter from 'configs/moment/DatetimeConverter'

const Countdown = ({ StartTime, isMini }) => {

    Moment.locale('en-sg');
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        let myInterval = setInterval(() => {

            // Get today's date and time
            var now = new Date().getTime();

            // Find the distance between now and the count down date
            var distance = new Date(Converter.convertToLocal(StartTime)).getTime() - now;

            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            days = days < 10 ? '0' + days : days;
            hours = hours < 10 ? '0' + hours : hours;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            seconds = seconds < 10 ? '0' + seconds : seconds;

            setDays(days);
            setHours(hours);
            setMinutes(minutes);
            setSeconds(seconds);
        }, 1000)
        return () => {
            clearInterval(myInterval);
        };
    });


    return (
        isMini ? (
            <div className="container-countdown-mn space-x-4">
                <div className="text-starting-mn inline-block text-red-600">Starting in<br />
                    <p className="starting-in font-light text-white">{Moment(StartTime).format('lll')}</p>
                </div>
                <div className="inline-block">
                    <div className="timer-mn font-light text-white">{days}:{hours}:{minutes}:{seconds}</div>
                    <p className="font-starting-in-mn font-light text-white">day : hour : min : sec</p>
                </div>
            </div>
        ) :
            (
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
    )
}

export default Countdown;
