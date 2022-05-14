const authController = require('../controller/auth.controller')
const middleware = require('../middleware/auth.middleware')


module.exports = function(app){
    //Sign Up
    app.post(
        '/api/auth/signup',
        middleware.checkingSignUp,
        authController.signup
    )

    //Sign In
    app.post(
        '/api/auth/signin',
        middleware.checkingSignIn,
        authController.signIn
    )

}