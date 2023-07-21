import React from 'react';
import { Form, Button } from 'react-bootstrap';

const LoginForm = ({ handleLogin }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin(event);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Usuario</Form.Label>
        <Form.Control
          type="text"
          name="username"
          placeholder="Ingrese su nombre de usuario"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Contraseña</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Ingrese su contraseña"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Iniciar sesión
      </Button>
    </Form>
  );
};

export default LoginForm;
