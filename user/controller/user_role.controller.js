const userRolesDb = require('../model/user_roles')

//UR = user_roles

//GET
exports.getAllUR = async(req, res)=>{
    const data = await userRolesDb.query()
    return res.status(200).send(data)
}

exports.getSpecificUR = async(req, res) =>{
    const {nim} = req.params
    const data = await userRolesDb.query().where({
        nim: nim
    })

    return res.status(200).send(data)
}

//POST
exports.createUR = async(req, res)=>{
    const {nim, role_id} = req.body
    await userRolesDb.query()
    .insert({
        nim: nim,
        role_id: role_id
    })

    return res.status(200).send({
        message: "Data berhasil ditambahkan"
    })
}


//PUT
exports.updateUR = async(req, res)=>{
    const params = req.params.nim
    const {role_id} = req.body

    await userRolesDb.query()
    .update({
        role_id: role_id
    })
    .where({
        nim: params
    })

    return res.status(200).send({
        message: "Data berhasil diubah"
    })
}


//DELETE
exports.deleteUR = async(req, res)=>{
    const {nim} = req.params
    await userRolesDb.query().delete()
    .where({
        nim: nim
    })

    return res.status(200).send({
        message: "Data berhasil dihapus."
    })
}