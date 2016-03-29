var Reflux = require('reflux');

var TopicAddActions = Reflux.createActions([
    "changeQuestionTypes",
    "changeYear",
    "changeCategroy",
    "topicChange",
    "analysisChange",
    "answerChange",
    "answerChangeCHOICE",
    "removeAnswer",
    'addAnswer',
    'changeJUDGE',
    'addSYNTHETICAL',
    'addMajorKnowledge',
    "removeMajorKnowledge",
    "addMinorKnowledge",
    "removeMinorKnowledge",
    "updateCognizeLevel",
    "updateAbilityId",
    'sourceChange',
    'difficultyChange',
    'saveTopic',
    "deleteTopic",
    "editTopic",
    "removeSYNTHETICALItem"
]);

module.exports = TopicAddActions;
