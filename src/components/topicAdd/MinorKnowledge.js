/**
 * Created by Administrator on 2015/12/29.
 */
var React = require('React');
var Knowledge = require('./Knowledge');
var TopicAddActions= require('../../actions/TopicAddActions');
var MinorKnowledge =React.createClass({

    render:function(){
        var konwledge=[];
        this.props.minorKnowledge.forEach(function(item,index){
            konwledge.push(<Knowledge removeKnowledge={this.removeKnowledge}
                                      isView={this.props.isView}
                                      {...item}
                                      key={index}/>
            )
        }.bind(this));
        return(
            <section className="minorKnowledge">
                <label>次要知识点:</label>
                {konwledge}
                <button className="button green"  style={{display:this.props.isView?'none':'block'}}  onClick={this.addMinorKnowledge}>添加次要知识点</button>
            </section>
        )
    },
    addMinorKnowledge:function(){
        TopicAddActions.addMinorKnowledge(this.props.minorKnowledge);
    },
    removeKnowledge:function(id){
        TopicAddActions.removeMinorKnowledge(id)
    }
});
module.exports= MinorKnowledge;
