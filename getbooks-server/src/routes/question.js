const express = require('express');

const router = express.Router();

/**
 * Mongoose models are defined in the `models` directory
 */
const QuestionModel = require('../models/question.model');
const AnswerModel = require('../models/answer.model');

/**
 * Get all questions
 */
router.get('/', async (req, res) => {
    try {
        const questions = await QuestionModel.find({}).populate('answers');

        res.json(questions);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error while getting questions from database.');
    }
});

/**
 * Get question by id
 */
router.get('/:id', async (req, res) => {
    try {
        const question = await QuestionModel.findById(req.params.id);

        if (!question) {
            res.status(404).send('Question was not found.');
        } else {
            res.json(question);
        }
    } catch (error) {
        /**
         * CastErrors are thrown when the resource id (_id) is in an incorrect format. We handle this case as a regular 404.
         */
        if (error.name === 'CastError') {
            res.status(404).send('Question was not found.');
        } else {
            res.status(500).send('Error while getting question from database.');
        }
    }
});

/**
 * Create question
 */
router.post('/', async (req, res) => {
    try {
        const question = new QuestionModel({
            title: req.body.title,
            content: req.body.content
        });

        res.json(await question.save());
    } catch (error) {
        console.log(error);
        res.status(500).send('Error while creating question.');
    }
});

/**
 * Get all answers to a question
 */
router.get('/:questionId/answer', async (req, res) => {
    try {
        const answers = await AnswerModel.find({ question: req.params.questionId });

        res.json(answers);
    } catch (error) {
        if (error.name === 'CastError') {
            res.status(404).send('Question was not found.');
        } else {
            res.status(500).send('Error while getting answers from database.');
        }
    }
});

/**
 * Create answer
 */
router.post('/:questionId/answer', async (req, res) => {
    const { questionId } = req.params;

    try {
        const question = await QuestionModel.findById(questionId, '_id');

        if (!question) {
            res.status(404).send('Question was not found.');
        } else {
            const answer = new AnswerModel({ content: req.body.content });

            answer.createdAt = new Date().valueOf();
            answer.question = questionId;
            answer.votes = 0;

            res.json(await answer.save());
        }
    } catch (error) {
        if (error.name === 'CastError') {
            res.status(404).send('Question was not found.');
        } else {
            res.status(500).send('Error while getting question from database.');
        }
    }
});

/**
 * Upvote answer
 */
router.put('/:questionId/answer/:answerId/upvote', async (req, res) => {
    try {
        const answer = await AnswerModel.findById(req.params.answerId);

        if (!answer) {
            res.status(404).send('Answer was not found.');
        } else {
            answer.votes += 1;

            res.json(await answer.save());
        }
    } catch (error) {
        if (error.name === 'CastError') {
            res.status(404).send('Answer was not found.');
        } else {
            console.log(error);
            res.status(500).send('Error while upvoting answer.');
        }
    }
});

/**
 * Downvote answer
 */
router.put('/:questionId/answer/:answerId/downvote', async (req, res) => {
    try {
        const answer = await AnswerModel.findById(req.params.answerId);

        if (!answer) {
            res.status(404).send('Answer was not found.');
        } else {
            answer.votes -= 1;

            res.json(await answer.save());
        }
    } catch (error) {
        if (error.name === 'CastError') {
            res.status(404).send('Answer was not found.');
        } else {
            console.log(error);
            res.status(500).send('Error while downvoting answer.');
        }
    }
});

module.exports = router;
