module.exports = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        port: '32772',
        user: 'admin',
        password: 'admin',
        database: 'demo'
    }
});
