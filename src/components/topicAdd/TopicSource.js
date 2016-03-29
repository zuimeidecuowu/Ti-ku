/**
 * Created by Administrator on 2016/1/4.
 */
var React = require('react');
var TopicAddActions= require('../../actions/TopicAddActions');
var ContentEditTable = require('./ContentEditTable');
var flag=false;
var TopicSource = React.createClass({
    getInitialState:function(){
        return {source:this.props.source}
    },
    componentWillReceiveProps:function(nextProps){
        this.setState({source:nextProps.source});
    },
    render:function(){
        var disableStyle={'width':'70%'};
        if(this.props.isView){
            disableStyle={'background-color':'#fff !important','border':'none','width':'70%','color':'#555 !important'};
        }
        return(
            <section>
                <label>来源：</label>
                <textarea type="text" style={disableStyle}
                       disabled={this.props.isView}
                       onChange={this.changeSectionName}
                       onBlur={this.sourceChange}
                       value={this.state.source} >
                </textarea>
            </section>
        )
    },
    sourceChange:function(event){
        var html =event.target.value;
        TopicAddActions.sourceChange(html);
    },
    changeSectionName:function(event){
        "use strict";
        if(flag) return;
        if( event.target.value.length>500){
            flag = true;
            bootbox.alert('来源长度不能大于500字符！',function(){
                flag = false;
            });
        }else{
            this.setState({source : event.target.value});
        }
    }
});

module.exports=TopicSource;