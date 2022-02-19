import { Button } from '@mui/material'
import React from 'react'
import { auth, provider } from '../firebase'
import './login.css'
import { useStateValue } from '../StateProvider'
import { actionTypes } from '../reducer'

function Login() {
    const [{}, dispatch] = useStateValue();

    function signIn(){
        auth
        .signInWithPopup(provider)
        .then((result) => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user
            })
        })
        .catch((error) => alert(error.message));
    }

    return (
        <div className='login'>
            <div className='login_container'>
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="LoGO"/>
                <div className='login_text'>
                    <h1>Let's Connect</h1>
                </div>
                <Button onClick={signIn}>Sign In With Google</Button>
            </div>
        </div>
    )
}

export default Login