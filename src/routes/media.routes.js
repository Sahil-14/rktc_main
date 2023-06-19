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
const Gallery = db.gallery;

const { validateRequest } = require('../middleware/validateRequest');
const { BadRequestError, DatabaseOperationError, NotFoundError } = require('../error');
const axios = require('axios');
const mediaRouter = express.Router();





/*******************************
 * - 2.get all images -------*
 *******************************/
mediaRouter.get('/api/gallery/', async (req, res) => {
  try
  {
    const images = await Gallery.findAll({});
    const categories = [...new Set(images.map(image => image.category))];
    res.send({ categories, images });
  } catch (error)
  {
    throw new DatabaseOperationError("Error to fetch services");
  }
});

/*******************************
 * ------- 3.get images by id --------*
 *******************************/
// mediaRouter.get('/api/service/:id', async (req, res) => {
//   const id = req.params.id;
//   try
//   {

//     const service = await Service.findOne({
//       where: {
//         service_id: id
//       },
//       attributes: {
//         exclude: ['createdAt', 'updatedAt']
//       },
//       include: {
//         model: Hightlights,
//         attributes: ['name']
//       }
//     });
//     res.send({ service })
//   } catch (error)
//   {
//     console.log(error);
//     throw new DatabaseOperationError("Error to fetch services");
//   }

// })




module.exports = {
  mediaRouter
}