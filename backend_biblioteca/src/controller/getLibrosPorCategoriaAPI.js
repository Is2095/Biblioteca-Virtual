
import 'dotenv/config';

const APIKEY = process.env.APIKEY;

const ObtenerLibrosPorCategoriaAPI = (req, res) => {

    const categoria = req.query.categoria;

    fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${categoria}&maxResults=5&langRestrict=es&key=${APIKEY}`)
        .then(result => result.json())
        .then(libros => libros.items)
        .then(librosCategoria => {
            const datosLibros = [];
            librosCategoria?.forEach(items => {
                if (items.volumeInfo.description && items.volumeInfo.imageLinks && items.volumeInfo.authors && items.volumeInfo.publishedDate) {
                    datosLibros.push({
                        id: items.id,
                        authors: items.volumeInfo.authors[0],
                        description: items.volumeInfo.description,
                        imageLink: items.volumeInfo?.imageLinks?.thumbnail,
                        language: items.volumeInfo.language,
                        pageCount: items.volumeInfo.pageCount,
                        title: items.volumeInfo.title,
                        publishedDate: items.volumeInfo.publishedDate,
                        categoria: categoria
                    });
                };
            });
            res.status(200).json(datosLibros);
        })
        .catch(err => console.log(err));
};

export default ObtenerLibrosPorCategoriaAPI;