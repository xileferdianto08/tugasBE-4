const homeController = require('../controller/home.controller')
const middleware = require('../middleware/home.middleware')

module.exports = function (app) {
    //GET
    app.get(
        '/api/home',
        homeController.getAllHome
    )

    app.get(
        '/api/home/:id',
        homeController.getSpecificHome
    )

    //POST (For Admin only)
    app.post(
        '/api/home/data',
        middleware.verifyJWT,
        middleware.isAdmin,
        homeController.createHome
    )

    //PUT (For Admin only)
    app.put(
        '/api/home/data/:id',
        middleware.verifyJWT,
        middleware.isAdmin,
        homeController.updateHome
    )

    //DELETE (For Admin only)
    app.delete(
        '/api/home/:id',
        middleware.verifyJWT,
        middleware.isAdmin,
        homeController.deleteHome
    )
}
