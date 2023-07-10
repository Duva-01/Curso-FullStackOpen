## Resumen de la Parte 2 del Curso Full Stack

En la Parte 2 del Curso Full Stack, nos centramos en mejorar la funcionalidad y la experiencia del usuario en nuestros proyectos. Veamos el progreso que logramos en tres proyectos: "Información del Curso", "Países" y "Agenda Telefónica".

### Información del Curso

En el proyecto de Información del Curso, implementé características adicionales para gestionar los datos de los cursos. Creé un formulario para agregar nuevos cursos, permitiendo a los usuarios ingresar el nombre del curso y el número de ejercicios. También implementé una función para calcular el número total de ejercicios de todos los cursos. Para lograr esto, utilicé la función `reduce` para recorrer el array de cursos y acumular la cantidad de ejercicios.

### Países

En el proyecto de Países, amplié la funcionalidad para buscar y mostrar información sobre varios países. Me integré con la API REST Countries para obtener datos como el nombre del país, la capital, la población, los idiomas y la bandera. Implementé una función de búsqueda que permite a los usuarios filtrar los países por nombre, lo que hace que la aplicación sea más fácil de usar. Además, agregué un botón para mostrar información detallada sobre un país específico, mostrando datos adicionales como la moneda, las zonas horarias y los bloques regionales.

### Agenda Telefónica

En el proyecto de la Agenda Telefónica, creé una aplicación sencilla de agenda telefónica utilizando React y un servidor backend. Me integré con un servidor Express.js e implementé funcionalidades para agregar, eliminar y filtrar contactos. Utilicé la biblioteca Axios para manejar las solicitudes HTTP al servidor backend y gestioné el estado de los contactos utilizando el hook `useState` de React. Además, implementé verificaciones de validación para evitar la entrada de contactos duplicados y proporcioné comentarios al usuario a través de alertas.

Para mejorar la experiencia del usuario, agregué notificaciones para mostrar mensajes de éxito o error al realizar operaciones como agregar, actualizar o eliminar contactos. También mejoré el manejo de errores al mostrar mensajes de error y registrarlos en la consola con fines de depuración.

Además, abordé el problema de sincronización que surge cuando varios usuarios interactúan con la aplicación al mismo tiempo. Para manejar esto, introduje la versión del objeto en el servidor backend y modifiqué el código frontend para incluir la versión al realizar operaciones como eliminar contactos. Este enfoque garantiza la consistencia de los datos y evita conflictos al eliminar contactos en diferentes instancias del navegador.
