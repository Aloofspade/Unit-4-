const router = require('express').Router();

const {postUserLogin} = require('../controllers/auth')

router.route('/').post(postUserLogin)

module.exports = router;

