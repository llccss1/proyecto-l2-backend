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
                data: {
                    status: '500',
                    msg: error
                },
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

                data: {
                    status: '400',
                    msg: `El valor ${movieId} no es un ID válido de MongoDB`,
                },                
                error: true,
              });
        }

        const response = await models.Movies.findById(movieId);

        //aca deberia agregar al cast los objetos actor, y en director el objeto director completo.

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
                    data: {
                        status: '404',
                        msg: `La Película con Id ${req.params.id} no existe`,
                    },
                    error: true,
                }
            );
        }
    } catch (error) {
        return res.status(500).json(
            {
                data: {
                    status: '500',
                    msg: error,
                },
                error: true,
            }
        );
    }
};

const addMovie = async (req, res) => {
    try {

        //validar que el body este cargado
        if (!req.body.data) {
            return res.status(400).json(
                {                    
                    data: {
                        status: '400',
                        msg: "El body es requerido para crear nueva pelicula",
                    },
                    error: true,
                }
            );
        } 

        if (!req.body.movieTitle) {
            return res.status(400).json(
                {
                    data: {
                        status: '400',
                        msg: "El campo nombre es requerido. Por favor, ingrese el nombre de la película",
                    },
                    error: true,                    
                }
            );
        }
        if (!req.body.yearOfRelease) {
            return res.status(400).json(
                {
                    data: {
                        status: '400',
                        msg: "El campo año es requerido. Por favor, ingrese el año de la pelicula",
                    },
                    error: true,                    
                }
            );
        } 
        /*       
        if (!req.body.director) {
            return res.status(400).json(
                {
                    data: {
                        status: '400',
                        msg: "El campo director es requerido. Por favor, ingrese el director de la pelicula",
                    },
                    error: true,                    
                }
            );
        }*/
        if (req.body.director && !validaciones.isValidId(req.body.director)) {
            return res.status(400).json({
                data: {
                    status: '400',
                    msg: `El valor ${req.body.director} no es un ID válido de MongoDB para un director`,
                },
                error: true,
              });
        }
        if (!req.body.movieGenre) {
            return res.status(400).json(
                {
                    data: {
                        status: '400',
                        msg: "El campo genero es requerido. Por favor, ingrese el genero de la pelicula",
                    },
                    error: true,                    
                }
            );
        }
        if (!req.body.sinopsis) {
            return res.status(400).json(
                {
                    data: {
                        status: '400',
                        msg: "El campo sinopsis es requerido. Por favor, ingrese una sinopsis de la pelicula",
                    },
                    error: true,                    
                }
            );
        }

        //esto hay q arreglar para q valide los campos del array
        const movieCast = req.body.cast;       
        if (movieCast.lenght!==0) {
            if (!validaciones.existInActors(movieCast)) {
                //console.log("existInActors = "+movieCast)
                if (!Array.isArray(movieCast) || movieCast.lenght === 0) {
                    //console.log("existInActors  2 = "+movieCast)
                    return res.status(400).json(
                        {
                            data: {
                                status: '400',
                                msg: "El campo cast es requerido. Por favor, ingrese el cast de la pelicula",
                            },
                            error: true,                        
                        }
                    );
                } else {
                    //console.log("else");
                    let actors = validaciones.actorsNotExist(movieCast);
                    return res.status(400).json(
                        {
                            data: {
                                status: '400',
                                msg: `Los siguientes Id de actores no existen en la coleccion actores: ${actors}`,
                            },
                            error: true,                        
                        }
                    );                
                }
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
                data: {
                    status: '500',
                    msg: error,
                },
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
                data: {
                    status: '400',
                    msg: `El valor ${movieId} no es un ID válido de MongoDB`,
                },
                error: true,
              });
        }

        //validar que el body este cargado
        if (!req.body.data) {
            return res.status(400).json(
                {
                    data: {
                        status: '400',
                        msg: "El body es requerido para actualizar peliculas",
                    },
                    error: true,
                    
                }
            );
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
                    data: movie,
                    error: false,
                }
            );
        } else {
            return res.status(404).json(
                {
                    data: {
                        status: '404',
                        msg: "La película no existe",
                    },
                    error: true,                   
                }
            );
        }
    } catch (error) {
        return res.status(500).json(
            {
                data: {
                    status: '500',
                    msg: error,
                },
                error: true,                
            }
        );
    }
};

const deleteMovie = async (req, res) => {
    try {
        const movieId = req.params.id;

        if (!validaciones.isValidId(movieId)) {
            return res.status(400).json({
                data: {
                    status: '400',
                    data: `El valor ${movieId} no es un ID válido de MongoDB`,
                },                
                error: true,
              });
        }
    
        const response = await models.Movies.findByIdAndRemove(movieId);
    
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
                    data: {
                        status: '404',
                        msg: `La película con ID ${movieId} no existe`,
                    },
                    error: true,
                    
                }
            );
        }
    } catch (error) {
        return res.status(500).json(
            {
                data: {
                    status: '500',
                    msg: error,
                },
                error: true,                
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