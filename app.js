if (process.env.NODE_ENV !== 'production')
{
  require('dotenv').config();
}
const express = require('express');
const cors = require("cors");
require('express-async-errors');
const PORT = process.env.PORT || 5500
const URL = process.env.URL || 'http://localhost:5500'
//routes
const { serviceRouter } = require('./src/routes/services.routes')
const { infrastructureRouter } = require('./src/routes/infrastructure.routes')
const { mediaRouter } = require('./src/routes/media.routes')

const { errorHandler } = require('./src/middleware/errorHandler')
const db = require("./src/models");
const axios = require('axios')
const app = express();
var corsOptions = {
  origin: URL
};
app.use(cors(corsOptions));
db.sequelize.sync();
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(serviceRouter);
app.use(infrastructureRouter);
app.use(mediaRouter)
app.set('view engine', 'ejs');


app.get('/', async (req, res) => {
  let services = null;
  let infras = null;
  let error = null;
  let footerServices = []
  try
  {
    const serviceNames = await axios.get(`${URL}/api/services/names`);
    footerServices = serviceNames.data.services
    const serviceResponse = await axios.get(`${URL}/api/services/`);
    services = serviceResponse.data.services
    const infraResponse = await axios.get(`${URL}/api/infrastructure/`);
    infras = infraResponse.data.infrastructure
    res.render("pages/index", {
      services,
      infras,
      footerServices,
      error,
      page: 1
    })
  } catch (error)
  {
    res.render("pages/index", {
      services,
      infras,
      footerServices,
      error: 'Error to retrieve data',
      page: 1
    })
  }

})

app.get('/aboutus', async (req, res) => {
  let footerServices = []
  try
  {
    const serviceNames = await axios.get(`${URL}/api/services/names`);
    footerServices = serviceNames.data.services
    res.render("pages/about", {
      page: 2,
      error: null,
      footerServices
    });
  } catch (error)
  {
    res.render("pages/about", {
      error: "Failed to load resource",
      footerServices,
      page: 2
    });
  }


})

app.get('/services', async (req, res) => {
  const id = req.query.id;
  let footerServices = [];
  let names = [];
  try
  {
    const serviceNames = await axios.get(`${URL}/api/services/names`);
    names = serviceNames.data.services
    footerServices = serviceNames.data.services
    var singleService = null;
    if (id)
    {
      const serviceData = await axios.get(`${URL}/api/service/${id}`);
      singleService = serviceData.data.service
    } else
    {
      var firstId = null;
      if (names)
      {
        firstId = names[0].service_id
      }
      const serviceData = await axios.get(`${URL}/api/service/${firstId}`);
      singleService = serviceData.data.service
    }

    res.render('./pages/services', {
      title: "Services",
      page: 3,
      names,
      serviceInfo: singleService,
      footerServices,
      error: null
    });
  } catch (error)
  {
    res.render('./pages/services', {
      title: "Services",
      page: 3,
      names,
      serviceInfo: null,
      footerServices,
      error: "Error to load services"
    });
  }

})
app.get('/infrastructure/:mode', async (req, res) => {
  var mode = req.params.mode;
  var id = req.query.categoryid
  var singleInfra = null;
  let footerServices = [];
  try
  {
    var categoryNames = await axios.get(`${URL}/api/infrastructure/names/`)
    categoryNames = categoryNames.data.categoryName
    const serviceNames = await axios.get(`${URL}/api/services/names`);
    footerServices = serviceNames.data.services
    console.log(categoryNames)
    if (id)
    {
      const infraData = await axios.get(`${URL}/api/infrastructure/${id}`);
      singleInfra = infraData.data.infrastructure
    } else
    {
      var firstId = null;
      if (categoryNames)
      {
        firstId = categoryNames[0].infra_id
      }

      const infraData = await axios.get(`${URL}/api/infrastructure/${firstId}`);
      singleInfra = infraData.data.infrastructure
    }

    res.render('./pages/Infrastructure', {
      mode,
      page: 4,
      error: null,
      categoryNames,
      singleInfra,
      footerServices
    });
  } catch (error)
  {
    console.log(error)
    res.render('./pages/Infrastructure', {
      mode,
      page: 4,
      error: 'Error to fetch resource',
      categoryNames: null,
      singleInfra: null,
      footerServices
    });
  }

})

app.get('/media', async (req, res) => {
  let footerServices = [];
  try
  {

    const media = await axios.get(`${URL}/api/gallery/`);
    const categories = media.data.categories;
    const serviceNames = await axios.get(`${URL}/api/services/names`);
    footerServices = serviceNames.data.services
    const images = media.data.images
    res.render('./pages/media', {
      page: 5,
      error: null,
      categories,
      images,
      footerServices
    })
  } catch (error)
  {
    res.render('./pages/media', {
      page: 5,
      error: 'Error to fetch resources.',
      categories: null,
      images: null,
      footerServices
    })
  }

})

app.get('/contact-us', async function (req, res) {
  let footerServices = []
  try
  {
    const serviceNames = await axios.get(`${URL}/api/services/names`);

    footerServices = serviceNames.data.services
    res.render('./pages/contact-us', {
      page: 6,
      footerServices
    });
  } catch (error)
  {
    res.render('./pages/contact-us', {
      page: 6,
      footerServices
    });
  }

});

app.all('*', async (req, res) => {
  res.redirect('/');
});
// app.use(errorHandler);
app.listen(PORT, () => {
  console.log("server running");
})
// https://www.kalkifashion.com/in/golden-yellow-silk-patola-printed-bandi-with-kurta-set.html
// https://www.kalkifashion.com/in/black-festive-textured-bandi-jacket-set-in-art-silk-with-thread-embroidery-and-front-zip.html