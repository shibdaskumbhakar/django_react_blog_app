import React, { useEffect, useState } from 'react'
import RegisterForm from '../components/RegisterForm'
import { registerAction } from '../actions'

const Register = () => {

  const [registerData, setregisterData] = useState({})
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)

  const fromFillHandle = (e) => {
    if (e.target.name === 'bio') {
      setregisterData({ ...registerData, ['profile']: { [e.target.name]: e.target.value } })
    } else {
      setregisterData({ ...registerData, [e.target.name]: e.target.value })
    }
  }

  const formSubmitHandle = async (event) => {
    event.preventDefault();
    if ('first_name' in registerData && 'last_name' in registerData && 'username' in registerData && 'password' in registerData && 'profile' in registerData && 'email' in registerData) {
      setError(null)
      try {
        const res = await registerAction(registerData)
        setMessage("Registration Success")
        setregisterData({})
      } catch (err) {
        setError('INvalid Data. Please provide the correct data')
      }
    } else {
      setError("All Fields Are Required")
    }

  }

  useEffect(() => {
    console.log(registerData)
  }, [registerData])

  return (
    <div>
      <RegisterForm fromFillHandle={fromFillHandle} formSubmitHandle={formSubmitHandle} error={error} message={message}/>
    </div>
  )
}

export default Register