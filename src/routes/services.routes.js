/****************    Documantaion    ************
 * author - sahil shimpi
 * folder  - routes/user
 * lastupdate - 13/jan/2022
 * 
 * -------- Index  ------
 * 
 * 
 * 
 * 
 */
const express = require('express');
const { body } = require('express-validator');
const db = require('../models');
const Service = db.services;
const Hightlights = db.hightlights;
const { validateRequest } = require('../middleware/validateRequest');
const { BadRequestError, DatabaseOperationError, NotFoundError } = require('../error');
const axios = require('axios');
const serviceRouter = express.Router();





/*******************************
 * - 2.get all services -------*
 *******************************/
serviceRouter.get('/api/services/', async (req, res) => {
  try
  {
    const services = await Service.findAll({});
    res.send({ services });
  } catch (error)
  {
    throw new DatabaseOperationError("Error to fetch services");
  }
});
serviceRouter.get('/api/services/names/', async (req, res) => {
  try
  {
    const services = await Service.findAll({
      attributes: ['service_id', 'title']
    })
    res.send({ services });
  } catch (error)
  {
    throw new DatabaseOperationError("Error to fetch services");
  }
});

/*******************************
 * ------- 3.get service by id --------*
 *******************************/
serviceRouter.get('/api/service/:id', async (req, res) => {
  const id = req.params.id;
  try
  {

    const service = await Service.findOne({
      where: {
        service_id: id
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
      include: {
        model: Hightlights,
        attributes: ['name']
      }
    });
    if (!service)
    {
      throw new BadRequestError("Bad request")
    }
    res.send({ service })
  } catch (error)
  {
    if (error instanceof BadRequestError)
    {
      throw new BadRequestError("Bad request")
    } else
    {
      throw new DatabaseOperationError("Error to fetch services");
    }
  }

})




module.exports = {
  serviceRouter
}