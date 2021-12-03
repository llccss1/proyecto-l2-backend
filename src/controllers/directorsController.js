const models = require("../models");

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
                msg: error,
                error: true,
            }
        ); 
    }
};

const deleteDirectors = () => console.log("delete directors");

module.exports = {
    getDirectors,
    deleteDirectors,
};