import React from 'react'

function Alert(props) {

    const cap=(word)=>{
        const text=word.toLowerCase();
        return text.charAt(0).toUpperCase()+text.slice(1);
    }
  return (
    props.alert&& <div className="alert alert-warning alert-dismissible fade show" role={props.alert.type}>
     <strong>{cap(props.alert.type)}</strong>  {props.alert.msg}
  </div>
  )
}

export default Alert