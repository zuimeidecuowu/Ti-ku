
var TopicSearchReflux={
    __SearchTopicList:function(){
        var url;
        if(this.data.searchData.knowledgeId){
            url = 'questionByknowledge'
        }else{
            url = 'questionByChpaterSection'
        }
        $.ajax({
            url:'question/'+url,
            dataType:'JSON',
            type:'post',
            contentType:'application/json',
            data:JSON.stringify(this.data.searchData),
            success:function(data){
                if(data.status=='OK' ){
                    if(data.bean){
                        var topicDataList = data.bean.result;
                        var topicTotal = data.bean.total;
                    }else{
                        var topicDataList = [];
                        var topicTotal = 0;
                    }
                    this.data.topicDataList = topicDataList;
                    this.data.topicTotal = topicTotal;
                    this.updateData(this.data);
                }
            }.bind(this)
        })
    },
    onKnowledgeChange:function(knowledgeObj){
        delete this.data.searchData.chapterSectionId;
        this.data.searchData.knowledgeId = knowledgeObj['knowledgeId'];
        this.data.searchData.currentPage=1;
        this.data.searchData.pageSize=10;
        this.__SearchTopicList();
    },
    onQuestionTypeChange:function(questionId){
        this.data.searchData.questionType = questionId;
        this.data.searchData.currentPage=1;
        this.data.searchData.pageSize=10;
        this.__SearchTopicList();
    },
    onTextBookChange:function(textBookObj){
        delete this.data.searchData.knowledgeId;
        this.data.searchData.chapterSectionId = textBookObj.id;
        this.data.searchData.currentPage=1;
        this.data.searchData.pageSize=10;
        this.__SearchTopicList();
    },
    onChosenTextBookId:function(textBookId){
        this.data.textBookId = textBookId;
        this.updateData(this.data);
    },
    onPagePlugChange:function(pageObj){
        this.data.searchData.currentPage=pageObj.nowPage;
        this.data.searchData.pageSize=pageObj.pageSize;
        this.__SearchTopicList();
    }
};
module.exports = TopicSearchReflux;