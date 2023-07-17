import React from 'react'

const LoginForm = ({ username, password, setUsername, setPassword, handleLogin }) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        handleLogin(event);
      };
    
      return (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Usuario</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button type="submit">Iniciar sesión</button>
        </form>
      );
    };
    
    export default LoginForm;