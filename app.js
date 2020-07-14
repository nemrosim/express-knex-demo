var express = require('express');
var app = express();
var knex = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        port: '32768',
        user: 'admin',
        password: '123',
        database: 'post'
    }
});

app.get('/users', async (req, res) => {
    const result = await knex
        .select('first_name')
        .from('users')
    res.json({
        result
    });
});

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Running on PORT ${PORT}`)
});
