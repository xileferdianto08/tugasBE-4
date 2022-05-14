const userRolesController = require('../controller/user_role.controller')
const middleware = require('../middleware/user.middleware')


module.exports = function(app){
    app.use(function(req,res,next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next()
    })

    //GET
    app.get(
        '/api/user_roles',
        middleware.verifyJWT,
        middleware.isAdmin,
        userRolesController.getAllUR
    )

    app.get(
        '/api/user_roles/:nim',
        userRolesController.getSpecificUR
    )

    //POST
    app.post(
        '/api/user_roles',
        userRolesController.createUR
    )

    //PUT
    app.put(
        '/api/user_roles/:nim',
        userRolesController.updateUR
    )

    //DELETE
    app.delete(
        '/api/user_roles/:nim',
        userRolesController.deleteUR
    )
}