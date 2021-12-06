const models = require("../models");
const validaciones = require("./validaciones");

const getMovies = async (req, res) => {
    try {
        const response = await models.Movies.find();

        return res.status(200).json(
            {
                data: response,
                error: false,
            }
        );
    } catch (error) {
        return res.status(500).json(
            {
                msg: error,
                error: true,
            }
        ); 
    }
};

const getMovieById = async (req, res) => {
    try {
        const movieId = req.params.id;

        if (!validaciones.isValidId(movieId)) {
            return res.status(400).json({
                data: `El valor ${movieId} no es un ID válido de MongoDB`,
                error: true,
              });
        }

        const response = await models.Movies.findById(movieId);

        if (response) {
        return res.status(200).json(
                {
                    data: response,
                    error: false,
                }
            );
        } else {
            return res.status(404).json(
                {
                    msg: `La Película con Id ${req.params.id} no existe`,
                    error: true,
                }
            );
        }
    } catch (error) {
        return res.status(500).json(
            {
                msg: error,
                error: true,
            }
        );
    }
};

const addMovie = async (req, res) => {
    try {
        if (!req.body.movieName) {
            return res.status(400).json(
                {
                    error: true,
                    msg: "El campo nombre es requerido. Por favor, ingrese el nombre de la película",
                }
            );
        }
        if (!req.body.year) {
            return res.status(400).json(
                {
                    error: true,
                    msg: "El campo anio es requerido. Por favor, ingrese el anio de la pelicula",
                }
            );
        }        
        if (!req.body.director) {
            return res.status(400).json(
                {
                    error: true,
                    msg: "El campo director es requerido. Por favor, ingrese el director de la pelicula",
                }
            );
        }
        if (!validaciones.isValidId(req.body.director)) {
            return res.status(400).json({
                data: `El valor ${req.body.director} no es un ID válido de MongoDB para un director`,
                error: true,
              });
        }
        if (!req.body.movieGenre) {
            return res.status(400).json(
                {
                    error: true,
                    msg: "El campo genero es requerido. Por favor, ingrese el genero de la pelicula",
                }
            );
        }

        //esto hay q arreglar para q valide los campos del array
        const movieCast = req.body.cast;       
        if (!validaciones.existInActors(movieCast)) {
            //console.log("existInActors = "+movieCast)
            if (!Array.isArray(movieCast) || movieCast.lenght === 0) {
                //console.log("existInActors  2 = "+movieCast)
                return res.status(400).json(
                    {
                        error: true,
                        msg: "El campo cast es requerido. Por favor, ingrese el cast de la pelicula",
                    }
                );
            } else {
                //console.log("else");
                let actors = validaciones.actorsNotExist(movieCast);
                return res.status(400).json(
                    {
                        error: true,
                        msg: `Los siguientes Id de actores no existen en la coleccion actores: ${actors}`,
                    }
                );                
            }
        }
        

        const movie = new models.Movies(req.body);
        await movie.save();
        return res.status(200).json(
            {
                data: movie,
                error: false,
            }
        );
    } catch (error) {
        return res.status(500).json(
            {
                msg: "===> "+error,
                error: true,
            }
        );
    }
};

const updateMovie = async (req, res) => {
    try {
        const movieId = req.params.id;

        if (!validaciones.isValidId(movieId)) {
            return res.status(400).json({
                data: `El valor ${movieId} no es un ID válido de MongoDB`,
                error: true,
              });
        }
    
        const movie = await models.Movies.findByIdAndUpdate(
            movieId,
            req.body,
            // el new: true, retorna el objeto ya actualizado, y no el objeto antes de actualizar
            { new: true }
        );
    
        if (movie) {
            return res.status(200).json(
                {
                    error: false,
                    data: movie,
                }
            );
        } else {
            return res.status(404).json(
                {
                    error: true,
                    msg: "La película no existe",
                }
            );
        }
    } catch (error) {
        return res.status(500).json(
            {
                error: true,
                msg: error,
            }
        );
    }
};

const deleteMovie = async (req, res) => {
    try {
        const movieId = req.params.id;

        if (!validaciones.isValidId(movieId)) {
            return res.status(400).json({
                data: `El valor ${movieId} no es un ID válido de MongoDB`,
                error: true,
              });
        }
    
        const response = await models.Movies.findByIdAndRemove(movieId);
    
        if (response) {
            return res.status(200).json(
                {
                    error: false,
                    data: response,
                    msg: `La película con id ${movieId} fue eliminada exitosamente`,
                }
            );
        } else {
            return res.status(404).json(
                {
                    error: true,
                    msg: "La película no existe",
                }
            );
        }
    } catch (error) {
        return res.status(500).json(
            {
                error: true,
                msg: error,
            }
        );
    }
};

module.exports = {
    getMovies,
    getMovieById,
    addMovie,
    updateMovie,
    deleteMovie,
};