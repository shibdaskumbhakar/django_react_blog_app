import React, { useEffect, useState } from 'react'
import LoginForm from '../components/LoginForm'
import { loginAction } from '../actions'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [loginData, setLoginData] = useState({})
  const [error, setError] = useState(null)
  const [userData, setUserData] = useState()

  const navigate = useNavigate()

  const fromFillHandle = (e) =>{
    setLoginData({...loginData, [e.target.name]:e.target.value})
  }

  const formSubmitHandle = async (event) =>{
    event.preventDefault();
    if('username' in loginData && 'password' in loginData){
      setError(null)
      try{
        const res = await loginAction(loginData)
        setUserData(res.data.data)
        localStorage.setItem('access', res.data.data.access)
        localStorage.setItem('refresh', res.data.data.refresh)
        navigate('/dashbaord')
      }catch(err){
        setError(err.response.data.message)
      }
      
      
    }else{
      setError("username and password both required")
    }    
  }

  useEffect(() =>{
    console.log(loginData)
  },[loginData])


  return (
    <div>
      <LoginForm formSubmitHandle={formSubmitHandle} fromFillHandle={fromFillHandle} error={error} />
    </div>
  )
}

export default Login