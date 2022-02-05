const router = require('express').Router();

const { createUser, getUsernameAvailable} = require('../controllers/user')

router.route('/').post(createUser)

router.route("/:username").get(getUsernameAvailable);


module.exports = router;