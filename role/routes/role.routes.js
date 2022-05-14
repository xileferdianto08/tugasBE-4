const rolesController = require('../controller/role.controller')

module.exports = function(app) {
    //GET
    app.get(
        '/api/roles',
        rolesController.getAllRoles
    )

    app.get(
        '/api/roles/:id',
        rolesController.getSpecificRoles
    )

    //POST
    app.post(
        '/api/roles',
        rolesController.createRoles
    )

    //PUT
    app.put(
        '/api/roles/:id',
        rolesController.updateRoles
    )

    //DELETE
    app.delete(
        '/api/roles/:id',
        rolesController.deleteRoles
    )
}
