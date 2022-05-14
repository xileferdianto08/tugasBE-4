const rolesDb = require('../model/roles')


//GET
exports.getAllRoles = async(req, res)=>{
    const data = await rolesDb.query()
    return res.status(200).send(data)
}

exports.getSpecificRoles = async(req, res) =>{
    const {id} = req.params
    const data = await rolesDb.query().where({
        role_id: id
    })

    return res.status(200).send(data)
}

//POST
exports.createRoles = async(req, res)=>{
    const {role_id, role_name} = req.body
    await rolesDb.query()
    .insert({
        role_id: role_id,
        role_name: role_name
    })

    return res.status(200).send({
        message: "Data berhasil ditambahkan"
    })
}


//PUT
exports.updateRoles = async(req, res)=>{
    const params = req.params.id
    const {role_name} = req.body

    await rolesDb.query()
    .update({
        role_name: role_name
    })
    .where({
        role_id: params
    })

    return res.status(200).send({
        message: "Data berhasil diubah"
    })
}


//DELETE
exports.deleteRoles = async(req, res)=>{
    const {id} = req.params
    await rolesDb.query().delete()
    .where({
        role_id: id
    })

    return res.status(200).send({
        message: "Data berhasil dihapus."
    })
}