import React from 'react'
import { Link } from 'react-router-dom'

const RegisterForm = (props) => {
  return (
    <div>
      <form className="register" onSubmit={(e) => props.formSubmitHandle(e)}>
        <h2>Welcome, User!</h2>
        <p>Please Register</p>
        <p style={{color:'red'}}>{props.error}</p>
        <p style={{color:'green'}}>{props.message}</p>
        <input type="text" placeholder="UserName" name="username" onChange={(e) => props.fromFillHandle(e)} />
        <input type="email" placeholder="Email" name="email" onChange={(e) => props.fromFillHandle(e)} />
        <input type="text" placeholder="First Name" name="first_name" onChange={(e) => props.fromFillHandle(e)} />
        <input type="text" placeholder="Last Name" name="last_name" onChange={(e) => props.fromFillHandle(e)} />
        <input type="text" placeholder="BIO" name="bio" onChange={(e) => props.fromFillHandle(e)} />
        <input type="password" placeholder="Password" name="password"  onChange={(e) => props.fromFillHandle(e)}/>
        <input type="submit" className='submit_btn' value="Register" />
        <div className="links">
          <p href="#" className='login_link'>Already have and account? <span><Link to='/login'>login</Link> </span></p>
        </div>
      </form>
    </div>
  )
}

export default RegisterForm