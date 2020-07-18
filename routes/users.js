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
        const {age} = request.query;

        const users = await knex('users').whereIn('age', age);

        response.json({users: users});
    });

usersRouter.route('/whereBetween')
    .get(async (request, response) => {
        const {age} = request.query;

        const users = await knex('users').whereBetween('age', age);

        response.json({users: users});
    });

usersRouter.route('/joinWithProfiles')
    .get(async (request, response) => {
        const users = await knex('users')
            .join('profiles', 'users.id', '=', 'profiles.user_id')
            .select("users.first_name", 'profiles.email')
        response.json({users});
    });

usersRouter.route('/innerJoin')
    .get(async (request, response) => {
        const users = await knex('users')
            .innerJoin('profiles', 'users.id', '=', 'profiles.user_id')
            .select("users.first_name", 'profiles.email')
        response.json({users});
    });

usersRouter.route('/leftJoin')
    .get(async (request, response) => {
        const users = await knex('users')
            .leftOuterJoin('orders', 'users.id', '=', 'orders.user_id')
            .select("users.id", "users.first_name", 'users.last_name', 'orders.id AS order')
        response.json({users});
    });

module.exports = usersRouter;
