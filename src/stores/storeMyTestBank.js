/**
 * Created by Administrator on 2015/12/25.
 */
var Reflux = require('reflux');
var KnowledgeActions = require('../actions/KnowledgeActions');
var TopicAddActions = require('../actions/TopicAddActions');
var KnowledgeReflux = require('../refluxes/KnowledgeReflux');
var TopicAddReflux = require('../refluxes/topicAddReflux');
var MyTestBankActions = require('../actions/MyTestBankActions');
var MyTestBankReflux = require('../refluxes/MyTestBankReflux');
var storeMyTestBank = Reflux.createStore({
    listenables: [KnowledgeActions, TopicAddActions,MyTestBankActions],
    mixins: [KnowledgeReflux, TopicAddReflux,MyTestBankReflux],
    getInitialState: function () {
        "use strict";
        this.data = {
            listType:'unSubmitOrBackQuestions',
            topicDataList:[],
            topicTotal:0,
            searchData:{
                "questionType":"CHOICE",
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


module.exports = storeMyTestBank;