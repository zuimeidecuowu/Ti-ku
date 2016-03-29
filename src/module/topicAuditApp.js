var React = require('react');
var ReactDOM = require('react-dom');
var Reflux = require('reflux');
var storeTopicAudit= require('./../stores/storeTopicAudit');
var TopicAuditActions = require('../actions/TopicAuditActions');
var TopicList =require('../components/topicAdd/TopicList');
var PagePlugIn =require('../components/page/PagePlugIn');

var TopicAuditApp=React.createClass({
    mixins: [Reflux.connect(storeTopicAudit, "data")],
    getInitialState:function(){
        return{
            questionTypeList:[],
            subjectList:[],
            phaseList:[],
            status:'未审核',
            showDisApprove:false,
            auditOpinion:'存在错别字',
            disApprove:{}
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
        $.ajax({//学段
            url: 'metaData/findPhasesValue',
            dataType : 'json',
            type : "POST",
            success : function(data) {
                this.setState({phaseList:data})
            }.bind(this)
        });
        $.ajax({//学科
            url: 'metaData/findSubjectValue',
            dataType : 'json',
            type : "POST",
            success : function(data) {
                this.setState({subjectList:data})
            }.bind(this)
        });
        TopicAuditActions.initSearch();
    },
    componentWillMount:function(nextProps){

    },
    render:function(){
        var pagePlug;
        var Btns;
        var editTopic;
        var disApprove;
        if(this.state.data.isEdit){
            var editBtns=[
                {
                    btnName:'取消编辑',
                    btnClass:'button',
                    callBackName:'cancelTopic'
                },
                {
                    btnName:'保存',
                    btnClass:'button green',
                    callBackName:'saveTopic'
                }];
            editTopic=(<div className="col-sm-12 textBookHeader no-padding-left no-padding-right">
                <TopicList  Btns={editBtns}
                            {...this.state.data.topicData}
                            {...this.state.data}
                            cancelTopic={this.cancelTopic}
                            saveTopic={this.saveTopic}
                            isView={false}/>
            </div>);
        }
        if(this.state.status=="未审核"){
            var Btns =[
                {
                    btnName:'编辑',
                    btnClass:'button',
                    callBackName:'editTopic'
                },
                {
                    btnName:'打回',
                    btnClass:'button red',
                    callBackName:'showDisApprove'
                },
                {
                    btnName:'审核通过',
                    btnClass:'button green',
                    callBackName:'approve'
                }
            ];
        }else{
            var Btns =[
                {
                    btnName:'编辑',
                    btnClass:'button',
                    callBackName:'editTopic'
                }
            ]
        }
        if(this.state.data.topicDataList.length){
            pagePlug =(<PagePlugIn total={this.state.data.topicTotal}
                                   onChange={this.pagePlugChange} />);
        }
        if(this.state.showDisApprove){
            disApprove=(<div className="myModal">
                    <div className="modalCon">
                        <p>
                            <input onChange={this.disApproveChange} defaultChecked="checked" type="radio" value="存在错别字"  name="disApprove" />存在错别字
                        </p>
                        <p>
                            <input onChange={this.disApproveChange} type="radio" value="题目录入错误" name="disApprove" />题目录入错误
                        </p>
                        <p>
                            <input onChange={this.disApproveChange} type="radio" value="答案不正确"  name="disApprove" />答案不正确
                        </p>
                        <p>
                            <input onChange={this.disApproveChange} type="radio" value="解析不正确"  name="disApprove" />解析不正确
                        </p>
                        <p>
                            <input onChange={this.disApproveChange} type="radio" value="其他" name="disApprove" />其他
                            <textarea onBlur={this.otherCon} id="disApproveTextarea" style={{visibility:'hidden'}}></textarea>
                        </p>
                        <div className="botBtn">
                            <button onClick={this.disApprove} className="button green">确定</button>
                            <button onClick={this.hideDisApprove} className="button green">取消</button>
                        </div>
                    </div>
            </div>);
        }
        return(
            <div>
                <div className="col-sm-12 textBookHeader no-padding-left no-padding-right">
                    <button onClick={this.statusChange} title="未审核" name="questionsPendingAudit" className="btn btn-xs btn-danger">
                        未审核列表
                    </button>
                    <button onClick={this.statusChange} title="已审核" name="questionsAudited" className="btn btn-xs btn-white">
                        已审核列表
                    </button>
                </div>
                <hr/>
                <div style={{display:this.state.data.isEdit?'none':'block'}}  className="col-sm-12 no-padding-left no-padding-right">
                    <div className="space-6"></div>
                    <div className="topicList">
                            <header>
                                <select onChange={this.typeChange} name="subjectId" id="subjectSelect">
                                    <option value="">请选择学科</option>
                                    {
                                        this.state.subjectList.map(function(item,index){
                                            return(
                                                <option value={item.keyCode} key={index}>{item.keyValue}</option>
                                            )
                                        })
                                    }
                                </select>
                                <select onChange={this.typeChange} name="phaseId" id="phaseSelect">
                                    <option value="">请选择学段</option>
                                    {
                                        this.state.phaseList.map(function(item,index){
                                            return(
                                                <option value={item.keyCode} key={index}>{item.keyValue}</option>
                                            )
                                        })
                                    }
                                </select>
                                <select onChange={this.typeChange} name="questionType" id="topicSelect">
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
                                        return(<TopicList {...item} isView={true} Btns={Btns}
                                                                    approve={this.approve}
                                                                    editTopic={this.editTopic}
                                                                    urlParam ={"topicAudit"}
                                                                    showDisApprove={this.showDisApprove}
                                                                    key={index} />)
                                    }.bind(this))
                                }
                            </arction>
                            {pagePlug}
                        </div>
                </div>
                {editTopic}
                {disApprove}
            </div>
        )
    },
    statusChange:function(evt) {
        var type = evt.target.name;
        var title = evt.target.title;
        $(evt.target).addClass('btn-danger').removeClass('btn-white').siblings('button').addClass('btn-white').removeClass('btn-danger');
        TopicAuditActions.statusChange(type);
        this.setState({status:title});
    },
    typeChange:function(evt){
        var name = evt.target.name;
        var val = evt.target.value
        TopicAuditActions.typeChange(name,val);
    },
    cancelTopic:function(){
        TopicAuditActions.cancelTopic();
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
                    TopicAuditActions.searchTopic(data.bean)
                }
            },
            error:function(meg){
                bootbox.alert('请求失败原因：'+meg)
            }
        });
    },
    pagePlugChange:function(pageObj){
        TopicAuditActions.pagePlugChange(pageObj);
    },
    approve:function(objData){
        var state = this.getState();
        TopicAuditActions.approve(objData);

        this.setState();
    },
    otherCon:function(evt){
        var name = evt.target.value;
        this.setState({auditOpinion:name});
    },
    showDisApprove:function(objData){
        this.setState({showDisApprove:true,disApprove:objData});
    },
    hideDisApprove:function(){
        this.setState({showDisApprove:false});
    },
    disApprove:function(){
        TopicAuditActions.disApprove(this.state.disApprove,this.state.auditOpinion);
        this.setState({showDisApprove:false});
    },
    disApproveChange:function(evt){
        var name = evt.target.value;
        if(name=="其他"){
            $('#disApproveTextarea').css({'visibility':'visible'});
        }else{
            this.setState({auditOpinion:name});
            $('#disApproveTextarea').css({'visibility':'hidden'});
        }
    },
    saveTopic:function(objData){
        TopicAuditActions.saveTopic(objData);
    }
});
ReactDOM.render(<TopicAuditApp />,document.getElementById('topicAudit'));