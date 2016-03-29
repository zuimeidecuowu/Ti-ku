
var MyTestBankReflux={
    __SearchTopicList:function(ok){
        var searchUrlType = this.data.listType;
        $.ajax({
            url:'question/'+searchUrlType,
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
                    if(ok=="OK"){
                        this.updateData(this.data);
                    }
                }
            }.bind(this)
        })
    },
    onInitSearch:function(ok){
        this.__SearchTopicList(ok);
    },
    onStatusChange:function(type){
        this.data.isEdit=false;
        if(this.data.listType === type) return;
        this.data.listType = type;
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
    onSearchTopic:function(topicData){
        this.data.topicData =topicData;
        this.data.isEdit=true;
        this.updateData(this.data);
    },
    onCancelTopic:function(){
        this.data.isEdit=false;
        this.updateData(this.data);
    },
    onPagePlugChange:function(pageObj){
        this.data.searchData.currentPage=pageObj.nowPage;
        this.data.searchData.pageSize=pageObj.pageSize;
        this.__SearchTopicList();
    },
    onSaveTopic:function(){
        var location =this.data.topicData;
        var qusetionType = location['questionType'];
        //if(qusetionType =='SYNTHETICAL'){
        //    location=this.data.questions;
        //}
        var topic = location['topic'];
        var majorKnowledge = location['majorKnowledge'];
        var answer;
        var isOK = true;
        this.data.errorInformation=[];
        if(qusetionType=='CHOICE'){
            answer = this.data.topicData.answers;
            var flag=false,isTrue=false;
            answer.forEach(function(item){
                if(item.answer==""){
                    flag=true;
                }else if(item.isTrue){
                    isTrue=true
                }
            });
            if(flag || !isTrue){
                this.data.errorInformation.push('answer');
                isOK = false;
            }
        }else if(qusetionType=='FILLING'){
            answer = this.data.topicData.answers;
            var flag=false;
            answer.forEach(function(item){
                if(item.answer==""){
                    flag=true;
                }
            });
            if(flag){
                this.data.errorInformation.push('answer');
                isOK = false;
            }
        }else if(qusetionType=='SHORTANSWER'){
            answer = this.data.topicData.answer;
            if(!answer){
                this.data.errorInformation.push('answer');
                isOK = false;
            }
        }

        //提干校验
        if(!topic){
            this.data.errorInformation.push('topic');
            isOK = false;
        }
        //主要知识点校验
        if(Array.isArray(majorKnowledge)){
            if(majorKnowledge.length==0){
                this.data.errorInformation.push('majorKnowledge');
                isOK = false;
            }else{
                majorKnowledge.forEach(function(item,index){
                    if(!item.cognizeLevelId || !item.abilityId){
                        this.data.errorInformation.push('majorKnowledge');
                        isOK = false;
                    }
                }.bind(this));
            }
        }else{
            if(!majorKnowledge.cognizeLevelId || !majorKnowledge.abilityId){
                this.data.errorInformation.push('majorKnowledge');
                isOK = false;
            }
        }
        if(isOK){
            qusetionType = qusetionType.toLowerCase();
            var id = this.data.topicData.id;
            var msg='';
            if(id){
                msg='修改';
            }else{
                msg='添加';
            }
            $.ajax({
                url:qusetionType+'/addOrUpdateQuestion',
                dataType:'JSON',
                type:'POST',
                contentType:'application/json',
                data:JSON.stringify(this.data.topicData),
                success:function(data){
                    if(data.status=='OK'){
                        bootbox.alert(msg+'成功',function(){
                            this.data.isEdit=false;
                            this.__SearchTopicList();
                        }.bind(this));
                    }else{
                        bootbox.alert(msg+'失败');
                    }
                }.bind(this),
                error:function(meg){
                    bootbox.alert('失败原因：'+meg)
                }
            });
        }
        this.updateData(this.data);

    }
};
module.exports = MyTestBankReflux;