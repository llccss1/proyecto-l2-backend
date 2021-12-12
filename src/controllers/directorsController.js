const models = require("../models");
const validaciones = require("./validaciones");

const getDirectors = async (req, res) => {
    try {
        const response = await models.Directors.find();

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
                    msg: error,
                },
                error: true,
            }
        ); 
    }
};

const getDirectorById = async (req, res) => {
    try {
        const directorId = req.params.id;
        
        //verifico que sea un ObjectId valido
        if (!validaciones.isValidId(directorId)) {            
            return res.status(400).json({
                data: {
                    status: '400',
                    msg: `El valor ${directorId} no es un ID válido de MongoDB`,
                },                
                error: true,
              });
        }

        const response = await models.Directors.findById(directorId);       

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
                        msg: `El Director con Id ${req.params.id} no existe`,
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

const addDirector = async (req, res) => {
    try {

        //validar que el body este cargado
        if (!req.body) {
            return res.status(400).json(
                {
                    data: {
                        status: '400',
                        msg: "El body es requerido para crear nuevo director",
                    },
                    error: true,                    
                }
            );
        }    

        if (!req.body.name) {
            return res.status(400).json(
                {
                    data: {
                        status: '400',
                        msg: "El campo nombre es requerido. Por favor, ingrese el nombre del Director",
                    },
                    error: true,                    
                }
            );
        }
        if (!req.body.lastname) {
            return res.status(400).json(
                {
                    data: {
                        status: '400',
                        msg: "El campo apellido es requerido. Por favor, ingrese el apellido del director",
                    },
                    error: true,                    
                }
            );
        }
        if (!req.body.description) {
            return res.status(400).json(
                {
                    data: {
                        status: '400',
                        msg: "El campo descripcion es requerido. Por favor, ingrese una descripcion del director",
                    },
                    error: true,                    
                }
            );
        }

        const director = new models.Directors(req.body);
        await director.save();
        return res.status(200).json(
            {
                data: director,
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

const updateDirector = async (req, res) => {
    try {
        const directorId = req.params.id;

        //verifico que sea un ObjectId valido
        if (!validaciones.isValidId(directorId)) {            
            return res.status(400).json({
                data: {
                    status: '400',
                    msg: `El valor ${directorId} no es un ID válido de MongoDB`,
                },                
                error: true,
              });
        }

        //validar que el body este cargado
        if (!req.body) {
            return res.status(400).json(
                {
                    data: {
                        status: '400',
                        msg: "El body es requerido para modificar director",
                    }, 
                    error: true,                    
                }
            );
        }    
    
        const director = await models.Directors.findByIdAndUpdate(
            directorId,
            req.body,
            // el new: true, retorna el objeto ya actualizado, y no el objeto antes de actualizar
            { new: true }
        );
    
        if (director) {
            return res.status(200).json(
                {
                    data: director,
                    error: false,                    
                }
            );
        } else {
            return res.status(404).json(
                {
                    data: {
                        status: '404',
                        msg: "El director no existe",
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

const deleteDirector = async (req, res) => {
    try {
        const directorId = req.params.id;

        //verifico que sea un ObjectId valido
        if (!validaciones.isValidId(directorId)) {            
            return res.status(400).json({
                data: {
                    status: '400',
                    msg: `El valor ${directorId} no es un ID válido de MongoDB`,
                },                
                error: true,
              });
        }
    
        const response = await models.Directors.findByIdAndRemove(directorId);
    
        if (response) {
            return res.status(200).json(
                {
                    data: response,
                    error: false,                    
                    //msg: `El director con id ${directorId} fue eliminada exitosamente`,
                }
            );
        } else {
            return res.status(404).json(
                {
                    data: {
                        status: '404',
                        msg: "El director no existe",
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

const getMoviesFromDirector = async (req, res) => {
    const directorId = req.params.id;
        
    //verifico que sea un ObjectId valido
    if (!validaciones.isValidId(directorId)) {            
        return res.status(400).json({
            data: {
                status: '404',
                msg: `El valor ${directorId} no es un ID válido de MongoDB`,
            },            
            error: true,
            });
    }

    const response = await models.Directors.findById(directorId);
    if (!response) {
        return res.status(404).json(
            {
                data: {
                    status: '404',
                    msg: "El director no existe",
                },
                error: true,                
            }
        );
    }

    //buscar peliculas donde este el id del actor
    const movies = await models.Movies.find();

    if (movies.length === 0) {
        return res.status(404).json(
            {
                data: {
                    status: '404',
                    msg: "No hay peliculas cargadas en la base de datos",
                },
                error: true,                
            }
        );
    }

    let moviesFromDirector = [];
    movies.forEach(movie => {        
        if (movie.director == directorId) moviesFromDirector.push(movie);          
    });

    if (moviesFromDirector.length === 0) {
        return res.status(404).json(
            {
                data: {
                    status: '404',
                    msg: "No hay peliculas para este director",
                },
                error: true,                
            }
        );
    } else {
        return res.status(200).json(
            {
                data: moviesFromDirector,
                error: false,                
            }
        );
    }
};


module.exports = {
    getDirectors,
    getDirectorById,
    addDirector,
    updateDirector,
    deleteDirector,
    getMoviesFromDirector,
};