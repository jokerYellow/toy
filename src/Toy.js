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

function Toy() {
    const [date, setDate] = useState(new Date())
    const [motto, setMotto] = useState(localStorage.getItem("motto"))
    setTimeout(() => {
        setDate(new Date());
    }, 1000);
    useEffect(() => {
        axios.get("/motto/today").then(res => {
            if (res.status === 200) {
                localStorage.setItem("motto", res.data)
                setMotto(res.data);
            }
        })
    }, []);

    return <div
        className="back center"
        style={{backgroundImage: `url(${backgroundImage1})`}}>
        <p className="clock">{`${trans(date.getHours())}:${trans(date.getMinutes())}`}</p>
        <p className="motto" dangerouslySetInnerHTML={{__html: motto.replaceAll("\n", "</br>")}}/>
    </div>
}

export default Toy;