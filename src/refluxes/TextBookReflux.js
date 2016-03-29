var AjaxUtil = require('../utils/AjaxUtil');
var TextBookReflux = {
    onUpdateTextBookData:function(){
        if(types.id !=''){
            $.ajax({
                url:'./data/textbook.json',
                //url:'textbookmg/getTextbookById',
                type:'POST',
                dataType:'json',
                data:{id:types.id},
                success:function(data){
                    var dataList = {
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
                        textBookData:data
                    };

                    this.updateData(dataList);
                }.bind(this),
                error:function(meg){
                    bootbox.alert("查询失败:"+meg)
                }
            })
        }
    },
    onAddChapter: function (chapterSection,Name) {
        "use strict";
        var sortnum = function(){
            "use strict";
            if(chapterSection.length){
                return parseInt(chapterSection[chapterSection.length-1].sort)+1;
            }else{
                return 1;
            }
        }.bind(this)();
        chapterSection.name = Name;
        chapterSection.push({
            'id':'',
            "specialType": false,
            "name": '',
            "sort": sortnum,
            "knowledge": [],
            "children": []
        });
        this.updateData(this.data);
    },

    onAddSection: function (chapterSection, special) {
        "use strict";

        var sortnum = function(){
            "use strict";
            var children = chapterSection.children;
            if(children.length){
                return parseInt(children[children.length-1].sort)+1;
            }else{
                return 1;
            }
        }.bind(this)();
        chapterSection.children.push({
            'id':'',
            "specialType": special,
            "name": '',
            "sort": sortnum,
            "knowledge": [],
            "children": []
        });

        this.updateData(this.data);
    },

    onSpecialTypeChange: function (chapterSection) {
        "use strict";

        function changeChild(chapterSection) {
            chapterSection.specialType = !chapterSection.specialType;
            chapterSection.children.forEach(function (item) {
                if(item.specialType) return;
                changeChild(item);
            });
        }

        changeChild(chapterSection);
        this.updateData(this.data);
    },

    onRemoveSection:function(chapterSection,index){
        "use strict";
        if(chapterSection[index].id !=""){
            var removeObj={
                'chapterId':chapterSection[index].id,
                'knowledgeId':''
            };
            this.data.textBookData.removeReslut.push(removeObj)
        }
        chapterSection.splice(index,1);
        this.updateData(this.data);
    },
    onAddSectionName:function(chapterSection,Name){
        "use strict";
        chapterSection.name = Name;
        this.updateData(this.data);
    },
    onUpdateTextbook:function(id,text,inforName){
        if(text !=null){//如果是年的选择
            if(inforName !="fascicule") {//如果选择的不是册
                this.data.textBookData.textbook['fascicule']={};
                this.data.textBookData.textbook[inforName]={'id':id,'name':text};

                if(inforName=="subject" || inforName=="phase"){//如果选择的是学科或者学段 为Postdata赋值 供 章节的知识点中的【能力和认知层次使用】
                    this.data.textBookData.postData[inforName] = id;
                }
            }else{
                this.data.textBookData.textbook[inforName]={'id':id,'name':text};
            }
        }else{

            this.data.textBookData.textbook[inforName]=id;
        }
        this.data.errorInformation=[];
        this.updateData(this.data);
    },
    onAddKnowledge:function(refers){
        "use strict";
        this.data.addKnowledgeModal = true;
        this.data.knowledgeViewData.isJustView = false;
        this.data.knowledgeViewData.selectedKnowledge = refers;
        this.data.knowledgeViewData.subjectId=this.data.textBookData.textbook.subject.id;
        this.updateData(this.data);
    },
    onUpdateKnowledge:function(data,name,val){
        data[name]=val;
        this.updateData(this.data);
    },
    onRemoveKnowledge:function(data,index){
        if(data.id !=""){
            var removeObj={
                'chapterId':data.id,
                'knowledgeId':data['knowledge'][index].id
            };
            this.data.textBookData.removeReslut.push(removeObj)
        }
        data['knowledge'].splice(index,1);
        this.updateData(this.data);
    },
    onShowKnowledge:function(id){
        this.data.addKnowledgeModal = true;
        this.data.knowledgeViewData.isJustView = true;
        this.data.knowledgeViewData.currentPoint.id = id;
        this.data.knowledgeViewData.currentPoint.name=null;
        this.updateData(this.data);
    },
    onChangeStates:function(flag){
        this.data.textBookData.textbook.status = flag;
        this.updateData(this.data);
    },
    onDeleteTextBook:function(){
        bootbox.confirm('您确认要删除本教材吗？',function(result){
            if(result){
                if(this.data.textBookData.textbook.id !=''){
                    var id =this.data.textBookData.textbook.id;
                    $.ajax({
                        url:'textbookmg/deleteTextbook',
                        dataType :'json',
                        type : "POST",
                        data:{id:id},
                        success : function(data) {
                            if (data.status == 'OK') {
                                bootbox.alert(data.resultstr,function(){
                                    window.location.href="textbookmg";
                                });
                            }else{
                                bootbox.alert(data.resultstr)
                            }

                        },
                        error:function(meg){
                            bootbox.alert('请求出错:'+meg)
                        }

                    });
                }else{
                    window.location.href="textbookmg";
                }
            }

        }.bind(this));
    },
    onSaveTextBook:function(){
        var information = this.data.textBookData.textbook;
        var flag =false;

        this.data.errorInformation=[];
        for(var i in information){
            if(i !='status' && i != 'imgUrl' && i!='id'){
                var error = false;
                if(typeof information[i] ==='object'){
                    if(information[i].id ==''|| information[i].id ==undefined){
                        error=true;
                    }
                }else{
                    if(information[i] == ''){
                        error=true;
                    }
                }
                if(error){
                    this.data.errorInformation.push(i);
                    flag=true;
                }
            }
        }
        if(flag){
            this.updateData(this.data);
            return;
        }
        if(this.data.textBookData.textbook.id !=''){
            $.ajax({
                url:'textbookmg/updateTextbook',
                dataType : 'json',
                type : "POST",
                contentType:"application/json",
                data:JSON.stringify(this.data.textBookData),
                success : function(data) {
                    if(data.status =='OK'){
                        bootbox.alert(data.bean.resultstr,function(){
                            window.location.href="textbookChapter?id="+data.bean.id+"&type=view";
                        });
                    }else{
                        bootbox.alert('添加出错:'+data.bean.resultstr)
                    }
                },
                error:function(meg){
                    bootbox.alert('删除出错:'+meg)
                }
            });
        }else{
            $.ajax({
                url:'textbookmg/addTextbook',
                dataType : 'json',
                type : "POST",
                contentType:"application/json",
                data:JSON.stringify(this.data.textBookData),
                success : function(data) {
                    if(data.status =='OK'){
                        bootbox.alert(data.bean.resultstr,function(){
                            window.location.href="textbookChapter?id="+data.bean.id+"&type=view";;
                        });
                    }else{
                        bootbox.alert('添加出错:'+data.bean.resultstr)
                    }
                },
                error:function(meg){
                    bootbox.alert('添加出错:'+meg)
                }
            });
        }

    }

};

module.exports = TextBookReflux;