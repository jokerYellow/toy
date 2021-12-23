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
    try {
        if (typeof m == "string") {
            m = JSON.parse(m);
        }
    } catch (e) {

    }
    if (m == undefined || m.content == undefined) {
        m = {content: "", wallUrl: ""};
    }
    return m;

}

function Toy() {
    const urlParams = new URLSearchParams(window.location.search);
    let initMotto = {wallUrl: null, content: null};
    let isPreview = false;
    if (urlParams !== undefined) {
        initMotto.wallUrl = urlParams.get('wallUrl') ?? null;
        if (initMotto.wallUrl != null) {
            initMotto.wallUrl = decodeURI(initMotto.wallUrl);
        }
        initMotto.content = urlParams.get('content') ?? null;
    }
    if (initMotto.content == null && initMotto.wallUrl == null) {
        initMotto = initialMotto()
    } else {
        isPreview = true;
    }
    const [time,setTime] = useState(dateformat(new Date()));
    const [date, setDate] = useState(CurrentDate());
    const [motto, setMotto] = useState(initMotto);
    const host = process.env.REACT_APP_MOTTO_HOST ?? "";

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
