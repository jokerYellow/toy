import React, {useEffect, useState} from "react";
import './todo.css'

const key = {
    focus:"com.pipasese.focus",
    items:"com.pipasese.focus.items"
}

export default function Todo() {
    const input = React.createRef();
    const [focus, setFocus] = useState(localStorage.getItem(key.focus) ?? "");
    const [items, setitems] = useState(JSON.parse(localStorage.getItem(key.items)) ?? []);
    const [value, setValue] = useState("");
    useEffect(() => {
        if (input.current != null) {
            input.current.focus();
        }
    }, [input])

    const save = (o) => {
        if (o.charCode !== 13) {
            return;
        }
        if (value.length === 0) {
            return
        }
        localStorage.setItem(key.focus,value)
        setFocus(value)
        setValue("")
    }

    const change = (v) => {
        setValue(v.target.value);
    }

    const check = (v)=>{
        console.log("hello")
        const done = [focus,...items]
        setitems(done)
        setFocus("")
        localStorage.setItem(key.focus,"")
        localStorage.setItem(key.items,JSON.stringify(done))
    }

    const showInput = focus.length === 0

    const listItems = items.slice(0,3).map((value,index)=>{
        return <li className={'done'} key={index}>{value}</li>
    })

    return (
        <div className='todo'>
            {showInput &&
            <input className={'input'} type={"text"} value={value} placeholder='what do you want to do?' ref={input}
                   onKeyPress={save}
                   onChange={change}/>}
            {!showInput && <div className={'todoShow'}>
                <p className='todoContent'>{focus}</p>
                <input className={'checkbox'} type={"checkbox"} onChange={check}/>
            </div>}
            <div className='line'/>
            {listItems}
        </div>
    )
}