var React = require('react');
var ReactDOM = require('react-dom');
var store= require('./../stores/storeTopic');
var Reflux = require('reflux');
var TopicAddActions= require('../actions/TopicAddActions');

var QuestionTypesModal = require('../components/topicAdd/QuestionTypesModal')
var TopicList =require('../components/topicAdd/TopicList')


var TopicAddApp = React.createClass({
    mixins: [Reflux.connect(store, "data")],
    getInitialState:function(){

    },
    render:function(){
        var Btns=[
            {
                btnName:'取消',
                btnClass:'button',
                callBackName:'cancelTopic'
            },
            {
                btnName:'提交',
                btnClass:'button green',
                callBackName:'saveTopic'
            }
        ];
        var topicdata = this.state.data.topicData;
        return(
            <div className="">

                <QuestionTypesModal  questionType={this.state.data.topicData.questionType} />
                <TopicList Btns={Btns}
                    {...topicdata}
                    errorInformation={this.state.data.errorInformation}
                    cancelTopic={this.cancelTopic}
                    saveTopic={this.saveTopic}
                    isView={false}
                    {...this.state.data}/>
            </div>
        )
    },
    cancelTopic:function(){
      bootbox.confirm('您确定要取消吗？',function (result) {
          if(result){
              window.location.href="topicSearch";
          }
      })
    },
    saveTopic:function(){
        TopicAddActions.saveTopic();
    }

});
ReactDOM.render(<TopicAddApp />, document.getElementById('topicAdd'));

