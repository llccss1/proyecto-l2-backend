const models = require("../models");
const validaciones = require("./validaciones");

const getActors = async (req, res) => {
    try {
        const response = await models.Actors.find();

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
        if (!req.body) {
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
        if (!req.body) {
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

    let moviesFromActor = [];
    movies.forEach(movie => {
        let esta = false;
        movie.cast.forEach(actor => {
            if (actor == actorId) esta = true;
        });
        if (esta) moviesFromActor.push(movie);   
    });

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
        return res.status(200).json(
            {
                data: moviesFromActor,
                error: false,                
            }
        );
    }
};

const getFavouritesActors = async (req, res) => {
    try {
        const response = await models.Actors.find({
            favourite: true,
        });
        
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

module.exports = {
    getActors,
    getActorById,
    addActor,
    updateActor,
    deleteActor,
    getMoviesFromActor, //falta testear
    getFavouritesActors,
};