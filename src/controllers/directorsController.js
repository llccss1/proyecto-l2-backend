const models = require("../models");
const validaciones = require("./validaciones");

const getDirectors = async (req, res) => {
    try {
        const response = await models.Directors.find();

        response.sort(orderByName);

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
        if (!Object.keys(req.body).length) {
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
        if (!Object.keys(req.body).length) {
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
            //antes de retornar, elimino el director de las peliculas
            removeDirectorFromMovies(directorId);

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

    //buscar peliculas donde este el id del director
    const moviesFromDirector = await models.Movies.find({ director: directorId });
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
        moviesFromDirector.sort(orderByYear);
        return res.status(200).json(
            {
                data: moviesFromDirector,
                error: false,                
            }
        );
    }
};

const getFavouritesDirectors = async (req, res) => {
    try {
        const response = await models.Directors.find({
            favourite: true,
        });

        response.sort(orderByName);
        
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

const getSearchDirectors = async (req, res) => {
    try {
        const searchText = req.params.searchText.trim();
        
        if (!searchText) {
            return res.status(400).json(
                {
                    data: {
                        status: '400',
                        msg: "Ingrese una palabra a buscar"
                    },
                    error: false,
                }
            );
        }
        const response = await models.Directors.find({
             $or: [ { name: { $regex: searchText } }, { lastname: { $regex: searchText } } ]        
        });       
        
        response.sort(orderByName);
        
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

const removeDirectorFromMovies = async (directorId) => {
    try {        
        const movies = await models.Movies.updateMany({director: directorId},{ $unset: { director: "" } });        
        console.log(' removeDirectorFromMovies ', movies);        
    } catch (error) {
        console.log(' removeDirectorFromMovies error ', error);
    }    
};

const orderByName = (a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    // a must be equal to b
    return 0;
  };
const orderByYear = (a, b) => {
    if (a.yearOfRelease > b.yearOfRelease) {
      return 1;
    }
    if (a.yearOfRelease < b.yearOfRelease) {
      return -1;
    }
    // a must be equal to b
    return 0;
  };


module.exports = {
    getDirectors,
    getDirectorById,
    addDirector,
    updateDirector,
    deleteDirector,
    getMoviesFromDirector,
    getFavouritesDirectors,
    getSearchDirectors,
};