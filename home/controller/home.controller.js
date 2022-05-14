const homeDB = require('../model/home.model')

exports.getAllHome = async(req,res)=>{
    try {
        const data = await homeDB.query()
        return res.status(200).send(data)
    } catch (err) {
        return res.status(500).send({
            message: err.message
        })
    }
}

exports.getSpecificHome = async(req,res)=>{
    const {id} = req.params
    try {
        const data = await homeDB.query().where({
            id: id
        })
        return res.status(200).send(data)
    } catch (err) {
        return res.status(500).send({
            message: err.message
        })
    }
}


exports.createHome = async(req,res)=>{
    const {name, short_desc} = req.body
    
    try {
        await homeDB.query().insert({
            name: name,
            short_desc: short_desc
        })

        return res.status(200).send({
            message: "Data baru HoME berhasil ditambahkan"
        })
    } catch (err) {
        return res.status(500).send({
            message: err.message
        })
    }
}

exports.updateHome = async(req,res)=>{
    const param = req.params.id
    const {name, short_desc} = req.body

    try {
        await homeDB.query()
        .update({
            name: name,
            short_desc: short_desc
        }).where({
            id: param
        })

        return res.status(200).send({
            message: "Data HoME berhasil diperbaharui!"
        })
    } catch (err) {
        return res.status(500).send({
            message: err.message
        })
    }
}


exports.deleteHome = async(req,res)=>{
    const {id} = req.params

    try {
        await homeDB.query().delete()
        .where({
            id:id
        })

        return res.status(200).send({
            message: "Data HoME berhasil dihapus!"
        })
    } catch (err) {
        return res.status(500).send({
            message: err.message
        })
    }

}
