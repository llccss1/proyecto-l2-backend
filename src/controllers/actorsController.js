const models = require("../models");
const validaciones = require("./validaciones");

const getActors = async (req, res) => {
    try {
        const response = await models.Actors.find();

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

const getActorById = async (req, res) => {
    try {
        const actorId = req.params.id;
        
        //verifico que sea un ObjectId valido
        if (!validaciones.isValidId(actorId)) {            
            return res.status(400).json({                
                data: {
                    status: '400',
                    msg: `El valor ${actorId} no es un ID válido de MongoDB`,
                },
                error: true,
              });
        }

        const response = await models.Actors.findById(actorId);

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
                        msg: `El Actor con Id ${req.params.id} no existe`,
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

const addActor = async (req, res) => {
    try {

        //validar que el body este cargado
        if (!Object.keys(req.body).length) {
            return res.status(400).json(
                {
                    data: {
                        status: '400',
                        msg: "El body es requerido para cargar nuevo actor",
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
                        msg: "El campo nombre es requerido. Por favor, ingrese el nombre del actor",
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
                        msg: "El campo apellido es requerido. Por favor, ingrese el apellido del actor",
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
                        msg: "El campo descripcion es requerido. Por favor, ingrese una descripcion del actor",
                    },                      
                    error: true,                    
                }
            );
        }

        const actor = new models.Actors(req.body);
        await actor.save();
        return res.status(200).json(
            {
                data: actor,
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

const updateActor = async (req, res) => {
    try {
        const actorId = req.params.id;

        //verifico que sea un ObjectId valido
        if (!validaciones.isValidId(actorId)) {            
            return res.status(400).json({
                data: {
                    status: '400',
                    msg: `El valor ${actorId} no es un ID válido de MongoDB`,
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
                        msg: "El body es requerido para modificar actor",
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
                        msg: "El campo nombre es requerido. Por favor, ingrese el nombre del actor",
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
                        msg: "El campo apellido es requerido. Por favor, ingrese el apellido del actor",
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
                        msg: "El campo descripcion es requerido. Por favor, ingrese una descripcion del actor",
                    },                      
                    error: true,                    
                }
            );
        }
    
        const actor = await models.Actors.findByIdAndUpdate(
            actorId,
            req.body,
            // el new: true, retorna el objeto ya actualizado, y no el objeto antes de actualizar
            { new: true }
        );
    
        if (actor) {
            return res.status(200).json(
                {
                    data: actor,
                    error: false,                    
                }
            );
        } else {
            return res.status(404).json(
                {
                    data: {
                        status: '404',
                        msg: "El actor no existe",
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

const deleteActor = async (req, res) => {
    try {
        const actorId = req.params.id;

        //verifico que sea un ObjectId valido
        if (!validaciones.isValidId(actorId)) {            
            return res.status(400).json({
                data: {
                    status: '400',
                    msg: `El valor ${actorId} no es un ID válido de MongoDB`,
                },                
                error: true,
              });
        }
    
        const response = await models.Actors.findByIdAndRemove(actorId);
    
        if (response) {
            //antes de responder, quito el actor de los casts de peliculas
            
            removeActorFromMovies(actorId);

            return res.status(200).json(
                {
                    data: response,
                    error: false,                    
                    //msg: `El actor con id ${actorId} fue eliminada exitosamente`,
                }
            );
        } else {
            return res.status(404).json(
                {
                    data: {
                        status: '404',
                        msg: "El actor no existe",
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

const getMoviesFromActor = async (req, res) => {
    try {
        const actorId = req.params.id;
        //verifico que sea un ObjectId valido
        if (!validaciones.isValidId(actorId)) {            
            return res.status(400).json({
                data: {
                    status: '400',
                    msg: `El valor ${actorId} no es un ID válido de MongoDB`,
                },             
                error: true,
                });
        }

        const response = await models.Actors.findById(actorId);
        if (!response) {
            return res.status(404).json(
                {
                    data: {
                        status: '404',
                        msg: "El actor no existe",
                    },                 
                    error: true,                
                }
            );
        }
        const moviesFromActor = await models.Movies.find( { cast: actorId } );
        if (moviesFromActor.length === 0) {
            return res.status(404).json(
                {
                    data: {
                        status: '404',
                        msg: "No hay peliculas para este actor",
                    },                
                    error: true,                
                }
            );
        } else {            
            moviesFromActor.sort(orderByYear);
            return res.status(200).json(
                {
                    data: moviesFromActor,
                    error: false,                
                }
            );
        }
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

const getFavouritesActors = async (req, res) => {
    try {
        const response = await models.Actors.find({
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

const getSearchActors = async (req, res) => {
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
        const response = await models.Actors.find({
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

const removeActorFromMovies = async (actorId) => {
    try {
        //buscar peliculas donde este el id del actor        
        const movies = await models.Movies.updateMany({ $pull: { cast: actorId } });
        console.log(' removeActorFromMovies actorId ',actorId,' movies ',movies);        
    } catch (error) {
        console.log(' removeActorFromMovies error ',error);
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
    getActors,
    getActorById,
    addActor,
    updateActor,
    deleteActor,
    getMoviesFromActor, //falta testear
    getFavouritesActors,
    getSearchActors,
};