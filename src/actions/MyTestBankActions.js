var Reflux = require('reflux');

var MyTestBankActions = Reflux.createActions([
    "initSearch",
    "statusChange",
    "questionTypeChange",
    "searchTopic",
    "cancelTopic",
    "saveTopic",
    "pagePlugChange"
]);

module.exports = MyTestBankActions;