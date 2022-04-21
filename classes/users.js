// Imports
const { randomUUID } = require('crypto');

// User Class
class User{
    constructor( socket ){
        this.id = randomUUID()
        this.socket = socket
    }
}

// Exports
module.exports = User