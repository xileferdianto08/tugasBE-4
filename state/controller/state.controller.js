const stateDB = require('../model/state.model')

exports.getAllState = async(req,res)=>{
    try {
        const data = await stateDB.query()
        return res.status(200).send(data)
    } catch (err) {
        return res.status(500).send({
            message: err.message
        })
    }
}

exports.getSpecificState = async(req,res)=>{
    const {id} = req.params

    try {
        const data = await stateDB.query().where({
            id: id
        })
    } catch (err) {
        return res.status(500).send({
            message: err.message
        })
    }
}


exports.createState = async(req,res)=>{
    const {name, quota} = req.body

    try {
        await stateDB.query().insert({
            name:name,
            quota: parseInt(quota)
        })

        return res.status(200).send({
            message: "Data baru STATE berhasil ditambahkan"
        })
    } catch (err) {
        return res.status(500).send({
            message: err.message
        })
    }
}

exports.updateState = async(req,res)=>{
    const param = req.params.id
    const {name, quota} = req.body

    try {
        await stateDB.query()
        .update({
            name: name,
            quota: parseInt(quota)
        }).where({
            id: param
        })        
        
        return res.status(200).send({
            message: "Data STATE berhasil diperbaharui!"
        })
    } catch (err) {
        return res.status(500).send({
            message: err.message
        })
    }
}

exports.deleteState = async(req,res)=>{
    const {id} = req.params

    try {
        await stateDB.query().delete()
        .where({
            id:id
        })
                
        return res.status(200).send({
            message: "Data STATE berhasil dihapus!"
        })
    } catch (err) {
        return res.status(500).send({
            message: err.message
        })
    }
}