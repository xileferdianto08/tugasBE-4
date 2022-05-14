const userDb = require('../../user/model/users')
const userRolesDb = require('../../user/model/user_roles')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.signup = async(req, res)=>{
    const {nim, name, password, role} = req.body
    

    try{
        const hashed_pass = await bcrypt.hashSync(password, 8)
        await userDb.query().insert({
            nim: nim,
            name:name,
            password: hashed_pass
        })

        await userRolesDb.query().insert({
            nim: nim,
            role_id: parseInt(role) 
        })
        return res.status(200).send({
            message: "Data berhasil didaftarkan"
        })
    }catch(err){
        return res.status(500).send({
            message: err.message
        })
    }

}

exports.signIn = async(req,res)=>{
    const {nim, password} = req.body
    const checkingNim = await userDb.query().where({nim: nim})

    try{
        if(checkingNim.length === 0){
            return res.status(400).send({
                message : 'NIM atau password salah!'
            })
        }

    const isPassValid = bcrypt.compareSync(password, checkingNim[0].password)

    if(!isPassValid){
        return res.status(400).send({
            message: 'NIM atau password salah!'
        })
    }

    const JWTtoken = jwt.sign({nim: checkingNim[0].nim}, process.env.SECRET_KEY, {
        expiresIn: 86400 //equals to 24H
    })

    return res.status(200).send({
        message: "Berhasil login",
        token: JWTtoken
    })
    }catch(err){
        return res.status(500).send({message: err.message})
    }


}