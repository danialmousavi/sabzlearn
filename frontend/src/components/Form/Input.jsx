import React, { useReducer } from 'react'
import'./Input.css'
import validator from '../../validators/validators'
const inputReducer=(state,action)=>{
    switch(action.type){
        case"CHANGE":{
            return {...state,value:action.value,isValid:validator(action.value,action.validations)}
        }
        default:{
            return state
        }
    }
}
export default function Input(props) {
    
    const [mainInput,dispatch]=useReducer(inputReducer,{value:'',isValid:false})


    const handleChangeInput=(e)=>{
        dispatch({type:"CHANGE",value:e.target.value,isValid:true, validations:props.validations})   
    }


    const element=props.element==='input'?(
        <input
        className={`${props.className} ${mainInput.isValid?"success":"error"}`}
        type={props.className}
        placeholder={props.placeholder}
        onChange={handleChangeInput}
        value={mainInput.value}
        />
    ):(
        <textarea 
        className={props.className}
        placeholder={props.placeholder}
        onChange={handleChangeInput}
        value={mainInput.value}
        />
    )
  return (
    <div>
        {element}
    </div>
  )
}
