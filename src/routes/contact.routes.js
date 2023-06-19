const express = require('express');
const { body } = require('express-validator');

const { BadRequestError, DatabaseOperationError, NotFoundError } = require('../error');
const contactRouter = express.Router();


contactRouter.get('/contact-us', function (req, res) {

  res.render('./pages/contact-us', {

    page: 6

  });

});

module.exports = contactRouter;