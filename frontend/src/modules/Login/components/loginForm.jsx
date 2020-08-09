import React, { useState } from 'react'
import PropTypes from 'prop-types';
import withRouter from 'react-router-dom/withRouter';
import notification from 'antd/lib/notification';
import axios from 'axios'

const propTypes = {
  history: PropTypes.object.isRequired,
};
const LoginForm = props => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');

  const { history } = props
  const handleLogin = async (e) => {
    
    e.preventDefault();
    setLoading(true);
    if(email === "admin" && password === "admin") {
      notification.success({
        message: 'login success'
      })
      setLoading(false);
      localStorage.setItem('isLoggedIn', true);
      window.location = 'home'
    } else {
      notification.error({
        message: 'login Failed',
        description: "error"
      })
      setLoading(false);
    }
  
  }

  console.log(props)
  const handleChangeEmail = event => {
    setEmail(event.target.value)
  }
  const handleChangePassword = event => {
    setPassword(event.target.value)
  }
  const handleRegister = () => {
    history.push("registration")
  }
  return (
    <section className="login-form-section">
      <form onSubmit={handleLogin}>
        <label className="_spacer-sm">
          Email:
        </label>
        <input className="_spacer-sm" type="text" onChange={handleChangeEmail} />
        <label className="_spacer-sm">
          Password:
        </label>
        <input className="_spacer-sm" type="password" onChange={handleChangePassword} />
        <input className="_spacer-sm login-button" type="submit" value={loading ? "Logging in..." : "Login"} />
        <button className="_spacer-sm register-button" onClick={handleRegister}>Register</button>
      </form>
    </section>
  )
}

LoginForm.propTypes = propTypes;
export default withRouter(LoginForm)
