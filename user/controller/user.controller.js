const userDb = require('../model/users')
const userRolesDb = require('../model/user_roles')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//GET
exports.getAllUsers = async(req, res) =>{
    const data = await userDb.query()
    return res.status(200).send(data)
}

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
                message : 'NIM or password are invalid!'
            })
        }

        const isPassValid = bcrypt.compareSync(password, checkingNim[0].password)

        if(!isPassValid){
            return res.status(400).send({
                message: 'NIM or password are invalid'
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

exports.getSpecificUsers = async(req, res) =>{
    const {nim} = req.params
    try {
        const data = await userDb.query().where({
            nim: nim
        })

        return res.status(200).send(data)
    } catch (err) {
        return res.status(500).send({message: err.message})
    }
    
}

exports.getAllUsersDetail = async(req, res)=>{
    try {
        const data = await userDb.query()
        .join(
            'user_roles',
            'users.nim',
            '=',
            'user_roles.nim'
        )
        .join(
            'roles',
            'user_roles.role_id',
            '=',
            'roles.role_id'
        )
        .select(
            'users.nim as nim',
            'users.name as name',
            'users.password as password',
            'roles.role_name as role_name'
        
        )

        return res.status(200).send(data)
    } catch (err) {
        return res.status(500).send({message: err.message})
    }
    
}



exports.getSpecificUsersDetail = async(req, res)=>{
    const {nim} = req.params

    try {
        const data = await userDb.query()
        .join(
            'user_roles',
            'users.nim',
            '=',
            'user_roles.nim'
        )
        .join(
            'roles',
            'user_roles.role_id',
            '=',
            'roles.role_id'
        )
        .select(
            'users.nim as nim',
            'users.name as name',
            'users.password as password',
            'roles.role_name as role_name'
        
        ).where({
            'users.nim':nim
        })

        return res.status(200).send(data)
    } catch (err) {
        return res.status(500).send({message: err.message})
    }

}


exports.createUsers = async(req, res)=>{
    const {nim, name, password} = req.body
    const hashed_pass = await bcrypt.hashSync(password, 8)
    try {
        await userDb.query().insert({
            nim: nim,
            name: name,
            password: hashed_pass
        })

        return res.status(200).send({
            message: "Data berhasil ditambahkan"
        })
    } catch (err) {
        return res.status(500).send({message: err.message})
    }
    
}


exports.updateUsers = async(req, res)=>{
    const param = req.params.nim
    const {name, password} = req.body
    const hashed_pass = await bcrypt.hashSync(password, 8)

    try {
        await userDb.query()
        .update({
            name: name,
            password: hashed_pass
        }).where({
            nim:param
        })

        return res.status(200).send({
            message: "Data berhasil diubah."
        })
    } catch (error) {
        return res.status(200).send({
            message: "Data berhasil ditambahkan"
        })
    }

}

exports.deleteUsers = async(req, res)=>{
    const {nim} = req.params
    try {
        await userDb.query().delete()
        .where({
            nim: nim
        })

        return res.status(200).send({
            message: "Data berhasil dihapus."
        }) 
    } catch (err) {
        return res.status(500).send({message: err.message})
    }

}


