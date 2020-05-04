const router = require('express').Router()
const movieController = require('../controllers/movie')

router.get('/', movieController.getMovie)
router.get('/:id', movieController.getOne)
router.post('/', movieController.create)
router.patch('/:id', movieController.update)
router.delete('/:id', movieController.destroy)

module.exports = router