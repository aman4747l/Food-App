import classes from './Input.module.css'
import React from 'react'
const Input = React.forwardRef<HTMLInputElement,{label: string,input:{id: string;type:string;min:string;max:string;step:string;defaultValue:string}}>((props, ref) => {
    return (
        <div className={classes.input}>
            <label htmlFor={props.input.id}>{props.label}</label>
            <input ref={ref}  {...props.input} />
        </div>
    )
}
)
export default Input