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
        return "13px";
    } else if (length > 30) {
        return "24px";
    } else if (length > 20) {
        return "26px";
    } else if (length > 10) {
        return "28px";
    } else {
        return "30px";
    }
}

function dateformat(date) {
    return `${trans(date.getHours())}:${trans(date.getMinutes())}`
}

function initialMotto() {
    let m = localStorage.getItem("motto");
    try{
        if (typeof m == "string"){
            m = JSON.parse(m);
        }
    }catch (e) {

    }
    if (m == undefined || m.content === undefined) {
        m = {content: "", wallUrl: ""};
    }
    return m;

}

function Toy() {
    const [date, setDate] = useState(dateformat(new Date()));
    const [motto, setMotto] = useState(initialMotto());
    const [fontSize, setFontSize] = useState(transFontSize(motto.content.length));
    const host = process.env.REACT_APP_MOTTO_HOST ?? "";
    useEffect(() => {
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
        <p className="motto" style={{fontSize: fontSize}}
           dangerouslySetInnerHTML={{__html: motto.content.replaceAll("\n", "</br>")}}/>
    </div>
}

export default Toy;
