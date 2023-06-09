const express = require('express');
const router = express.Router();

const controller = require('../controllers/eventController');
const { fileUpload } = require('../middleware/fileUpload');
const { isLoggedIn, isAuthor } = require('../middleware/auth');
const { validateId } = require('../middleware/validator');

// /GET stories: send all stories to user

router.get('/', controller.index);

// /GET stories/new: send a new page to create a new story

router.get('/new', isLoggedIn, controller.new);

// /POST /stories create a new story
router.post('/', isLoggedIn, fileUpload, controller.create);

// GET /stories/:id - send details of story with id
router.get('/:id', validateId, controller.show)

// GET /stories/:id/edit - show edit form page to edit post with id
router.get('/:id/edit', validateId, isLoggedIn, isAuthor, controller.edit)

// /PUT /stories/:id - edit post with id
router.put('/:id', validateId, isLoggedIn, isAuthor, fileUpload, controller.update)


// /DELETE /stories/:id - delete post with id
router.delete('/:id', validateId, isLoggedIn, isAuthor, controller.delete)

module.exports = router;