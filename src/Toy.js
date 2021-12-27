import './Toy.css';
import React, {useEffect, useState} from "react";
import axios from "axios";
import {CurrentDate} from "./DateUtil";

function trans(d) {
    if (d < 10) {
        return `0${d}`;
    }
    return d;
}

function dateformat(date) {
    return `${trans(date.getHours())}:${trans(date.getMinutes())}`
}

function initialMotto() {
    let m = localStorage.getItem("motto");
    if (m == null) {
        return {content: "", wallUrl: ""};
    }
    let info;
    try {
        info = JSON.parse(m);
    } catch (e) {
        return {content: "", wallUrl: ""};
    }
    if (info === undefined || m.content === undefined) {
        m = {content: "", wallUrl: ""};
    }
    return info;

}

function getMottoFromParams(){
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('wallUrl') != null) {
        let motto = {wallUrl: null, content: null};
        motto.wallUrl = urlParams.get('wallUrl') ?? null;
        motto.content = urlParams.get('content') ?? null;
        return motto;
    }
    return null;
}

function Toy() {
    let initMotto = {wallUrl: null, content: null};
    let isPreview = false;
    let preMotto = getMottoFromParams();
    if (preMotto !== null) {
        initMotto = preMotto;
        isPreview = true;
    }else{
        initMotto = initialMotto();
    }
    const [time, setTime] = useState(dateformat(new Date()));
    const [date, setDate] = useState(CurrentDate());
    const [motto, setMotto] = useState(initMotto);
    const host = process.env['REACT_APP_MOTTO_HOST'] ?? "";

    useEffect(() => {
        if (isPreview) {
            return
        }
        axios.get(`${host}/motto/today/v1`).then(res => {
            if (res.status === 200) {
                const motto = res.data.content;
                localStorage.setItem("motto", JSON.stringify(motto))
                setMotto(motto);
            }
        })
    }, []);
    useEffect(() => {
        let timer = setInterval(() => {
            setDate(CurrentDate());
            setTime(dateformat(new Date()));
        }, 1000);
        return () => {
            clearTimeout(timer);
        }
    }, [date])

    return <div
        style={{backgroundImage: `url(${motto.wallUrl})`}}>
        <p className="date">{date}</p>
        <p className="clock">{time}</p>
        <p className="motto"
           dangerouslySetInnerHTML={{__html: motto.content.replaceAll("\n", "</br>")}}/>
    </div>
}

export default Toy;
