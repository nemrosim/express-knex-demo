const express = require('express');
const knex = require('../config/knex')
const usersRouter = express.Router();

usersRouter.route('/all')
    .get(async (request, response) => {
        const users = await knex('users')
        response.json({users});
    });

usersRouter.route('/orderBy/:column/:order')
    .get(async (request, response) => {
        const {column, order} = request.params;

        const users = await knex('users')
            .select('last_name', 'age')
            .orderBy(column, order)
        response.json({users});
    });

usersRouter.route('/certainFields')
    .get(async (request, response) => {
        const users = await knex('users')
            .select('first_name', 'last_name')
        response.json({users});
    });

usersRouter.route('/as')
    .get(async (request, response) => {
        const users = await knex
            .select("first_name AS name").from('users')
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

usersRouter.route('/whereAge')
    .get(async (request, response) => {
        const users = await knex('users')
            .where('age', '>', Number.parseInt(request.query.age, 10))
        response.json({users});
    });

usersRouter.route('/average-age')
    .get(async (request, response) => {
        const users = await knex('users').avg("age")
        response.json({users});
    });

usersRouter.route('/subquery-v1')
    .get(async (request, response) => {
        const users = await knex('users')
            .select("users.first_name", 'users.last_name', "users.age")
            .where('age', '>',
                knex('users').avg('age')
            )
        response.json({users});
    });

usersRouter.route('/getUserProducts')
    .get(async (request, response) => {

        const ORDERS_TABLE = 'orders';
        const ORDERS_PRODUCTS_TABLE = 'order_products';
        const PRODUCTS = 'products';
        const USERS_TABLE = 'users';

        const users = await knex(USERS_TABLE)
            .leftOuterJoin(ORDERS_TABLE,
                `${USERS_TABLE}.id`, '=', `${ORDERS_TABLE}.user_id`)
            .leftOuterJoin(
                ORDERS_PRODUCTS_TABLE,
                `${ORDERS_PRODUCTS_TABLE}.order_id`, '=', `${ORDERS_TABLE}.id`)
            .leftOuterJoin(
                PRODUCTS,
                `${PRODUCTS}.id`, '=', `${ORDERS_PRODUCTS_TABLE}.product_id`)
            .select(
                `${USERS_TABLE}.id`,
                `${USERS_TABLE}.first_name`,
                `${USERS_TABLE}.last_name`,
                `${PRODUCTS}.name AS product_name`,
            );

        // Format SQL response to user-friendly type:

        const result = [];

        users.forEach((user) => {

            // Find User with user.id in the result array
            const userIndex = result.findIndex(el => el.id === user.id);

            // If user already in the result array
            if (userIndex !== -1) {
                const resultUser = result[userIndex];
                resultUser.products.push(user.product_name);

                result[userIndex] = resultUser;
            } else {
                const {id, first_name, last_name, product_name} = user;
                result.push({
                    id,
                    first_name,
                    last_name,
                    products: product_name ? [product_name] : null
                })
            }
        })

        response.json({users: result});
    });

module.exports = usersRouter;
