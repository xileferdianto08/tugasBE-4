const userController = require('../controller/user.controller')
const middleware = require('../middleware/user.middleware')

module.exports = function(app){
    //GET
    app.get(
        '/api/users',
        userController.getAllUsers
    )

    app.get(
        '/api/users/:nim',
        userController.getAllUsersDetail
    )

    app.get(
        '/api/usersDetail/',
        userController.getAllUsersDetail
    )

    app.get(
        '/api/usersDetail/:nim',
        userController.getSpecificUsersDetail
    )

    //POST
    app.post(
        '/api/users',
        middleware.simpleMiddleware,//untuk urutan letak middleware itu bebas
        middleware.checkingInput,
        userController.createUsers
    )

    app.post(
        '/api/users/signup',
        middleware.checkingSignUp,
        userController.signup
    )

    app.post(
        '/api/users/signin',
        userController.signIn
    )

    //PUT
    app.put(
        '/api/users/:nim',
        userController.updateUsers
    )

    //DELETE
    app.delete(
        '/api/users/:nim',
        userController.deleteUsers
    )
}