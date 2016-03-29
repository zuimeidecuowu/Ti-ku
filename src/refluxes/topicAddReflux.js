
var TopicAddReflux={
    initData:function(){
        var data = this.data.topicData;
        for(var i in data){
            if(i=="questionType" || i=="answers"){
                continue;
            }
            var datatype= typeof(data[i]);
            if(datatype=='string'){
                data[i]="";
            }else if(datatype=="number"){
                data[i]=0;
            }else if(datatype=="boolean"){
                data[i]=false;
            }else if(datatype=="object"){
                if(Array.isArray(data[i])){
                    data[i]=[];
                }else{
                    data[i]={};
                }
            }
        }
    },
    onChangeQuestionTypes:function(types){
        this.data.topicData.questionType=types;
        var majorKnowledge={};
        switch(types){
            case 'CHOICE':
                delete this.data.topicData.questions;
                delete this.data.topicData.isTrue;
                delete this.data.topicData.answer;
                this.data.topicData.answers=[{"answer":"","isTrue":false,"sort":1}];
                this.data.topicData.analysis="";
                this.data.topicData.majorKnowledge=majorKnowledge;
                break;
            case 'FILLING':
                delete this.data.topicData.questions;
                delete this.data.topicData.isTrue;
                delete this.data.topicData.answer;
                this.data.topicData.answers=[{"answer":"","sort":1}];
                this.data.topicData.analysis="";
                this.data.topicData.majorKnowledge=majorKnowledge;
                break;
            case 'JUDGE':
                delete this.data.topicData.questions;
                delete this.data.topicData.answers;
                delete this.data.topicData.answer;
                this.data.topicData['isTrue']=false;
                this.data.topicData.analysis="";
                this.data.topicData.majorKnowledge=majorKnowledge;
                break;
            case 'SHORTANSWER':
                delete this.data.topicData.questions;
                delete this.data.topicData.isTrue;
                delete this.data.topicData.answers;
                this.data.topicData.answer="";
                this.data.topicData.analysis="";
                this.data.topicData.majorKnowledge=majorKnowledge;
                break;
            case 'SYNTHETICAL':
                delete this.data.topicData.answers;
                delete this.data.topicData.isTrue;
                delete this.data.topicData.answer;
                delete this.data.topicData.analysis;
                this.data.topicData['questions']=[];
                this.data.topicData.majorKnowledge=[];
                break;
        }
        this.initData();
        this.updateData(this.data);

    },
    onChangeYear:function(year){
        this.data.topicData.year=year;
        this.updateData(this.data);
    },
    onChangeCategroy:function(type,who){
        if(type){
            this.data.topicData.categroy.push(who);
        }else{
            var delectIndex=-1;
            this.data.topicData.categroy.forEach(function(item,index){
                if(item.value == who.value){
                    delectIndex=index;
                }
            })
            this.data.topicData.categroy.splice(delectIndex,1);
        }
        this.updateData(this.data);
    },
    onTopicChange:function(html,notSYNTHETICAL,parentsort){
        if(notSYNTHETICAL){
            var obj = this.data.topicData;
        }else{
            var obj;
            this.data.topicData.questions.forEach(function(item){
                if(item.sort == parentsort){
                    obj = item;
                }
            });
        }
        obj.topic = html;
        this.updateData(this.data);
    },
    onAnalysisChange:function(html,notSYNTHETICAL,parentsort){
        if(notSYNTHETICAL){
            var obj = this.data.topicData;
        }else{
            var obj;
            this.data.topicData.questions.forEach(function(item){
                if(item.sort == parentsort){
                    obj = item;
                }
            });
        }
        obj.analysis = html;
        this.updateData(this.data);
    },
    onAnswerChange:function(html,sort,notSYNTHETICAL,parentsort){
        if(notSYNTHETICAL){
            var obj = this.data.topicData;
        }else{
            var obj;
            this.data.topicData.questions.forEach(function(item){
                if(item.sort == parentsort){
                    obj = item;
                }
            });
        }
        if(Array.isArray(obj.answers)) {//填空和选择题
            obj.answers.forEach(function (item) {
                if (item.sort == sort) {
                    item.answer = html;
                }
            });
        }else{//简答题
            obj.answer=html
        }
        this.updateData(this.data);
    },
    onAnswerChangeCHOICE:function(checked,sort,notSYNTHETICAL,parentsort){
        if(notSYNTHETICAL){
            var obj = this.data.topicData;
        }else{
            var obj;
            this.data.topicData.questions.forEach(function(item){
                if(item.sort == parentsort){
                    obj = item;
                }
            });
        }
        obj.answers.forEach(function(item){
            if(item.sort == sort){
                item['isTrue']=checked;
            }
        });
        this.updateData(this.data);
    },
    onRemoveAnswer:function(index,notSYNTHETICAL,parentsort){
        if(notSYNTHETICAL){
            var obj = this.data.topicData;
        }else{
            var obj;
            this.data.topicData.questions.forEach(function(item){
                if(item.sort == parentsort){
                    obj = item;
                }
            });
        }
        obj.answers.splice(index,1);
        this.updateData(this.data);
    },
    onAddAnswer:function(questionType,notSYNTHETICAL,parentsort){
        if(notSYNTHETICAL){
            var obj = this.data.topicData;
        }else{
            var obj;
             this.data.topicData.questions.forEach(function(item){
                 if(item.sort == parentsort){
                    obj = item;
                 }
            });
        }
        var lastAnswer = obj.answers[obj.answers.length-1];

        if(lastAnswer.answer === ''){
            if(!this.data.errorInformation){
                this.data.errorInformation=['answerNoCon'];
            }else{
                this.data.errorInformation.push('answerNoCon');
            }
        }else{
            var sort = lastAnswer.sort+1;
            var newAnswer;
            switch (questionType){
                case 'CHOICE':
                    newAnswer={"answer":"","isTrue":false,"sort":sort};
                    break;
                case 'FILLING':
                    newAnswer={"answer":"","sort":sort};
                    break;
            }
            obj.answers.push(newAnswer);
        }
        this.updateData(this.data);
    },
    onChangeJUDGE:function(flag,notSYNTHETICAL,parentsort){
        if(notSYNTHETICAL){
            var obj = this.data.topicData;
        }else{
            var obj;
            this.data.topicData.questions.forEach(function(item){
                if(item.sort == parentsort){
                    obj = item;
                }
            });
        }
        obj.isTrue = flag;
        this.updateData(this.data);
    },
    onAddSYNTHETICAL:function(type,sort){
        switch(type){
            case 'CHOICE': //选择题
                var question ={
                    "questionType":"CHOICE",
                    "id":"",
                    "topic":"",
                    "analysis":"",
                    "answers":[{"answer":"","isTrue":false,"sort":1}],
                    "sort":sort
                };
                this.data.topicData.questions.push(question);
                break;
            case 'FILLING': //填空题
                var question ={
                    "questionType":"FILLING",
                    "id":"",
                    "topic":"",
                    "analysis":"",
                    "answers":[{"answer":"","sort":1}],
                    "sort":sort
                };
                this.data.topicData.questions.push(question);
                break;
            case 'JUDGE': //判断题
                var question ={
                    "questionType":"JUDGE",
                    "id":"",
                    "topic":"",
                    "analysis":"",
                    "isTrue":false,
                    "sort":sort
                };
                this.data.topicData.questions.push(question);
                break;
            case 'SHORTANSWER': //简答题
                var question ={
                    "questionType":"SHORTANSWER",
                    "id":"",
                    "topic":"",
                    "analysis":"",
                    "answer":"",
                    "sort":sort
                };
                this.data.topicData.questions.push(question);
                break;
        }
        this.updateData(this.data);
    },
    onAddMajorKnowledge:function(refer){
        this.data.addKnowledgeModal = true;
        this.data.knowledgeViewData.isJustView = false;
        this.data.knowledgeViewData.chosenExam=true;
        this.data.knowledgeViewData.selectedKnowledge = refer;
        this.updateData(this.data);
    },
    onAddMinorKnowledge:function(refer){
        this.data.addKnowledgeModal = true;
        this.data.knowledgeViewData.isJustView = false;
        this.data.knowledgeViewData.chosenExam=false;
        this.data.knowledgeViewData.selectedKnowledge = refer;
        this.updateData(this.data);
    },
    onRemoveMajorKnowledge:function(id){
        this.data.topicData.majorKnowledge.forEach(function(item,index){
            if(item.knowledgeId == id){
                this.data.topicData.majorKnowledge.splice(index,1);
            }
        }.bind(this));
        this.updateData(this.data);
    },
    onRemoveMinorKnowledge:function(id){
        this.data.topicData.minorKnowledge.forEach(function(item,index){
            if(item.knowledgeId == id){
                this.data.topicData.minorKnowledge.splice(index,1);
            }
        }.bind(this))
        this.updateData(this.data);
    },
    onUpdateCognizeLevel:function(knowledgeId,name,id){
        var majorKnowledge = this.data.topicData.majorKnowledge;
        if(Array.isArray(majorKnowledge)){
            majorKnowledge.forEach(function(item){
                if(item.knowledgeId==knowledgeId){
                    item.cognizeLevelId = id;
                    item.cognizeLevelName=name;
                }
            })
        }else{
            majorKnowledge.cognizeLevelId=id;
            majorKnowledge.cognizeLevelName=name;
        }
        this.updateData(this.data);
    },
    onUpdateAbilityId:function(knowledgeId,name,id){
        var majorKnowledge = this.data.topicData.majorKnowledge;
        if(Array.isArray(majorKnowledge)){
            majorKnowledge.forEach(function(item){
                if(item.knowledgeId==knowledgeId){
                    item.abilityId = id;
                    item.abilityName=name;
                }
            })
        }else{
            majorKnowledge.abilityId=id;
            majorKnowledge.abilityName=name;
        }
        this.updateData(this.data);
    },
    onSourceChange:function(html){
        this.data.topicData.source = html;
        this.updateData(this.data);
    },
    onDifficultyChange:function(point){
        this.data.topicData.difficulty=point;
        this.updateData(this.data);

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
        //答案校验
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
                            window.location.href="topicAdd";
                        });
                    }else{
                        bootbox.alert(msg+'失败');
                    }
                },
                error:function(meg){
                    bootbox.alert('失败原因：'+meg)
                }
            });
        }
        this.updateData(this.data);
    },
    onRemoveSYNTHETICALItem:function(index){
        this.data.topicData.questions.splice(index,1);
        this.updateData(this.data);
    }

}
module.exports = TopicAddReflux;