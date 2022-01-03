import React, {useEffect, useState} from "react";
import './todo.css'

export default function Todo() {
    const input = React.createRef();
    const [focus, setFocus] = useState("");
    const [items, setitems] = useState([]);
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
        setFocus(value)
        setValue("")
    }

    const change = (v) => {
        setValue(v.target.value);
    }

    const check = (v)=>{
        console.log("hello")
        setitems([...items,focus])
        setFocus("")
    }

    const showInput = focus.length === 0

    const listItems = items.map((x)=>{
        return <li className={'done'} key={x}>{x}</li>
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