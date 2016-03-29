/**
 * Created by Administrator on 2015/12/25.
 */
var Reflux = require('reflux');
var KnowledgeActions = require('../actions/KnowledgeActions');
var TopicAddActions = require('../actions/TopicAddActions');
var KnowledgeReflux = require('../refluxes/KnowledgeReflux');
var TopicAddReflux = require('../refluxes/topicAddReflux');


var TopicAuditActions = require('../actions/TopicAuditActions');
var TopicAuditReflux = require('../refluxes/TopicAuditReflux');

var storeTopicAudit = Reflux.createStore({
    listenables: [KnowledgeActions,TopicAddActions,TopicAuditActions ],
    mixins: [KnowledgeReflux,TopicAddReflux,TopicAuditReflux],
    getInitialState: function () {
        "use strict";
        this.data = {
            listType:'questionsPendingAudit',
            topicDataList:[],
            topicTotal:0,
            searchData:{
                "questionType":"CHOICE",
                "phaseId":"",
                "subjectId":"",
                "currentPage":1,
                "pageSize":10
            },
            isEdit:false,
            addKnowledgeModal: false,
            knowledgeViewData: {
                isView: true,
                chosenExam:true,
                subjectId: '',
                phaseId: '',
                selectNode: null,
                limitId: null,
                subject: [],
                phase: [],
                isJustView: false,
                testPoint:[],
                searchResult: [],
                selectedKnowledge:null,
                baseTree: {
                    children: []
                },
                currentPoint: {}
            },
            topicData: {}
        };

        return this.data;
    },
    updateData: function (data) {
        "use strict";
        this.data = data;
        this.trigger(data);
    }
});


module.exports = storeTopicAudit;