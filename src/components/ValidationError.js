import React from 'react'

const ValidationError = (props) => {
    if(!props.message){
        return null
    }
    return (

        <div style={{color: "red"}}>
            {props.message}
        </div>
    )
}

export default ValidationError;
