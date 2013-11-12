/*global require, __dirname, console, setTimeout */
(function () {
    'use strict';
    var express = require('express'),
        http = require('http'),
        path = require('path'),
        fs = require("fs"),
        app = express(),
        host = 'localhost',
        port = 8188,
        stubData,
        filename = "./dataStore.json";

    function saveData () {
        fs.writeFile( filename, JSON.stringify( stubData ), "utf8", function () {} );
    }

    function getData () {
        stubData = require(filename);
    }

    app.configure(function () {
        app.use(express.bodyParser());
        app.use(express['static'](__dirname + '/app'));
    });

    getData();

    stubData = stubData || {
        exams: {
            1: {title: 'Math Exam', id: 1},
            2: {title: 'History Exam', id: 2}
        },
        questions: {
            1: {
                1: {questionText: 'What will 2 + 2 * 2 be equal to?'},
                2: {questionText: 'What to add to 4 to get 17?'}
            },
            2: {
                3: {questionText: 'Where was Taras Shevchenko born?'},
                4: {questionText: 'When have Ukraien got its independance from USSR?'}
            }
        },
        nextExamId: 3,
        nextQuestionId: 5
    };

    app.post('/api/exams', function (req, res) {
        // res.end(JSON.stringify({success: true}));
        var exam = req.body;
        //TODO: add backend validation here
        exam.id = stubData.nextExamId++;
        stubData.exams[exam.id] = exam;
        res.json(exam);
        saveData();
    });

    app.put('/api/exams/:id', function (req, res) {
        stubData.exams[req.params.id] = req.body;
        res.json(req.body);
        saveData();
    });

    app.del('/api/exams/:id', function (req, res) {
        var exam = stubData.exams[req.params.id];

        delete stubData.exams[req.params.id];
        res.json(exam);
        saveData();
    });

    app.get('/api/exams', function (req, res) {
        var result;

        result = hashToArray(stubData.exams);

        res.json(result);
    });

    //http://localhost:8188/api/exams/1/questions
    app.get('/api/exams/:examId/questions', function (req, res) {
        var questions = stubData.questions[req.params.examId],
            result;

        result = hashToArray(questions);

        res.json(result);
    });

    app.post('/api/exams/:examId/questions', function (req, res) {
        var question = req.body,
            examId = req.params.examId;

        question.id = stubData.nextQuestionId++;
        stubData.questions[examId] = stubData.questions[examId] || {};
        stubData.questions[examId][question.id] = question;

        res.json(question);
        saveData();
    });

    app.put('/api/exams/:examId/questions/:id', function (req, res) {
        var examId = req.params.examId,
            id = req.params.id;

        stubData.questions[examId] = stubData.questions[examId] || {};
        stubData.questions[examId][id] = req.body;
        res.json(req.body);
        saveData();
    });

    function hashToArray(hash) {
        var result = [],
            key,
            valye;

        hash = hash || {};

        for (key in hash) {
            if (hash.hasOwnProperty(key)) {
                result[result.length] = hash[key];
            }
        }
        return result;
    }

    app.listen(port, host, function () {
        console.log('Server running on: ' + host + ':' + port);
    });

}());