var React = require('react');
var TopicAddActions= require('../../actions/TopicAddActions');
var StarsChosen = require('./StarsChosen');
var TopicAnswers = require('./TopicAnswers');
var TopicAnswersSYNTHETICAL = require('./TopicAnswersSYNTHETICAL');
var KnowledgeContainerViewer = require('../../containers/KnowledgeContainerViewer');
var TopicAnalysis = require('./TopicAnalysis');
var Topic = require('./Topic');
var MajorKnowledge = require('./MajorKnowledge');
var MinorKnowledge = require('./MinorKnowledge');
var TopicSource = require('./TopicSource');

var TopicList = React.createClass({
    getInitialState:function(){
        return {
            categroy:[]
        }
    },
    componentDidMount:function(){
        $.ajax({
            url: 'question/getAllCategroy',
            dataType : 'json',
            type : "POST",
            success : function(data) {
                if(data.bean != null){
                    this.setState({categroy:data.bean})
                }
            }.bind(this)
        })
    },
    render:function(){
        var showAddView = this.props.addKnowledgeModal;//知识点弹出层
        var viewer;
        if (showAddView) {
            viewer = (<KnowledgeContainerViewer  knowledgeData={ this.props.knowledgeViewData}/>);
        }
        var viewDom,yearChosen;
        var viewClass='topicCon';
        var categroy=[];
        var Button;
        if(this.props.isView){
            viewClass='topicCon topicView';
            viewDom=(
                <div className="viewDom">
                    <label>使用次数:{this.props.useNum}次</label>
                    <label>正确率:{this.props.accuracy}</label>
                </div>
            );
            if(this.props.year){
                yearChosen=(<label>{this.props.year}</label>);
            }
            this.props.categroy.forEach(function(item,index){
                categroy.push(<span key={index}>{item.name}</span>)
            });
            if(this.props.Btns){

                Button =(<div className="botBtn">
                    {
                    this.props.Btns.map(function(item,index){
                        return (<button className={item.btnClass} name={item.callBackName} onClick={this.btnClick} key={index}>{item.btnName}</button>)
                    }.bind(this))
                    }
                </div>)
            }
        }
        else{
            var year = new Date().getFullYear();
            var yearOption=[];
            for(var i=0;i<5;i++){
                yearOption.push(<option value={year-i} key={i}>{year-i}</option>)
            }
            yearChosen=( <select ref="yearSelect" id="yearSelect" onChange={this.changeYear} value={this.props.year?this.props.year:''}>
                <option>试题年份</option>
                {yearOption}
            </select>)
            this.state.categroy.forEach(function(item,index){
                var ischecked=false;
                this.props.categroy.forEach(function(categroy){
                    if(categroy.value==item.value){
                        ischecked=true;
                    }
                });
                categroy.push(<span key={index}><input type="checkbox" checked={ischecked} name={item.name} value={item.value} onChange={this.changeCategroy} />{item.name}</span>)
            }.bind(this));
            if(this.props.Btns){

                Button =(<div className="botBtn">
                    {
                        this.props.Btns.map(function(item,index){
                            return (<button className={item.btnClass} name={item.callBackName} onClick={this.btnClick} key={index}>{item.btnName}</button>)
                        }.bind(this))
                    }
                </div>)
            }
        }

        if(this.props.urlParam =="myTestBank"){//如果是【我的题库】页面
            var topInformation;
            if(this.props.status=="UNSUBMIT"){
             topInformation=(<h1 className="topInformation">
                新上传
            </h1>);
            }else if(this.props.auditStatus=="DISAPPROVE"){
                topInformation=(<h1 className="topInformation">
                    未通过原因:{this.props.auditOpinion}
                </h1>);
            }else if(this.props.status=="SUBMITED"){
                if(this.props.auditStatus=="APPROVED"){
                    topInformation=(<h1 className="topInformation">
                        审核通过
                    </h1>);
                }else if(this.props.auditStatus=="REPEATDELETE"){
                    topInformation=(<h1 className="topInformation">
                        重复删除
                    </h1>);
                }else if(this.props.auditStatus=="PENDINGAUDIT"){
                    topInformation=(<h1 className="topInformation">
                        审核中
                    </h1>);
                }
            }
        }

        if(this.props.urlParam =="topicAudit"){//如果是【题库审核】页面
            var botInformation;
            if(this.props.auditStatus=="PENDINGAUDIT"){
                botInformation=(<section className="botInformation">
                    <p>
                        <span>
                            <label>录入人：</label>
                            {this.props.createUserName}
                        </span>
                        <span>
                            <label>录入时间：</label>
                            {this.props.createTime}
                        </span>
                    </p>
                </section>)
            }else if(this.props.auditStatus=="APPROVED"){
                botInformation=(<section className="botInformation">
                    <p>
                        <span>
                            <label>录入人：</label>
                            {this.props.createUserName}
                        </span>
                        <span>
                            <label>录入时间：</label>
                            {this.props.createTime}
                        </span>
                    </p>
                    <p>
                        <span>
                            <label>审核人：</label>
                            {this.props.auditUserName}
                        </span>
                        <span>
                            <label>审核时间：</label>
                            {this.props.auditTime}
                        </span>
                    </p>
                </section>)
            }
        }
        return(
            <div>

                <div className={viewClass}>
                    <header>
                        {topInformation}
                        <div className="difficulty">
                            <span>
                                难度:
                            </span>
                            <StarsChosen point={this.props.difficulty} isView={this.props.isView} starsNums={5} onChange={this.difficultyChange} />
                        </div>
                        {yearChosen}
                        <div className="categroy">
                            {categroy}
                        </div>
                        {viewDom}
                    </header>
                    <Topic topic={this.props.topic} errorInformation={this.props.errorInformation} isView={this.props.isView} questionType={this.props.questionType} types="TopicList"/>
                    {//答案：
                        this.props.questionType!=='SYNTHETICAL'?
                            <TopicAnswers
                                errorInformation={this.props.errorInformation}
                                {...this.props}
                                isView={this.props.isView} />:
                            <TopicAnswersSYNTHETICAL
                                errorInformation={this.props.errorInformation}
                                isView={this.props.isView}
                                questions={this.props.questions} />
                    }
                    {//解析：
                        this.props.questionType!=='SYNTHETICAL'?
                            <TopicAnalysis
                                {...this.props}
                                questionType={this.props.questionType}
                                isView={this.props.isView}
                                types="AnalysisList" />:''
                    }
                    <MajorKnowledge
                        majorKnowledge={this.props.majorKnowledge}
                        isView={this.props.isView}
                        errorInformation={this.props.errorInformation}
                        isSYNTHETICAL={this.props.questionType==='SYNTHETICAL'?true:false} />
                    <MinorKnowledge
                        minorKnowledge={this.props.minorKnowledge}
                        isView={this.props.isView}
                    />
                    <TopicSource {...this.props}  questionType={this.props.questionType} isView={this.props.isView} types="Source" />
                    {botInformation}
                    {Button}

                </div>
                {viewer}
            </div>
        )
    },
    changeYear:function(){
        TopicAddActions.changeYear(this.refs.yearSelect.value);
    },
    changeCategroy:function(event){
        var type=event.target.checked;
        var obj = {
            "name":event.target.name,
            "value":event.target.value
        }
        TopicAddActions.changeCategroy(type,obj);
    },
    difficultyChange:function(point){
        TopicAddActions.difficultyChange(point);
    },
    btnClick:function(evt){
        var callback = evt.target.name;
        var porpsCallBack = this.props[callback];
       if(porpsCallBack){
           porpsCallBack({
               "questionId":this.props.id,
               "questionType":this.props.questionType
           });
       }
    }

});
module.exports =TopicList ;

