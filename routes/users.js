const express = require('express');
const knex = require('../config/knex')
const usersRouter = express.Router();

usersRouter.route('/all')
    .get(async (request, response) => {
        const users = await knex('users')
        response.json({users});
    });

usersRouter.route('/distinct')
    .get(async (request, response) => {
        const users = await knex('users')
            .distinct('first_name')
        response.json({users});
    });

usersRouter.route('/where')
    .get(async (request, response) => {
        const users = await knex('users')
            .where(request.query)
            .select('first_name', 'last_name')
        response.json({users});
    });

usersRouter.route('/whereNot')
    .get(async (request, response) => {
        const users = await knex('users')
            .whereNot(request.query)
            .select('first_name', 'last_name')
        response.json({users});
    });

usersRouter.route('/whereIn')
    .get(async (request, response) => {
        const users = await knex('users')
            .whereNot(request.query)
            .select('first_name', 'last_name')
        response.json({users});
    });

usersRouter.route('/joinWithProfiles')
    .get(async (request, response) => {
        const users = await knex('users')
            .join('profiles', 'users.id', '=', 'profiles.user_id')
            .select("users.first_name", 'profiles.email')
        response.json({users});
    });

module.exports = usersRouter;
