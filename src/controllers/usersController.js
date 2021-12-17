const models = require("../models");

const validateUser = async (req, res) => {
    try {
        
        if (!Object.keys(req.body).length) {
            return res.status(200).json(
                {
                    msg: "Ingrese usuario y contraseña",                    
                    error: true,                    
                }
            );
        }

        if (!req.body.userName) {
            return res.status(200).json(
                {
                    msg: "Ingrese usuario",                    
                    error: true,                    
                }
            );
        }

        if (!req.body.password) {
            return res.status(200).json(
                {
                    msg: "Ingrese contraseña",                    
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
                        msg: `Usuario ${user} logueado!!!`,                    
                        error: false,                    
                    }
                );
            } else {
                return res.status(200).json(
                    {
                        msg: 'Contraseña incorrecta',                    
                        error: true,                    
                    }
                );
            }
        } else {
            return res.status(200).json(
                {
                    msg: `El usuario (${user}) no existe`,                    
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