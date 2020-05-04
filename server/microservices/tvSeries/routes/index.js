const router = require('express').Router()
const TvSeriesController = require('../controllers/tvSeries')

router.get('/tvSeries', TvSeriesController.find)
router.get('/tvSeries/:id', TvSeriesController.findById)
router.post('/tvSeries', TvSeriesController.create)
router.delete('/tvSeries/:id', TvSeriesController.remove)
router.put('/tvSeries/:id', TvSeriesController.update)

module.exports = router