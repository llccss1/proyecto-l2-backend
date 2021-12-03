const models = require("../models");

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
        const response = await models.Actors.findById(actorId);

        if (response) {
        res.status(200).json(
            {
                data: response,
                error: false,
            }
        );
        } else {
            res.status(404).json(
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

const deleteActors = () => console.log("delete actors");

module.exports = {
    getActors,
    getActorById,
    deleteActors,
};