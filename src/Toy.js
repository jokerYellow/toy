import './Toy.css';
import React, {useEffect, useState} from "react";
import axios from "axios";

function trans(d) {
    if (d < 10) {
        return `0${d}`;
    }
    return d;
}

function transFontSize(length) {
    if (length > 40) {
        return 23;
    } else if (length > 30) {
        return 30;
    } else if (length > 20) {
        return 35;
    } else if (length > 10) {
        return 38;
    } else {
        return 40;
    }
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
    if (m === undefined || m.content === undefined) {
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
        if (initMotto.wallUrl != null){
            initMotto.wallUrl = decodeURI(initMotto.wallUrl);
        }
        initMotto.content = urlParams.get('content') ?? null;
    }
    if (initMotto.content == null && initMotto.wallUrl == null) {
        initMotto = initialMotto()
    } else {
        isPreview = true;
    }
    const [date, setDate] = useState(dateformat(new Date()));
    const [motto, setMotto] = useState(initMotto);
    const [fontSize, setFontSize] = useState(transFontSize(motto.content.length));
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
                setFontSize(transFontSize(motto.content.length));
            }
        })
    }, []);
    useEffect(() => {
        let timer = setInterval(() => {
            setDate(dateformat(new Date()));
        }, 1000);
        return () => {
            clearTimeout(timer);
        }
    }, [date])

    return <div
        className="back center"
        style={{backgroundImage: `url(${motto.wallUrl})`}}>
        <p className="clock">{date}</p>
        <p className="motto" style={{fontSize: fontSize+"px",lineHeight:(fontSize+10)+"px"}}
           dangerouslySetInnerHTML={{__html: motto.content.replaceAll("\n", "</br>")}}/>
    </div>
}

export default Toy;
