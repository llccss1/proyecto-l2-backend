const models = require("../models");
const mongoose = require("mongoose");
const objectIdValidator = mongoose.Types.ObjectId;

//verifico que sea un ObjectId valido
const isValidId = (id) => {    
    return objectIdValidator.isValid(id);
}

//verifica si es un director valido cargado den la DB
const existIdInCollection = async (id, model) => {
    let response;
    switch (model) {
        case 'ACTOR':
            response = await models.Actors.findById(id);
            break;
        case 'DIRECTOR':
            response = await models.Directors.findById(id);
            break;
        case 'MOVIE':
            response = await models.Directors.findById(id);
            break;
        default:
            response = false;
            break;     
    }
    return (response) ? true : false;
}

//Verifica que la coleccion no este vacia, y que cada elemento sea un ObjectId valido que pertenece a la coleccion de actores
const existInActors = (actorId) => {    
    if (!Array.isArray(actorId) || actorId.length === 0) return false;

    actorId.forEach(element => {        
        if (!isValidId(element)) return false;
        if (!existIdInCollection(element, 'ACTOR')) return false;
    });

    return true;
}

const actorsNotExist = async (actorId) => {
    let actors = [];
    actorId.forEach(element => {
        if (!existIdInCollection(element, 'ACTOR') || !isValidId(element)) {
            actors.push(element);
        }
    });
    return actors;
}


module.exports = {
    isValidId,
    existIdInCollection,
    existInActors,
    actorsNotExist,
};