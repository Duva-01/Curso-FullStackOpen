import React, { useState, useImperativeHandle } from 'react';

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      {!visible && <button onClick={toggleVisibility}>{props.buttonLabel}</button>}
      {visible && (
        <div>
          {props.children}
          <button onClick={toggleVisibility}>Cancel</button>
        </div>
      )}
    </div>
  );
});

// Para darle un nombre al componente para propósitos de debugging y mostrar mensajes de error
Togglable.displayName = 'Togglable';

export default Togglable;
