/**
 * Created by Administrator on 2015/12/25.
 */
var Reflux = require('reflux');
var KnowledgeActions = require('../actions/KnowledgeActions');
var TopicAddActions = require('../actions/TopicAddActions');
var KnowledgeReflux = require('../refluxes/KnowledgeReflux');
var TopicAddReflux = require('../refluxes/topicAddReflux');

var Store = Reflux.createStore({
    listenables: [KnowledgeActions, TopicAddActions],
    mixins: [KnowledgeReflux, TopicAddReflux],
    getInitialState: function () {
        "use strict";
        this.data = {
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
            topicData: {
                "questionType":"CHOICE",//题型
                "id":"",
                "difficulty":0,//难度
                "year":"",//年份
                "accuracy":"",//正确率
                "useNum":"",//使用次数
                "categroy":[],//分类
                "source":"",//来源
                "topic":"",//提干
                "analysis":"",//解析
                "answers":[{"answer":"","isTrue":false,"sort":1}], //答案
                "majorKnowledge":{},//主要知识点
                "minorKnowledge":[],//次要知识点
                "status":"",//submitAudit
                "auditStatus":"",//审核状态
                "auditOpinion":""//审核意见

            }

        };

        return this.data;
    },
    updateData: function (data) {
        "use strict";
        this.data = data;
        console.log(data.topicData);
        this.trigger(data);
    }
});


module.exports = Store;