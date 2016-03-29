var Reflux = require('reflux');

var TextBookActions = Reflux.createActions([
    "addChapter",
    "addSection",
    'addSectionName',
    "specialTypeChange",
    "removeSection",
    'addKnowledge',
    'updateTextbook',
    'updateKnowledge',
    'removeKnowledge',
    'showKnowledge',
    'changeStates',
    'deleteTextBook',
    'saveTextBook',
    'updateTextBookData'
]);

module.exports = TextBookActions;