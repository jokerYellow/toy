import './Toy.css';
import React, {useEffect, useState} from "react";
import axios from "axios";
import {CurrentDate} from "../../DateUtil";
import Todo from '../todo/todo';

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
    let initMotto;
    let isPreview = false;
    let preMotto = getMottoFromParams();
    if (preMotto !== null) {
        initMotto = preMotto;
        isPreview = true;
    }else{
        initMotto = initialMotto();
    }
    const [time, setTime] = useState(dateformat(new Date()));
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
    }, [host, isPreview]);
    useEffect(() => {
        let timer = setInterval(() => {
            setTime(dateformat(new Date()));
        }, 1000);
        return () => {
            clearTimeout(timer);
        }
    }, [])

    return <div className='container'
        style={{backgroundImage: `url(${motto.wallUrl})`}}>
        <p className="clock">{time}</p>
        <p className="motto"
           dangerouslySetInnerHTML={{__html: motto.content.replaceAll("\n", "</br>")}}/>
        <Todo/>
    </div>
}

export default Toy;
