var express = require('express');
var app = express();
var knex = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        port: '32772',
        user: 'admin',
        password: 'admin',
        database: 'demo'
    }
});

app.get('/users/:isRaw', async (req, res) => {
    console.log("req params", req.params)
    const users = await knex
        .select('first_name')
        .from('users')
    res.json({users: users.rows});
});

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Running on PORT ${PORT}`)
});
