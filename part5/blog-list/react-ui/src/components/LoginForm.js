import React, { useState } from 'react'
import { loginService } from '../services/login'
import { blogService } from '../services/blogs'

export const LoginForm = ({ setUser, handleNotification }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService
        .login({ username, password })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      setUsername('')
      setPassword('')
      setUser(user)
      handleNotification('successful', `${user.name} successful logged in`)
      blogService.setToken(user.token)
    } catch (error) {
      handleNotification('error', 'wrong username or password')
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  )
}
