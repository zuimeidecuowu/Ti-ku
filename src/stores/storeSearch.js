/**
 * Created by Administrator on 2015/12/25.
 */
var Reflux = require('reflux');

var TopicAddActions = require('../actions/TopicAddActions');
var TopicAddReflux = require('../refluxes/topicAddReflux');

var TopicSearchActions = require('../actions/TopicSearchActions');
var TopicSearchReflux = require('../refluxes/TopicSearchReflux');
var StoreSearch = Reflux.createStore({
    listenables: [TopicAddActions,TopicSearchActions],
    mixins: [TopicAddReflux,TopicSearchReflux],
    getInitialState: function () {
        "use strict";
        this.data = {
            textBookId:'',
            textbookVersions:{},
            topicDataList:[],
            topicTotal:0,
            searchData:{
                "questionType":"CHOICE",
                "currentPage":1,
                //"knowledgeId":'1447830167305000',
                "pageSize":10
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


module.exports = StoreSearch;