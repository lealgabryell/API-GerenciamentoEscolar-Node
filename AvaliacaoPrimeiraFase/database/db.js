let mongoose = require('mongoose');

const server = 'localhost:27017'; // COLOQUE O NOME DO SEU SERVIDOR DO BANCO DE DADOS
const database = 'avaliacao1';      // COLOQUE O NOME DO SEU BANCO DE DADOS

class Database {
  constructor() {
    this._connect()
  }
  
_connect() {
     mongoose.connect(`mongodb://${server}/${database}`)
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.error('Database connection error')
       })
  }
}

module.exports = new Database()

