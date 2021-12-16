const models = require("../models");

const validateUser = async (req, res) => {
    try {
        
        if (!Object.keys(req.body).length) {
            return res.status(400).json(
                {
                    msg: "El body es requerido para validar el usuario",                    
                    error: true,                    
                }
            );
        }

        const user = req.body.userName;
        const password = req.body.password;
        
        const userFind = await models.Users.findOne({userName: user});        

        if (userFind!==null) {
            if (userFind.password === password) {
                return res.status(200).json(
                    {
                        msg: `usuario ${user} logueado!!!`,                    
                        error: false,                    
                    }
                );
            } else {
                return res.status(200).json(
                    {
                        msg: 'contraseña incorrecta',                    
                        error: true,                    
                    }
                );
            }
        } else {
            return res.status(200).json(
                {
                    msg: `el usuario ${user} no existe`,                    
                    error: true,                    
                }
            );        
        }        
    } catch (error) {
        return res.status(500).json(
            {                
                msg: '==> '+error,
                error: true,
            }
        ); 
    }
};

module.exports = {
    validateUser
};