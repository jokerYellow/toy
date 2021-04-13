import './Toy.css';
import backgroundImage1 from './wp1854626-the-witcher-3-wallpapers.jpg';
import {useEffect, useState} from "react";
import axios from "axios";

function trans(d) {
    if (d < 10) {
        return `0${d}`;
    }
    return d;
}

function transFontSize(length){
    if (length > 40){
        return "14px";
    }else if (length > 30){
        return "17px";
    }else if (length > 20){
        return "19px";
    }else if (length > 10){
        return "22px";
    }else {
        return "24px";
    }
}

function Toy() {
    const [date, setDate] = useState(new Date())
    const [motto, setMotto] = useState(localStorage.getItem("motto"))
    const [fontSize, setFontSize] = useState("10px")
    setTimeout(() => {
        setDate(new Date());
    }, 1000);
    useEffect(() => {
        axios.get("/motto/today").then(res => {
            if (res.status === 200) {
                localStorage.setItem("motto", res.data)
                setMotto(res.data);
                setFontSize(transFontSize(res.data.length));
            }
        })
    }, []);

    return <div
        className="back center"
        style={{backgroundImage: `url(${backgroundImage1})`}}>
        <p className="clock">{`${trans(date.getHours())}:${trans(date.getMinutes())}`}</p>
        <p className="motto" style={{fontSize:fontSize}} dangerouslySetInnerHTML={{__html: motto.replaceAll("\n", "</br>")}}/>
    </div>
}

export default Toy;