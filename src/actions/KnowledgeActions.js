var Reflux = require('reflux');

var KnowledgeActions = Reflux.createActions([
    "showKnowledgeViewerModal",
    "hideKnowledgeViewerModal",
    "expandCollapseTreeNode",
    "toggleAddKnowledge",
    "saveReferExamPoint",
    "changeCurrentPoint",
    "delReferExamPoint",
    "addReferKnowledge",
    "delReferKnowledge",
    "changeDescription",
    "loadSubjectPhase", //** 加载 预览试图的 学科和学段.
    "knowledgeSelect",
    "addNewKnowledge",
    "searchKnowledge",
    "checkNameCanUse",
    "subjectChanged",
    "saveKnowledge",
    "addTestPoint",
    "enterEditing",
    "delKnowledge",
    "addExamPoint"
]);

module.exports = KnowledgeActions;