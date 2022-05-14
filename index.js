require('dotenv/config')
const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

require('./role/routes/role.routes')(app)
require('./user/routes/user.routes')(app)
require('./user/routes/user_role.routes')(app)
require('./auth/routes/auth.routes')(app)
require('./home/routes/home.routes')(app)
require('./state/routes/state.routes')(app)

const PORT = process.env.PORT || 8080
app.listen(PORT, () =>{
    console.log(`Listening to the server ${PORT}`)
})