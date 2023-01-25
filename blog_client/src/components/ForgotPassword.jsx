import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { forgotPasswordAction , savePasswordAction} from '../actions'

const ForgotPassword = () => {

    const [username, setUsername] = useState('')
    const [otp, setOtp] = useState('')
    const [password, setPassword] = useState('')
    const [codeSent, setCodeSent] = useState(false)
    const [error, setError] = useState(null)
    const [message, setMessage] = useState(null)

    const sendCodeHandle = async (event) => {
        event.preventDefault();
        if (username !== '') {
            setError(null)
            try{
                const res = await forgotPasswordAction({ 'username': username })
                setMessage(res.data.message)
                setCodeSent(true)
            }catch(err){
                setMessage(null)
                setError(err.response.data.message.username.username)
            }
            
        } else {
            setError("PLease enter Username")
        }

    }

    const savePasswordHandle = async (event) => {
        event.preventDefault();
        if (username !== '' && otp !== '' && password !== '') {
            setError(null)
            try{
                let data = {
                    "username": username,
                    "otp": otp,
                    "password": password
                }
                const res = await savePasswordAction(data)
                setUsername('')
                setOtp('')
                setPassword('')
                setMessage(res.data.message)
                setCodeSent(true)
            }catch(err){
                setMessage(null)
                setError(err.response.data.message.username.username)
            }
            
        } else {
            setError("PLease enter OTP and Password")
        }

    }

    return (
        <div>
            <div>
                {codeSent === true ? (
                    <form className="login" onSubmit={(e) => savePasswordHandle(e)}>
                    <p style={{color:'red'}}>{error}</p>
                    <p style={{color:'green'}}>{message}</p>
                    <h2>Save New Password</h2>
                    <input type="text" placeholder="OTP" value={otp} name="otp" onChange={(e) => setOtp(e.target.value)} />
                    <input type="text" placeholder="New Password" value={password} name="password" onChange={(e) => setPassword(e.target.value)} />
                    <input type="submit" className='submit_btn' value="Save Password" />
                </form>
                ):(
                    <form className="login" onSubmit={(e) => sendCodeHandle(e)}>
                    <p style={{color:'red'}}>{error}</p>
                    <p style={{color:'green'}}>{message}</p>
                    <h2>Forgot Password!</h2>
                    <input type="text" placeholder="UserName" value={username} name="username" onChange={(e) => setUsername(e.target.value)} />
                    <input type="submit" className='submit_btn' value="Send Code" />
                </form>
                )}
                
            </div>
        </div>
    )
}

export default ForgotPassword