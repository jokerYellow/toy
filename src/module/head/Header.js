import "./Head.css"
import {CurrentDate} from "../../DateUtil";
import {useEffect, useState} from "react";
import {todoManager} from "../../todo";

export default function Header() {
    const [date, setDate] = useState(CurrentDate());
    const [items, setItems] = useState(todoManager.items);
    const [show, setShow] = useState(false);
    useEffect(() => {
        let timer = setInterval(() => {
            setDate(CurrentDate());
        }, 1000);
        return () => {
            clearTimeout(timer);
        }
    }, [date])
    useEffect(() => {
        todoManager.refresh = () => {
            setItems(todoManager.items)
        }
    }, [items])

    const list = todoManager.items.map((x, index) => {
        return <li key={index}>{x}</li>
    })

    const showClick = () => {
        setShow(!show)
    }

    return (
        <header>
            <li className="headFont">{date}</li>
            <button className="headFont" onClick={showClick}>what I've done?</button>
            <ul className={`${show ? 'show' : 'show inshow'}`}>
                {list}
            </ul>
        </header>
    )
}