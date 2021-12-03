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

const deleteActors = () => console.log("delete actors");

module.exports = {
    getActors,
    deleteActors,
};