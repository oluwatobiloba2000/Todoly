import React, { useState } from 'react'

function Focusable(props) {
    const [focus, setFocus] = useState(false);

    return (
        <span style={props.style} onFocus={()=> setFocus(true)} onBlur={()=> setFocus(false)}>
            {props.children(focus)}
        </span>
    )
}

export default Focusable
