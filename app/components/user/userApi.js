const express = require('express');

const Router = express.Router();
const asyncMiddleware = require('../../middleware/asyncMiddleware');
const userService = require('./userService');

Router.post(
  '/oriya',
  asyncMiddleware(async (request, response) => {
    try {
      await userService.createUser(request.body.user);
    } catch (error) {
      console.log('failed to create user ');
    }
  })
);

module.exports = Router;
