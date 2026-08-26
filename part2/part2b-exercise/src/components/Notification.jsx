const Notification = ({message, error}) => {
    const successStyling = {color:'green',background:"lightgrey",fontSize:"20px",borderStyle:"solid",borderRadius:"5px",padding:"10px",marginBottom:"10px"}
    const errorStyling = {color:'red',background:"lightgrey",fontSize:"20px",borderStyle:"solid",borderRadius:"5px",padding:"10px",marginBottom:"10px"}
    
    if (message === null) {
        return null
    }

    return (
        <div style={error ? errorStyling : successStyling}>
            {message}
        </div>
    )
}

export default Notification