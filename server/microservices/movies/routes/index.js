const router = require('express').Router()
const MovieController = require('../controllers/movie')

router.get('/movies', MovieController.find)
router.get('/movies/:id', MovieController.findById)
router.post('/movies', MovieController.create)
router.delete('/movies/:id', MovieController.remove)
router.put('/movies/:id', MovieController.update)

module.exports = router