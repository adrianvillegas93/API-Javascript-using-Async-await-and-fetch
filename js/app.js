let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click', () => {

    if (pagina < 1000) {
        pagina += 1;
        cargarPeliculas();
    }
});

btnAnterior.addEventListener('click', () => {
    if (pagina > 1) {
        pagina -= 1;
        cargarPeliculas();
    }
});




////Esta es una forma de hacerlo con solo fetch
// const cargarPeliculas = () => {
//     fetch(url)
//         .then(response => response.json())
//         .then(data => console.log(data.results));
//         // console.log(data);
// }


/////La otra forma igual es con fetch pero con async await
const cargarPeliculas = async () => {

    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=438e6ba69ca2c3f58cb2075b8eeb7cd2&language=es-MX&page=${pagina}`);

        if (response.status === 200) {
            const data = await response.json();

            let peliculas = '';
            ////Los podemos recorrer con forEach():
            data.results.forEach(pelicula => {
                peliculas += `
                    <div class="pelicula">
                        <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                        <h3>${pelicula.title}</h3>
                    </div>
                    `;
            })

            document.getElementById('contenedor').innerHTML = peliculas;

            ////Esta es otra forma de recorrer los datos
            // data.results.map(peli => {
            //     console.log(peli.title);
            // })

            // console.log(data.results);   
        } else if (response.status == 401) {
            console.log('Error en la API KEY');
        } else if (response.status === 404) {
            console.log('La peliicula que buscas no existe');
        } else {
            console.log('Hubo un error en la busqueda');
        }

    } catch (error) {
        console.log(`hubo un error ${error}`);
    }

}


cargarPeliculas();