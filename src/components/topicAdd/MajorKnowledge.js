/**
 * Created by Administrator on 2015/12/29.
 */
var React = require('React');
var Knowledge = require('./Knowledge');
var TopicAddActions= require('../../actions/TopicAddActions');
var MajorKnowledge =React.createClass({

    render:function(){
        var button;
        var errorInformation=this.props.errorInformation;
        var errorDom,errorClass='majorKnowledge';
        var konwledge;
        if(errorInformation){
            errorInformation.forEach(function(item,index){
                if(item=='majorKnowledge'){
                    errorClass='majorKnowledge error';
                    errorDom=(<span className="errorDom" key={index}>请将知识点信息填写完整！</span>)
                }
            })
        }
        if(this.props.isSYNTHETICAL){
            konwledge=[];

            this.props.majorKnowledge.forEach(function(item,index){
                konwledge.push(
                    <Knowledge removeKnowledge={this.removeKnowledge}
                               buttonShow = {index}
                               isView={this.props.isView}
                               {...item}
                               key={index} />
                )
            }.bind(this));
            button=(<button className="button green"  style={{display:this.props.isView?'none':'block'}}  onClick={this.addMajorKnowledge}>添加主要知识点</button>);
        }else{
            if(this.props.majorKnowledge.knowledgeId){
                konwledge=(<Knowledge isView={this.props.isView}
                                          buttonShow = {0}
                                          {...this.props.majorKnowledge} />
                );
                button=(<button className="button purple" style={{display:this.props.isView?'none':'block'}} onClick={this.addMajorKnowledge}>更换当前知识点</button>)
            }else{
                button=(<button className="button green" style={{display:this.props.isView?'none':'block'}}  onClick={this.addMajorKnowledge}>添加主要知识点</button>);
            }
        }
        return(
            <section className={errorClass}>
                <label><em>*</em>主要知识点:</label>
                {konwledge}
                {button}
                {errorDom}
            </section>
        )
    },
    addMajorKnowledge:function(){
        TopicAddActions.addMajorKnowledge(this.props.majorKnowledge);
    },
    removeKnowledge:function(id){
        TopicAddActions.removeMajorKnowledge(id)
    }
});
module.exports= MajorKnowledge;
