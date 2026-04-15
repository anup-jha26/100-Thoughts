const express = require('express');
const router = express.Router();
const thoughtController = require('../controllers/thoughts');

router.get('/', thoughtController.index);
router.get('/new', thoughtController.renderNewForm);
router.post('/', thoughtController.createThought);
router.get('/:id/edit', thoughtController.renderEditForm);
router.put('/:id', thoughtController.updateThought);
router.delete('/:id', thoughtController.deleteThought);

module.exports = router;