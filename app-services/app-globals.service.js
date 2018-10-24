'use strict';

angular.module('app')

.constant('AppGlobalConstants', (function() {

    var base = "http://ec2-18-191-31-160.us-east-2.compute.amazonaws.com:8888";

    var questionnaire = [
        {
            "questionNumber": 1,
            "text": "I don't feel particularly pleased with the way I am."
        },
        {
            "questionNumber": 2,
            "text": "I am intensely interested in other people."
        },
        {
            "questionNumber": 3,
            "text": "I feel that life is very rewarding."
        },
        {
            "questionNumber": 4,
            "text": "I have very warm feelings towards almost everyone."
        },
        {
            "questionNumber": 5,
            "text": "I rarely wake up feeling rested."
        },
        {
            "questionNumber": 6,
            "text": "I am not particularly optimistic about the future."
        },
        {
            "questionNumber": 7,
            "text": "I find most things amusing."
        },
        {
            "questionNumber": 8,
            "text": "I am always committed and involved."
        },
        {
            "questionNumber": 9,
            "text": "Life is good."
        },
        {
            "questionNumber": 10,
            "text": "I do not think that the world is a good place."
        },
        {
            "questionNumber": 11,
            "text": "I laugh a lot."
        },
        {
            "questionNumber": 12,
            "text": "I am well satisfied about everything in my life."
        },
        {
            "questionNumber": 13,
            "text": "I don't think I look attractive."
        },
        {
            "questionNumber": 14,
            "text": "There is a gap between what I would like to do and what I have done."
        },
        {
            "questionNumber": 15,
            "text": "I am very happy."
        },
        {
            "questionNumber": 16,
            "text": "I find beauty in some things."
        },
        {
            "questionNumber": 17,
            "text": "I always have a cheerful effect on others."
        },
        {
            "questionNumber": 18,
            "text": "I can fit in (find time for) everything I want to."
        },
        {
            "questionNumber": 19,
            "text": "I feel that I am not especially in control of my life."
        },
        {
            "questionNumber": 20,
            "text": "I feel able to take anything on."
        },
        {
            "questionNumber": 21,
            "text": "I feel fully mentally alert."
        },
        {
            "questionNumber": 22,
            "text": "I often experience joy and elation."
        },
        {
            "questionNumber": 23,
            "text": "I don't find it easy to make decisions."
        },
        {
            "questionNumber": 24,
            "text": "I don't have a particular sense of meaning and purpose in my life."
        },
        {
            "questionNumber": 25,
            "text": "I feel I have a great deal of energy."
        },
        {
            "questionNumber": 26,
            "text": "I usually have a good influence on events."
        },
        {
            "questionNumber": 27,
            "text": "I don't have fun with other people."
        },
        {
            "questionNumber": 28,
            "text": "I don't feel particularly healthy."
        },
        {
            "questionNumber": 29,
            "text": "I don't have particularly happy memories of the past."
        }
    ];

    var userData = {};
    return {
        baseURL: base,
        questionnaire: questionnaire,
        userData: userData
    };

})())
