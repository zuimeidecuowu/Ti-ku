/**
 * Created by Administrator on 2015/12/28.
 */
var React =require('react');
var TopicAnswers = require('./TopicAnswers');
var QuestionTypesModal = require('./QuestionTypesModal');
var TopicAddActions= require('../../actions/TopicAddActions');
var Topic = require('./Topic');
var TopicAnalysis = require('./TopicAnalysis');


var TopicAnswersSYNTHETICAL = React.createClass({
    getInitialState:function(){
        return{show:false}
    },
    render:function(){
        var nums=0;
        var SYNTHETICAL = "SYNTHETICAL";
        if(this.props.isView){
            SYNTHETICAL="SYNTHETICAL view"
        }
        return(
            <section className={SYNTHETICAL}>
                {
                    this.props.questions.map(function(item,index){

                        nums++;
                        return (
                            <div key={index}>
                                <Topic index={nums} {...item}  questionType={this.props.questionType} isView={this.props.isView} types="topicSYNTHETICAL" SYNTHETICAL={'SYNTHETICAL'} />
                                <TopicAnswers index={nums}  questionType={this.props.questionType}  {...item} isView={this.props.isView} SYNTHETICAL={'SYNTHETICAL'}  />
                                <TopicAnalysis index={nums}  questionType={this.props.questionType}  {...item} isView={this.props.isView} SYNTHETICAL={'SYNTHETICAL'}  types="AnalysisSYNTHETICAL" />
                                <i style={{display:this.props.isView?'none':'block'}}  onClick={this.removeItem} name={index} className="icon-remove-sign"></i>
                            </div>
                        )
                    }.bind(this))
                }
                <button className="button green" style={{display:this.props.isView?'none':'block'}} onClick={this.showSYNTHETICAL}>添加问题{nums+1}</button>
                {
                   this.state.show?<QuestionTypesModal SYNTHETICAL={'SYNTHETICAL'} hideSYNTHETICAL={this.hideSYNTHETICAL} addSYNTHETICAL={this.addSYNTHETICAL}/>:''
                }
            </section>
        )
    },
    hideSYNTHETICAL:function(){
        this.setState({show:false});
    },
    showSYNTHETICAL:function(){
        this.setState({show:true});
    },
    addSYNTHETICAL:function(type){
        var sort= 0;
        if(this.props.questions.length>0){
            sort= this.props.questions[this.props.questions.length-1].sort;
        }
        TopicAddActions.addSYNTHETICAL(type,++sort)
    },
    removeItem:function(evt){
        var index = evt.target.attributes.name.value;
        TopicAddActions.removeSYNTHETICALItem(index)
    }
});
module.exports= TopicAnswersSYNTHETICAL;