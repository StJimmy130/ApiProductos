function buscarTodasLasTareas(){
    fetch ('https://localhost:7139/api/TodoItems')
    .then(respuesta => console.info(respuesta.json()))
    .catch(error => console.error('no se pudo acceder a la api', error));
}