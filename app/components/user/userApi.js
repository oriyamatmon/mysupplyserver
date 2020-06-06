const express = require('express');
const { logger } = require('../../util');

const Router = express.Router();
const asyncMiddleware = require('../../middleware/asyncMiddleware');
const userService = require('./userService');

Router.post(
  '/create',
  asyncMiddleware(async (request, response) => {
    try {
      const isUserCreated = await userService.createUser(request.body.user);
      if (isUserCreated.length) return response.status(500).send(isUserCreated);
      return response.status(200).send('user created!');
    } catch (error) {
      logger.debug(`failed to create user error: ${error}`);
      response.status(500).send('error');
    }
  })
);

Router.post(
  '/create',
  asyncMiddleware(async (request, response) => {
    try {
      const isUserCreated = await userService.createUser(request.body.user);
      if (isUserCreated.length) return response.status(500).send(isUserCreated);
      return response.status(200).send('user created!');
    } catch (error) {
      logger.debug(`failed to create user error: ${error}`);
      response.status(500).send('error');
    }
  })
);

module.exports = Router;
