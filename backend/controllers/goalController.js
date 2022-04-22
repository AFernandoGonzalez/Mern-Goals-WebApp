
const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModal')

// @decs Get Goals
// @route Get /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find()

    res.status(200).json(goals)
})

// @decs set Goals
// @route Set(Creating) /api/goals
// @access Private
const setGoals = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        throw new Error('Please add a text field')
    }

    const goal = await Goal.create({
        text: req.body.text
    })
    res.status(200).json(goal)
})

// @decs Update Goals
// @route Put /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        req.status(400)
        throw new Error('Goal not found')
    }
    // updated
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true, })

    res.status(200).json(updatedGoal)
})

// @decs Delete Goals
// @route Delete /api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal){
        req.status(400)
        throw new Error('Goal not found')
    }
    // remove
    // const removeGoal = await Goal.findByIdAndRemove(req.params.id)
    await Goal.remove()
    res.status(200).json({id: req.params.id})
})

// set it as a module
module.exports = {
    getGoals,
    setGoals,
    updateGoal,
    deleteGoal,
}