import React, {useEffect, useState} from "react";
import './todo.css'
import {todoManager} from "../../todo";

const key = {
    focus: "com.pipasese.focus",
    items: "com.pipasese.focus.items"
}

export default function Todo() {
    const input = React.createRef();
    const [focus, setFocus] = useState(localStorage.getItem(key.focus) ?? "");
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
        localStorage.setItem(key.focus, value)
        setFocus(value)
        setValue("")
        document.activeElement.blur()
    }

    const change = (v) => {
        setValue(v.target.value);
    }

    const check = () => {
        todoManager.add(focus)
        setFocus("")
        localStorage.setItem(key.focus, "")
        todoManager.refresh()
    }

    let showInput = focus.length === 0

    const inputElement = <div className={"fixedHeight centerElement"}>
        <input className={"input"}
               type={"text"}
               value={value}
               placeholder='what do you want to do?'
               ref={input}
               onKeyPress={save}
               onChange={change}
               disabled={showInput ? "" : "disabled"}
        />
        <div className='line'/>
    </div>
    const todo = <div className={"focus fixedHeight"}>
        <p>{focus}</p>
        <input className={'checkbox'} type={"checkbox"} onChange={check}/>
    </div>
    return <div className={"todo centerElement"}>
        {showInput ? inputElement : todo}
    </div>
}