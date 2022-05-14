const jwt = require('jsonwebtoken')
const userRolesDb = require('../../user/model/user_roles')

exports.verifyJWT = async(req, res, next)=>{
    const token = req.headers['x-access-token']
    if(!token){
        return res.status(403).send({message: "Harap login terlebih dahulu!"})
    }

    await jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=>{
        if(err){
            return res.status(401).send({message: "Unauthorized!"})
        }

        req.decoded_nim = decoded.nim
        next()
    })
    
}

exports.isAdmin = async(req,res,next)=>{

    try{
        const nim = req.decoded_nim
        const data = await userRolesDb.query().where({nim: nim})

        if(data[0].role_id !== 1){
            return res.status(200).send({
                message: "Anda bukan admin!"
            })
        }

        next()
    }catch(err){
        return res.status(500).send({message: err.message})
    }


}