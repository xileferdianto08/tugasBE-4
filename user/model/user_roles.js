const { Model } = require('objection');
const knex = require('../../config/knex')

Model.knex(knex)

class User_roles extends Model{
    static get tableName(){
        return 'user_roles';
    }
}

module.exports = User_roles;