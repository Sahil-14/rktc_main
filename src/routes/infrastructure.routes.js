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
const Infrastructure = db.infrastructure;
const InfrastructureDetail = db.infrastructureDetail;
const { validateRequest } = require('../middleware/validateRequest');
const { BadRequestError, DatabaseOperationError, NotFoundError } = require('../error');
const axios = require('axios');
const infrastructureRouter = express.Router();





/*******************************
 * - 2.get all services -------*
 *******************************/
infrastructureRouter.get('/api/infrastructure/', async (req, res) => {
  try
  {
    const infrastructure = await Infrastructure.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'info']
      },
    });
    res.send({ infrastructure });
  } catch (error)
  {
    throw new DatabaseOperationError("Error to fetch services");
  }
});
infrastructureRouter.get('/api/infrastructure/names/', async (req, res) => {
  try
  {
    const categoryName = await Infrastructure.findAll({
      attributes: ['infra_id', 'name']
    })
    res.send({ categoryName });
  } catch (error)
  {
    throw new DatabaseOperationError("Error to fetch services");
  }
});

/*******************************
 * ------- 3.get service by id --------*
 *******************************/
infrastructureRouter.get('/api/infrastructure/:id', async (req, res) => {
  const id = req.params.id;
  try
  {

    const infrastructure = await Infrastructure.findOne({
      where: {
        infra_id: id
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
      include: {
        model: InfrastructureDetail,
      }
    });
    if (!infrastructure)
    {
      throw new NotFoundError();
    }
    res.send({ infrastructure })
  } catch (error)
  {
    if (error instanceof NotFoundError)
    {
      throw new NotFoundError();
    } else
    {
      throw new DatabaseOperationError("Error to fetch services");
    }
  }

})




module.exports = {
  infrastructureRouter
}