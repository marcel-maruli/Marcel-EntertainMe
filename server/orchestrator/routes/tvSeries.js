const router = require('express').Router()
const tvSeriesController = require('../controllers/tvSeries')

router.get('/', tvSeriesController.getTvSeries)
router.get('/:id', tvSeriesController.getOne)
router.post('/', tvSeriesController.create)
router.patch('/:id', tvSeriesController.update)
router.delete('/:id', tvSeriesController.destroy)

module.exports = router