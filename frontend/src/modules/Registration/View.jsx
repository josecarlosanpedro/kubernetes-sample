
import React, { useEffect } from 'react'
import notification from 'antd/lib/notification'
import Spin from 'antd/lib/spin'
import RegisterForm from './components/registerForm'

const Register = props => {
  console.log(props, 'props *** ')
  const { services } = props

  return (
    <section className="register-section">
      <RegisterForm services={services} />
    </section>
  )
}

export default Register
