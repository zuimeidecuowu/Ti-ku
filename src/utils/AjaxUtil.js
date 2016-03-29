
var TEST_URL = {
    loadSubject: './data/subjects.json',
    checkNameCanUser: 'knowledges/checkKnowledgeName',
    loadTreeNode: './data/data.json',
    loadPhase: './data/phases.json',
    loadKnowledgeInfo: './data/knowledgeinfo.json',
    loadSearchResult: './data/search.json',
    delKnowledge: 'knowledges/deleteKnowledgeById',
    updateKnowledge: 'knowledges/addOrUpdateKnowledge'
};

var PROD_URL = {
    loadSubject: 'knowledges/findAllSubject',
    checkNameCanUser: 'knowledges/checkKnowledgeName',
    loadTreeNode: 'knowledges/findAllByKnowledges',
    loadPhase: 'knowledges/findAllPhases',
    loadKnowledgeInfo: 'knowledges/findKnowledgeInfo',
    loadSearchResult: 'knowledges/searchKnowledges',
    delKnowledge: 'knowledges/deleteKnowledgeById',
    updateKnowledge: 'knowledges/addOrUpdateKnowledge'
};

var isProd = true;

var AjaxUtil = {
    loadSubject: function (callback) {
        "use strict";
        $.post(isProd ? PROD_URL.loadSubject : TEST_URL.loadSubject, null, function (data) {
            callback(data.result);
        }, 'json');
    },
    checkNameCanUse: function (param, callback) {
        "use strict";
        $.post(isProd ? PROD_URL.checkNameCanUser : TEST_URL.checkNameCanUser, param, callback, 'json');
    },
    loadTreeNode: function (where, callback, needSelectFirst, isView) {
        "use strict";

        var subjectId = where.subjectId;
        var phaseId = where.phaseId;
        var knowledgeId = where.id;

        if (phaseId == 0) {
            phaseId = knowledgeId;
            knowledgeId = 0;
        }

        $.post(isProd ? PROD_URL.loadTreeNode : TEST_URL.loadTreeNode, {
            phaseId: phaseId,
            subjectId: subjectId,
            knowledgeId: knowledgeId
        }, function (data) {
            callback(where, data.result, needSelectFirst, isView);
        }, 'json');
    },
    loadPhase: function (callback) {
        "use strict";
        $.post(isProd ? PROD_URL.loadPhase : TEST_URL.loadPhase, null, function (data) {
            callback(data.result);
        }, 'json');
    },
    loadKnowledgeInfo: function (param, callback) {
        "use strict";
        $.post(isProd ? PROD_URL.loadKnowledgeInfo : TEST_URL.loadKnowledgeInfo, {
            id: param.id
        }, function (data) {
            callback(data.result);
        });
    },
    loadSearchResult: function (param, callback) {
        "use strict";
        $.post(isProd ? PROD_URL.loadSearchResult : TEST_URL.loadSearchResult, param, function (data) {
            callback(data.result);
        }, 'json');
    },
    delKnowledge: function (id, callback) {
        "use strict";
        var param = {id: id};
        $.post(isProd ? PROD_URL.delKnowledge : TEST_URL.delKnowledge, param, callback, 'json');
    },
    updateKnowledge: function (params, callback) {
        "use strict";
        var knowledgePointVo = JSON.stringify(params);
        $.ajax({
            url: isProd ? PROD_URL.updateKnowledge : TEST_URL.updateKnowledge,
            dataType: 'json',
            contentType: "application/json;charset=UTF-8",
            type: "POST",
            data: knowledgePointVo,
            success: callback,
            error: function () {
                bootbox.alert('保存失败');
            }
        });
    }
};
module.exports = AjaxUtil;