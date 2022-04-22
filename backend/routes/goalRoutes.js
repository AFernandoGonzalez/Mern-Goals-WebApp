const express = require('express')
const router = express.Router()

// bring it from the controller
const {getGoals, setGoals, updateGoal, deleteGoal} = require('../controllers/goalController')

router.route('/').get(getGoals).post(setGoals)
router.route('/:id').delete(deleteGoal).put(updateGoal)

module.exports = router

