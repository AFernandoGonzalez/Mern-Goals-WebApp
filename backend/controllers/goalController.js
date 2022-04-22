
const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModal')
const User = require('../models/userModel')

// @decs Get Goals
// @route Get /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
    // find specific user goals
    const goals = await Goal.find({ user: req.user.id })

    res.status(200).json(goals)

    console.log(res.status(200).json(goals));
})

// @decs set Goals
// @route Set(Creating) /api/goals
// @access Private
const setGoals = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        throw new Error('Please add a text field')
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
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

    // find the user
    const user = await User.findById(req.user.id)

    // check for user
    if (!user) {
        // 
        req.status(401)
        throw new Error('User not found')
    }

    // make sure the login macthes the goal user
    if (goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
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
    // console.log(`Goal: ${goal}`);

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    // find the user
    const user = await User.findById(req.user.id)
    // console.log(`User: ${user}`);

    // check for user
    if (!user) {
        // 
        res.status(401)
        throw new Error('User not found')
    }

    // make sure the login macthes the goal user
    if (goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
    console.log(`DELETE GOAL:  ${goal.user.toString()}`);

    // remove
    // const removeGoal = await Goal.findByIdAndRemove(req.params.id)
    await Goal.remove()
    res.status(200).json({ id: req.params.id })
})

// set it as a module
module.exports = {
    getGoals,
    setGoals,
    updateGoal,
    deleteGoal,
}