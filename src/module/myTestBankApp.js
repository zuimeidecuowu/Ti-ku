var React = require('react');
var ReactDOM = require('react-dom');
var Reflux = require('reflux');
var storeMyTestBank= require('./../stores/storeMyTestBank');
var MyTestBankActions = require('../actions/MyTestBankActions');
var TopicList =require('../components/topicAdd/TopicList');
var KnowledgeContainerViewer = require('./../containers/KnowledgeContainerViewer');
var PagePlugIn =require('../components/page/PagePlugIn');

var MyTestBankApp=React.createClass({
    mixins: [Reflux.connect(storeMyTestBank, "data")],
    getInitialState:function(){
        return{
            questionTypeList:[],
            status:'未提交打回',
            isEdit:false
        }
    },
    componentDidMount:function(){
        $.ajax({
            url: 'question/getAllQuestionType',
            dataType : 'json',
            type : "POST",
            success : function(data) {
                this.setState({questionTypeList: data.bean});
            }.bind(this)
        });
        MyTestBankActions.initSearch();
    },
    render:function(){
        var pagePlug;
        var Btns;
        if(this.state.data.topicDataList.length){
            pagePlug =(<PagePlugIn total={this.state.data.topicTotal}
                                   onChange={this.pagePlugChange} />);
        }
        var editTopic;
        if(this.state.data.isEdit){
            var eidtBtns=[
                {
                btnName:'取消',
                btnClass:'button',
                callBackName:'cancelTopic'
                },
                {
                    btnName:'保存',
                    btnClass:'button green',
                    callBackName:'saveTopic'
                }];
            editTopic=(<div className="col-sm-12 textBookHeader no-padding-left no-padding-right"><TopicList  Btns={eidtBtns}
                                  cancelTopic={this.cancelTopic}
                                  saveTopic={this.saveTopic}
                                    {...this.state.data.topicData}
                                    {...this.state.data}
                                /></div>);
        }
        if(this.state.status=="未提交打回"){
            var Btns =[
                {
                    btnName:'删除',
                    btnClass:'button red',
                    callBackName:'deleteTopic'
                },
                {
                    btnName:'编辑',
                    btnClass:'button',
                    callBackName:'editTopic'
                },
                {
                    btnName:'提交审核',
                    btnClass:'button green',
                    callBackName:'auditedTopic'
                }
            ];
        }
        return(
            <div>
                <div className="col-sm-12 textBookHeader no-padding-left no-padding-right">
                    <div className="col-sm-6  no-padding-left">
                        <button onClick={this.goToAdd} className="button">新增题目</button>
                    </div>
                    <div className="col-sm-6 text-right no-padding-right" >
                        <button className="button">上传试题</button>
                    </div>
                </div>
                <div className="col-sm-12 textBookHeader no-padding-left no-padding-right">
                    <div className="space-6"></div>
                    <button onClick={this.statusChange} title="未提交打回" name="unSubmitOrBackQuestions" className="btn btn-xs btn-danger">
                        未提交/打回列表
                    </button>
                    <button onClick={this.statusChange} title="" name="submitedQuestions" className="btn btn-xs btn-white">
                        已上传列表
                    </button>
                </div>

                <div style={{display:this.state.data.isEdit?'none':'block'}} className="col-sm-12 no-padding-left no-padding-right">
                    <div className="space-6"></div>
                    <div className="topicList">
                            <header>

                                <select onChange={this.questionTypeChange} id="topicSelect">
                                    {
                                        this.state.questionTypeList.map(function(item,index){
                                            return(
                                                <option value={item.value} key={index}>{item.name}</option>
                                            )
                                        })
                                    }
                                </select>
                                <span id="topicNums" className="right">
                                    共计{this.state.data.topicTotal}道题
                                </span>
                            </header>
                            <arction id="topicCon">
                                {
                                    this.state.data.topicDataList.map(function(item,index){
                                        return(<TopicList Btns={Btns}
                                                          deleteTopic={this.deleteTopic}
                                                          editTopic={this.editTopic}
                                                          auditedTopic={this.auditedTopic}
                                                          urlParam ={"myTestBank"}
                                                          {...item}
                                                            isView={true}
                                                           key={index} />)
                                    }.bind(this))
                                }
                            </arction>
                            {pagePlug}
                        </div>
                </div>
                {editTopic}
            </div>
        )
    },
    statusChange:function(evt) {
        var type = evt.target.name;
        var title = evt.target.title;
        $(evt.target).addClass('btn-danger').removeClass('btn-white').siblings('button').addClass('btn-white').removeClass('btn-danger');
        MyTestBankActions.statusChange(type);
        this.setState({status:title});
    },
    questionTypeChange:function(evt){
        MyTestBankActions.questionTypeChange(evt.target.value);
    },
    pagePlugChange:function(pageObj){
        MyTestBankActions.pagePlugChange(pageObj);
    },
    goToAdd:function(){
        window.location.href="topicAdd";
    },
    deleteTopic:function(objData){
        var dataObj = {
            "questionId":objData.questionId,
            "questionType":objData.questionType
        };
        $.ajax({
            url:'question/delete',
            dataType:'JSON',
            type:'POST',
            contentType:'application/json',
            data:JSON.stringify(dataObj),
            success:function(data){
                if(data.status=='OK'){
                    bootbox.alert('删除成功',function(){
                        MyTestBankActions.initSearch();
                    });
                }else{
                    bootbox.alert('删除失败');
                }
            },
            error:function(meg){
                bootbox.alert('请求失败原因：'+meg)
            }
        });
    },
    editTopic:function(objData){
        var questionType = objData.questionType.toLocaleLowerCase();
        var dataObj = {
            "questionId":objData.questionId
        };
        $.ajax({
            url:questionType+'/getQuestionById',
            dataType:'JSON',
            type:'POST',
            contentType:'application/json',
            data:JSON.stringify(dataObj),
            success:function(data){
                if(data.status=='OK'){
                    MyTestBankActions.searchTopic(data.bean)
                }
            },
            error:function(meg){
                bootbox.alert('请求失败原因：'+meg)
            }
        });
    },
    auditedTopic:function(objData){
        var dataObj = {
            "questionId":objData.questionId,
            "questionType":objData.questionType
        };
        $.ajax({
            url:'question/pendingAudit',
            dataType:'JSON',
            type:'POST',
            contentType:'application/json',
            data:JSON.stringify(dataObj),
            success:function(data){
                if(data.status=='OK'){
                    bootbox.alert('提交审核成功',function(){
                        MyTestBankActions.initSearch("OK");
                    });
                }else{
                    bootbox.alert('提交审核失败');
                }
            },
            error:function(meg){
                bootbox.alert('请求失败原因：'+meg)
            }
        });
    },
    cancelTopic:function(){
        MyTestBankActions.cancelTopic();
    },
    saveTopic:function(){
        MyTestBankActions.saveTopic();
    }
});
ReactDOM.render(<MyTestBankApp  />,document.getElementById('myTestBank'));