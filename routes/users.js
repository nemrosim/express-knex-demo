const express = require('express');
const knex = require('../config/knex')
const usersRouter = express.Router();

usersRouter.route('/users')
    .get(async (request, response) => {
        const users = await knex
            .select('first_name')
            .from('users')
        response.json({users});
    });

module.exports = usersRouter;
