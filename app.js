const compression = require('compression')
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const path = require('path')
const bodyParser = require('body-parser')

const authRoutes = require('./routes/auth')
const analyticsRoutes = require('./routes/analytics')
const categoryRoutes = require('./routes/category')
const materialRoutes = require('./routes/material')
const orderRoutes = require('./routes/order')
const positionRoutes = require('./routes/position')
const deliveryRoutes = require('./routes/delivery')
const fuseRoutes = require('./routes/fuse')
const coeffRoutes = require('./routes/coeff')

const keys = require('./config/keys')
const app = express()

mongoose.set('strictQuery', false)

mongoose.connect(keys.mongoURI, {})
  .then(() => console.log('MongoDB connected.'))
  .catch(error => console.log(error))



app.use(compression())

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(require('morgan')('dev'))
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(require('cors')())

app.use('/api/auth', authRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/materials', materialRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/position', positionRoutes)
app.use('/api/delivery', deliveryRoutes)
app.use('/api/fuse', fuseRoutes)
app.use('/api/coefficient', coeffRoutes)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/dist/client',
    {
      etag: true, // Just being explicit about the default.
      lastModified: true,  // Just being explicit about the default.
      setHeaders: (res, path) => {
        if (path.endsWith('.html')) {
          // All of the project's HTML files end in .html
          res.setHeader('Cache-Control', 'no-cache');
        }
      },
    }))

  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(
        __dirname, 'client', 'dist', 'client', 'index.html'
      )
    )
  })

}

module.exports = app