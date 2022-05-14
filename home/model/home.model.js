const { Model } = require('objection');
const knex = require('../../config/knex')

Model.knex(knex)

class Home extends Model{
    static get tableName(){
        return 'homes';
    }
}

module.exports = Home;