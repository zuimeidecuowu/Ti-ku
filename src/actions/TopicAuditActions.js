var Reflux = require('reflux');

var TopicAuditActions = Reflux.createActions([
    "initSearch",
    "statusChange",
    "typeChange",
    "searchTopic",
    "cancelTopic",
    "disApprove",
    "editTopic",
    "approve",
    "approveEdit",
    "saveTopic",
    "pagePlugChange"
]);

module.exports = TopicAuditActions;
