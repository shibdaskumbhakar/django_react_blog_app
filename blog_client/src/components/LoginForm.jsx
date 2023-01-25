import React from 'react'
import { Link } from 'react-router-dom'

const LoginForm = (props) => {
  return (
    <div>
      <form className="login" onSubmit={(e) => props.formSubmitHandle(e)}>
        <h2>Welcome, User!</h2>
        <p>Please log in</p>
        <p style={{color:'red'}}>{props.error}</p>
        <input type="text" placeholder="UserName" name="username" onChange={(e) => props.fromFillHandle(e)} />
        <input type="password" placeholder="Password" name="password"  onChange={(e) => props.fromFillHandle(e)}/>
        <input type="submit" className='submit_btn' value="Log In" />
        <div className="links">
          <Link to='/forgot-password' className='forgot_password'>Forgot password</Link>
        </div>
      </form>
    </div>
  )
}

export default LoginForm