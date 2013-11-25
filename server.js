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
        filename = "./dataStore.json",
        async = require('async'),
        hbs = require('express-hbs'),
        baucis = require('baucis'),
        socketIO = require('socket.io'),
        mongoose = require('mongoose'),
        db;



    // start mongoose
    mongoose.connect('mongodb://localhost/sit');
    db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function callback () {
        var examSchema,
            questionSchema,
            optionsSchema,
            Exam,
            Question;
        //schemas
        examSchema = mongoose.Schema({
            title: String,
            description: String
        });

        questionSchema = mongoose.Schema({
            questionText: String,
            examId: String
        });

        examSchema.methods.toJSON = function () {
            var o = this.toObject();

            o.id = o._id;
            delete o._id;

            return o;
        };
        questionSchema.methods.toJSON = examSchema.methods.toJSON;

        //models
        Exam = mongoose.model('Exam', examSchema);
        Question = mongoose.model('Question', questionSchema);


        //API
        app.post('/api/exams', function (req, res) {
            var exam = new Exam(req.body);
            //TODO: add backend validation here
            exam.save(function (err, exam) {
                if (err) { res.json(500, err); return; }

                res.json(exam);
            });
        });

        app.put('/api/exams/:id', function (req, res) {
            Exam.update({_id: req.params.id}, req.body, {upsert: true}, function (err, exam) {
                if (err) { res.json(500, err); return; }

                res.json(req.body);
            });
        });

        app.del('/api/exams/:id', function (req, res) {
            Exam.remove({_id: req.params.id}, function (err, exam) {
                if (err) { res.json(500, err); return; }

                res.json({});
            });
        });

        app.get('/api/exams', function (req, res) {
            Exam.find({}, function (err, exams) {
                if (err) { res.json(500, err); return; }

                res.json(exams);
            });
        });

        //http://localhost:8188/api/exams/1/questions
        app.get('/api/exams/:examId/questions', function (req, res) {
            Question.find({examId: req.params.examId}, function (err, questions) {
                if (err) { res.json(500, err); return; }

                res.json(questions);
            });
        });

        app.post('/api/exams/:examId/questions', function (req, res) {
            var question = new Question({questionText: req.body.questionText, examId: req.params.examId});

            question.save(function (err, q) {
                if (err) { res.json(500, err); return; }

                res.json(q);
            });
        });

        app.put('/api/exams/:examId/questions/:id', function (req, res) {
            var examId = req.params.examId,
                id = req.params.id;

            Question.update({_id: id}, req.body, {upset: true}, function (err, question) {
                if (err) { res.json(500, err); return; }

                res.json(req.body);
            });
        });

        app.del('/api/exams/:examId/questions/:id', function (req, res) {
            Question.remove({_id: req.params.id}, function (err) {
                if (err) { res.json(500, err); return; }

                res.json({});
            });
        });

        app.listen(port, host, function () {
            console.log('Server running on: ' + host + ':' + port);
        });

    });

}());