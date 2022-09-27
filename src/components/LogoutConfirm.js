import React from 'react'
import "./styles/Confirmation.css"
import { useHistory } from "react-router-dom";

function LogoutConfirm() {
    const history = useHistory();
    return (
        <div className='confirm_container'>
            <div className='confirm_message_container'>
                <h1>You Have Successfully Logged Out!</h1>
                <button className='go_home_button' onClick={() => { history.push("") }}>Navigate Back To Home</button>
            </div>
        </div>
    )
}

export default LogoutConfirm