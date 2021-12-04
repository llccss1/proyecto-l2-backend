const models = require("../models");
const mongoose = require("mongoose");
const objectIdValidator = mongoose.Types.ObjectId;

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
                msg: error,
                error: true,
            }
        ); 
    }
};

const getActorById = async (req, res) => {
    try {
        const actorId = req.params.id;
        
        //verifico que sea un ObjectId valido
        const isValid = objectIdValidator.isValid(actorId);
        if (!isValid) {            
            return res.status(400).json({
                data: `El valor ${actorId} no es un ID válido de MongoDB`,
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
                    msg: `El Actor con Id ${req.params.id} no existe`,
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

const addActor = async (req, res) => {
    try {
        if (!req.body.name) {
            return res.status(400).json(
                {
                    error: true,
                    msg: "El campo nombre es requerido. Por favor, ingrese el nombre del actor",
                }
            );
        }
        if (!req.body.lastname) {
            return res.status(400).json(
                {
                    error: true,
                    msg: "El campo apellido es requerido. Por favor, ingrese el apellido del actor",
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
                msg: "===> "+error,
                error: true,
            }
        );
    }
};

const updateActor = async (req, res) => {
    try {
        const actorId = req.params.id;
    
        const actor = await models.Actors.findByIdAndUpdate(
            actorId,
            req.body,
            // el new: true, retorna el objeto ya actualizado, y no el objeto antes de actualizar
            { new: true }
        );
    
        if (actor) {
            return res.status(200).json(
                {
                    error: false,
                    data: actor,
                }
            );
        } else {
            return res.status(404).json(
                {
                    error: true,
                    msg: "El actor no existe",
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

const deleteActor = async (req, res) => {
    try {
        const actorId = req.params.id;
    
        const response = await models.Actors.findByIdAndRemove(actorId);
    
        if (response) {
            return res.status(200).json(
                {
                    error: false,
                    data: response,
                    msg: `El actor con id ${actorId} fue eliminada exitosamente`,
                }
            );
        } else {
            return res.status(404).json(
                {
                    error: true,
                    msg: "El actor no existe",
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
    getActors,
    getActorById,
    addActor,
    updateActor,
    deleteActor,
};