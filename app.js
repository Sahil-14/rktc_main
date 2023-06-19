if (process.env.NODE_ENV !== 'production')
{
  require('dotenv').config();
}

const express = require('express');
const cors = require("cors");
require('express-async-errors');
const cookieSession = require('cookie-session');
const PORT = process.env.PORT || 5500
//routes
const contactRouter = require('./src/routes/contact.routes')
const { serviceRouter } = require('./src/routes/services.routes')
const { infrastructureRouter } = require('./src/routes/infrastructure.routes')
const { mediaRouter } = require('./src/routes/media.routes')

const { errorHandler } = require('./src/middleware/errorHandler')
const db = require("./src/models");

// var moment = require('moment');
const axios = require('axios')
// const { NotFoundError } = require('./src/error')


const app = express();
var corsOptions = {
  origin: process.env.URL
};

app.use(cors(corsOptions));
db.sequelize.sync();
app.set('trust proxy', true);
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(

  cookieSession({
    signed: false,
    secure: false
  })
);

//use routes
// app.use(contactRouter);
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
    const serviceNames = await axios.get(`${process.env.URL}/api/services/names`);
    footerServices = serviceNames.data.services
    const serviceResponse = await axios.get(`${process.env.URL}/api/services/`);
    services = serviceResponse.data.services
    const infraResponse = await axios.get(`${process.env.URL}/api/infrastructure/`);
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
    const serviceNames = await axios.get(`${process.env.URL}/api/services/names`);
    footerServices = serviceNames?.data.services
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
    const serviceNames = await axios.get(`${process.env.URL}/api/services/names`);
    names = serviceNames?.data.services
    footerServices = serviceNames?.data.services
    var singleService = null;
    if (id)
    {
      const serviceData = await axios.get(`${process.env.URL}/api/service/${id}`);
      singleService = serviceData.data.service
    } else
    {
      var firstId = null;
      if (names)
      {
        firstId = names[0].service_id
      }
      const serviceData = await axios.get(`${process.env.URL}/api/service/${firstId}`);
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
    var categoryNames = await axios.get(`${process.env.URL}/api/infrastructure/names/`)
    categoryNames = categoryNames?.data.categoryName
    const serviceNames = await axios.get(`${process.env.URL}/api/services/names`);
    footerServices = serviceNames?.data.services
    console.log(categoryNames)
    if (id)
    {
      const infraData = await axios.get(`${process.env.URL}/api/infrastructure/${id}`);
      singleInfra = infraData.data.infrastructure
    } else
    {
      var firstId = null;
      if (categoryNames)
      {
        firstId = categoryNames[0].infra_id
      }

      const infraData = await axios.get(`${process.env.URL}/api/infrastructure/${firstId}`);
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

    const media = await axios.get(`${process.env.URL}/api/gallery/`);
    const categories = media?.data?.categories;
    const serviceNames = await axios.get(`${process.env.URL}/api/services/names`);
    footerServices = serviceNames?.data?.services
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
    const serviceNames = await axios.get(`${process.env.URL}/api/services/names`);

    footerServices = serviceNames?.data?.services
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
  // res.render('pages/error')
});
app.use(errorHandler);
app.listen(PORT, () => {
  console.log("server running");
})
