/**
 * Created by Administrator on 2015/12/31.
 */
var React = require('react');
var TopicAddActions= require('../../actions/TopicAddActions');
var Knowledge = React.createClass({
    getInitialState:function(){
        "use strict";
        return{cognizeLevel:[],ability:[]}
    },
    componentWillReceiveProps:function(nextProps){
        if(this.props.testPoint || this.props.testPoint===null){
        var postData={
            phase:nextProps.phaseId,
            subject:nextProps.subjectId
        };
            $.ajax({
                url: 'textbookmg/findAbility',
                dataType : 'json',
                type : "POST",
                data : postData,
                success : function(data) {
                    this.setState({ability:data})
                }.bind(this)
            });
            $.ajax({
                url: 'textbookmg/findCognizeLevel',
                dataType : 'json',
                type : "POST",
                data : postData,
                success : function(data) {
                    this.setState({cognizeLevel:data})
                }.bind(this)
            });
        }
    },
    componentWillMount:function(){
        if(this.props.testPoint || this.props.testPoint===null) {
            var postData = {
                phase: this.props.phaseId,
                subject: this.props.subjectId
            };
            $.ajax({
                url: 'textbookmg/findAbility',
                dataType: 'json',
                type: "POST",
                data: postData,
                success: function (data) {
                    this.setState({ability: data})
                }.bind(this)
            });
            $.ajax({
                url: 'textbookmg/findCognizeLevel',
                dataType: 'json',
                type: "POST",
                data: postData,
                success: function (data) {
                    this.setState({cognizeLevel: data})
                }.bind(this)
            });
        }
    },
    render:function(){
        var selectList;
        var disabled = this.props.isView?'disabled':'';
        if(this.props.testPoint || this.props.testPoint===null){
            var button;
            if(this.props.buttonShow){
                button =(<button style={{display:this.props.isView?'none':'inline-block'}}  className="button red" onClick={this.removeKnowledge}>删除</button>);
            }
            selectList=(
                <p>
                        <label>{this.props.knowledgeName}</label>
                        <select disabled={disabled} name="cognizeLevelId" ref="acknowledge" onChange={this.updateCognizeLevel} value={this.props.cognizeLevelId || ""}>
                            <option value="">认知层次</option>
                            {
                                this.state.cognizeLevel.map(function(item,index){
                                    return <option value={item.id} key={index}>{item.name}</option>
                                })
                            }
                        </select>
                        <select disabled={disabled} name="abilityId" ref="ability" onChange={this.updateAbilityId} value={this.props.abilityId || ""}>
                            <option value="">能力体系</option>
                            {
                                this.state.ability.map(function(item,index){
                                    return <option value={item.id} key={index}>{item.name}</option>
                                })
                            }
                        </select>
                        {button}
                    </p>
            );
        }else{
            selectList=(
                <label className="itemKnowledge">{this.props.knowledgeName}<i style={{display:this.props.isView?'none':'block'}} className="icon-remove-sign"  onClick={this.removeKnowledge}></i></label>
            );
        }
        return(
            <div>
                {selectList}
            </div>
        )
    },
    removeKnowledge:function(){
        this.props.removeKnowledge(this.props.knowledgeId);
    },
    updateCognizeLevel:function(event){
        var id = event.target.value;
        var name = event.target.options[event.target.selectedIndex].innerHTML;
        TopicAddActions.updateCognizeLevel(this.props.knowledgeId,name,id);
    },
    updateAbilityId:function(event){
        var id = event.target.value;
        var name = event.target.options[event.target.selectedIndex].innerHTML;
        TopicAddActions.updateAbilityId(this.props.knowledgeId,name,id)
    }
});
module.exports = Knowledge;