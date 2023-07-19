## Resumen de la Parte 6 del Curso Full Stack

En la Parte 6 del curso Full Stack, hemos explorado el uso de Redux y otras herramientas para gestionar el estado de las aplicaciones de React de manera más eficiente. Aprendimos sobre la arquitectura Flux y Redux, la implementación de múltiples reducers, la comunicación con el servidor, y otras técnicas avanzadas.

### Flux-architecture y Redux:

La arquitectura Flux es un patrón de diseño de aplicaciones de React que se centra en un flujo de datos unidireccional. Redux es una implementación popular de la arquitectura Flux y se utiliza para administrar el estado de la aplicación de manera centralizada. Redux proporciona un store donde se almacena el estado de la aplicación y utiliza acciones y reducers para gestionar las actualizaciones del estado.

### Muchos reducers:

En Redux, los reducers son funciones puras que especifican cómo cambia el estado de la aplicación en respuesta a una acción. En aplicaciones más grandes, es común tener muchos reducers para gestionar diferentes partes del estado. Cada reducer se encarga de un subconjunto específico del estado y se combinan utilizando la función `combineReducers` de Redux para crear el rootReducer, que se pasa al store de Redux.

### Comunicarse con el servidor en una aplicación redux:

Para comunicarse con el servidor en una aplicación Redux, generalmente se utilizan solicitudes HTTP. Se pueden realizar solicitudes al servidor utilizando bibliotecas como axios o fetch. Los datos recibidos del servidor se utilizan para actualizar el estado de la aplicación a través de acciones y reducers. Las solicitudes pueden ser desencadenadas por eventos en los componentes de React o como parte de la inicialización de la aplicación.

### React Query, useReducer y el contexto:

React Query es una biblioteca que simplifica la gestión del estado de la aplicación y las operaciones de comunicación con el servidor. Proporciona hooks como `useQuery` y `useMutation` que facilitan la obtención de datos del servidor y la realización de mutaciones. Estos hooks administran automáticamente el estado de la consulta y las operaciones de caché.

Por otro lado, `useReducer` es un hook de React que permite gestionar el estado local de un componente utilizando un reducer. Es una alternativa más ligera a Redux y se puede utilizar en combinación con el contexto de React para compartir el estado entre componentes. El contexto de React, que se utiliza junto con el hook `useContext`, permite pasar datos a través del árbol de componentes sin necesidad de pasar props manualmente. Es una forma conveniente de compartir datos entre múltiples componentes sin tener que pasarlos a través de múltiples niveles de componentes intermedios.

### connect (la parte antigua):

La función `connect` es una parte más antigua de React Redux que se utiliza para conectar componentes de React al store de Redux. Proporciona una forma de acceder al estado y despachar acciones sin necesidad de utilizar los hooks `useSelector` y `useDispatch`. Con `connect`, se definen las funciones `mapStateToProps` y `mapDispatchToProps` para mapear el estado y las acciones al props del componente respectivamente. Luego, el componente se envuelve en la función `connect` para obtener acceso al store de Redux.

### Anécdotas con Redux

En el proyecto de Anécdotas, implementamos Redux para administrar el estado de la aplicación de manera centralizada. Utilizamos la biblioteca react-redux para conectar los componentes de React con el store de Redux. Definimos acciones y reducers para manejar las operaciones de creación y votación de anécdotas. Luego, configuramos el store de Redux utilizando la función configureStore de @reduxjs/toolkit. Con esto, pudimos acceder al estado global y despachar acciones en nuestros componentes utilizando los hooks useSelector y useDispatch proporcionados por react-redux. Además, implementamos notificaciones utilizando Redux, creando un reducer separado y actualizando el estado correspondiente al crear o votar una anécdota.

### Unicafe con Redux

En el proyecto de Unicafe, también utilizamos Redux para administrar el estado de la aplicación. Implementamos acciones y reducers para manejar las operaciones de registro de retroalimentación y cálculo de estadísticas. Configuramos el store de Redux utilizando configureStore y conectamos nuestros componentes con Redux utilizando react-redux. Esto nos permitió acceder al estado global y despachar acciones en los componentes de React. Implementamos reducers separados para manejar las operaciones de registro de retroalimentación y cálculo de estadísticas, utilizando el hook useSelector para obtener los datos relevantes del estado global y el hook useDispatch para despachar las acciones correspondientes.

### React Query y uso de contexto

En la Parte 6 del curso Full Stack, también exploramos el uso de React Query, una biblioteca que simplifica la gestión del estado de la aplicación y las operaciones de comunicación con el servidor. React Query nos permitió realizar solicitudes al servidor y manejar los datos de manera eficiente. Utilizamos el hook useQuery para obtener los datos del servidor y el hook useMutation para realizar mutaciones. Estos hooks se encargaron automáticamente del estado de la consulta y de las operaciones de caché. Además, en lugar de Redux, también aprendimos a utilizar el contexto de React y el hook useContext para administrar el estado de la aplicación de manera más ligera y sin la necesidad de instalar librerías adicionales.
