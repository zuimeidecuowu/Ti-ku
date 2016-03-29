/**
 * Created by Administrator on 2015/12/29.
 */
var React  = require('react');
var ContentEditTable = require('./ContentEditTable');
var TopicAddActions= require('../../actions/TopicAddActions');
var TopicAnalysis = React.createClass({
    getInitialState:function(){
        return{
            notSYNTHETICAL:!this.props.SYNTHETICAL?true:false
        }
    },
    render:function(){
        return(
            <section className="analysis">
                <label>解析{this.props.index?this.props.index:''}：</label>
                <ContentEditTable  isView={this.props.isView} html={this.props.analysis}  questionType={this.props.questionType}  sort={this.props.sort?this.props.sort:0}  types={this.props.types} onChange={this.analysisChange} />
            </section>
        )
    },
    analysisChange:function(event){
        var html =event.target.value;
        TopicAddActions.analysisChange(html,this.state.notSYNTHETICAL,this.props.sort)
    }
});
module.exports = TopicAnalysis;
