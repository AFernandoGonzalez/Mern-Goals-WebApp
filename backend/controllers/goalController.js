
const asyncHandler = require('express-async-handler')

// @decs Get Goals
// @route Get /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'Get goals'})
})

// @decs set Goals
// @route Set(Creating) /api/goals
// @access Private
const setGoals = asyncHandler(async (req, res) => {
    if (!req.body.text){
        throw new Error('Please add a text field')
    }
    res.status(200).json({message: 'Set goals'})
})

// @decs Update Goals
// @route Put /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Update goals ${req.params.id}`})
})

// @decs Delete Goals
// @route Delete /api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Delete goals ${req.params.id}`})
})

// set it as a module
module.exports = {
    getGoals,
    setGoals,
    updateGoal,
    deleteGoal,
}