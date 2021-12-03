const models = require("../models");

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
                msg: error,
                error: true,
            }
        ); 
    }
};

const deleteMovies = () => console.log("delete movies");

module.exports = {
    getMovies,
    deleteMovies,
};