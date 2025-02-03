const validateUserAuth = (req,res,next)=>{
    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            success: false,
            data: {},
            message: 'something went wrong',
            err: 'Email or password missing in the request'
        })
    }

    next();
}

const validateisAdminUser = (req,res,next)=>{
    if(!req.body.userId){
        return res.status(400).json({
            success: false,
            data: {},
            message: 'something went wrong',
            err: 'user id is  missing in the request'
        })
    }

    next();
}

module.exports = {
    validateUserAuth,
    validateisAdminUser
}