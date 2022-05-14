const stateController = require('../controller/state.controller')
const middleware = require('../middleware/state.middleware')


module.exports = function(app){
        //GET
        app.get(
            '/api/state',
            middleware.verifyJWT,
            stateController.getAllState
        )
    
        app.get(
            '/api/state/:id',
            middleware.verifyJWT,
            middleware.isUser,
            stateController.getSpecificState
        )
    
        //POST (For Admin only)
        app.post(
            '/api/state/data',
            middleware.verifyJWT,
            middleware.isAdmin,
            stateController.createState
        )
    
        //PUT (For Admin only)
        app.put(
            '/api/state/data/:id',
            middleware.verifyJWT,
            middleware.isAdmin,
            stateController.updateState
        )
    
        //DELETE (For Admin only)
        app.delete(
            '/api/state/:id',
            middleware.verifyJWT,
            middleware.isAdmin,
            stateController.deleteState
        )
}