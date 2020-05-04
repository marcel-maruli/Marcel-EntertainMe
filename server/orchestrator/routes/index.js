const router = require('express').Router()
const indexController = require('../controllers')
const movieRoute = require('./movie')
const tvSeriesRoute = require('./tvSeries')

router.get('/entertainme', indexController.entertainme)
router.use('/movies', movieRoute)
router.use('/tvSeries', tvSeriesRoute)

module.exports = router