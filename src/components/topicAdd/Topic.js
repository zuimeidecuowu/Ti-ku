var React = require('react');
var TopicAddActions= require('../../actions/TopicAddActions');
var ContentEditTable = require('./ContentEditTable');

var Topic = React.createClass({
    getInitialState:function(){
        return{notSYNTHETICAL:!this.props.SYNTHETICAL?true:false}
    },
    render:function(){
        var label;
        var errorInformation=this.props.errorInformation;
        var errorDom,errorClass='topic';
        if(errorInformation){
            errorInformation.forEach(function(item,index){
                if(item=='topic'){
                    errorClass='topic error';
                    errorDom=(<span className="errorDom" key={index}>请将题干或问题信息填写完整！</span>)
                }
            })
        }
        if(!this.props.SYNTHETICAL){
            label=(<label><em>*</em>题干：</label>);
        }else{
            label=(<label><em>*</em>问题{this.props.index}：</label>)
        }
        return(
            <section className={errorClass}>
                {label}
                <ContentEditTable isView={this.props.isView}  questionType={this.props.questionType} html={this.props.topic} sort={this.props.sort?this.props.sort:0} types={this.props.types} onChange={this.topicChange} />
                {errorDom}
            </section>
        )
    },
    topicChange:function(event){
        var html =event.target.value;
        TopicAddActions.topicChange(html,this.state.notSYNTHETICAL,this.props.sort);
    }
});

module.exports=Topic;