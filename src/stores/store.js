var Reflux = require('reflux');
var KnowledgeActions = require('../actions/KnowledgeActions');
var TextBookActions = require('../actions/TextBookActions');
var KnowledgeReflux = require('../refluxes/KnowledgeReflux');
var TextBookReflux = require('../refluxes/TextBookReflux');
var AjaxUtil = require('../utils/AjaxUtil');

var Store = Reflux.createStore({
    listenables: [KnowledgeActions, TextBookActions],
    mixins: [KnowledgeReflux, TextBookReflux],
    getInitialState: function () {
        "use strict";

        this.data = {
            addKnowledgeModal: false,
            knowledgeViewData: {
                isView: true,
                subjectId: '',
                phaseId: '',
                selectNode: null,
                limitId: null,
                subject: [],
                phase: [],
                isJustView: false,
                searchResult: [],
                selectedKnowledge: [],
                baseTree: {
                    children: []
                },
                currentPoint: {}
            },
            errorInformation:[],
            textBookData: {
                postData:{
                    phase:'',
                    subject:''
                },
                textbook:{
                    id:'',
                    phase:{},
                    fascicule:{},
                    grade:{},
                    textbookVersion:{},
                    subject:{},
                    year:"",
                    imgUrl:"",
                    status:false
                },
                removeReslut:[],
                chapterSection:[
                    {
                        "children": [],
                        "id": "",
                        "name": "",
                        "sort": 1,
                        "specialType": false,
                        "knowledge":[]
                    }
                ]
            }


        };

        return this.data;
    },
    updateData: function (data) {
        "use strict";
        this.data = data;
        this.trigger(data);
    }
});


module.exports = Store;