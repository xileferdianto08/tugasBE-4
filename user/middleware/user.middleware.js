const jwt = require('jsonwebtoken')
const userRolesDb = require('../model/user_roles')

exports.simpleMiddleware = async (req, res, next)=>{ //next=buat lanjut(?)
    const data = req.body;

    console.log(data);
    next()
}


exports.checkingInput = async(req,res,next)=>{
    const data = req.body
    try{
        if(data.password === ''){
            return res.status(400).send({message: "Password masih kosong"})
        }
        next()

    }catch(err){
        return res.status(500).send({message: err.message})
    }
}


exports.checkingSignUp = async( req,res,next )=>{
    const {nim, name, password, role} = req.body

    if(nim === '' || name === '' || password === '' || role === ''){
        return res.status(400).send({
            message: "Data tidak boleh kosong!"
        })
    }
    if(role !== '1' || role !== '2'){
        return res.status(400).send({
            message: "ID role hanyalah 1 (Admin) atau 2 (User)! Pilih salah satu role yang sudah ditentukan!"
        })
    }
    next()
}

exports.verifyJWT = async(req, res, next)=>{
    const token = req.headers['x-access-token']
    if(!token){
        return res.status(403).send({
            message: "Harap login terlebih dahulu!"
        })
    }

    await jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=>{
        if(err){
            return res.status(401).send({
                message: "Unauthorized!"
            })
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