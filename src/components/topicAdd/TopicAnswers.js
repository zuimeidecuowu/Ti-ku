/**
 * Created by Administrator on 2015/12/28.
 */
var React = require('react');
var TopicAddActions= require('../../actions/TopicAddActions');
var ContentEditTable = require('./ContentEditTable');


var TopicAnswers = React.createClass({
    getInitialState:function(){
      return{
          notSYNTHETICAL:!this.props.SYNTHETICAL?true:false
       }
    },
    propTypes:{
        questionType:React.PropTypes.string.isRequired
    },
    render:function(){
        var disabled = this.props.isView;
        var questionType =this.props.SYNTHETICAL? this.props.questionType+'_SYNTHETICAL':this.props.questionType;
        var answerCon;
        var errorInformation=this.props.errorInformation;
        var errorDom,errorClass='answers';
        if(errorInformation){
            errorInformation.forEach(function(item,index){
                if(item=='answer' || item =='answerNoCon'){
                    errorClass='answers error';
                    errorDom=(<span className="errorDom" key={index}>请将答案信息填写完整！</span>)
                }
            })
        }
        switch (this.props.questionType){
            case 'CHOICE': //选择题
                var arrCHOICE=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
                var rightAnswer='answerCon';
                answerCon=(
                    <div>
                        <label><em>*</em>答案{this.props.index?this.props.index:""}:</label>
                        {
                            this.props.answers.map(function(item,index){
                                var removeButton;
                                if(item.isTrue){
                                    rightAnswer='answerCon rightAnswer';
                                }else{
                                    rightAnswer='answerCon';
                                }
                                if(index>0 && !this.props.isView){
                                     removeButton = (<button className="button red small" data-index={index} onClick={this.removeAnswer}>删除</button>);
                                }
                                return (
                                    <div className={rightAnswer} key={index}>
                                        <label className="answerLabel">
                                            <input type="checkbox" disabled={disabled} onChange={this.answerChangeCHOICE} data-sort={index+1} checked={item.isTrue} />
                                            <b>{arrCHOICE[index]}</b>
                                        </label>
                                        <ContentEditTable isView={this.props.isView}
                                                          questionType={this.props.questionType}
                                                          html={item.answer}
                                                          onChange={this.answerChange}
                                                          types={questionType+'_'+index}
                                                          sort={item.sort?item.sort:index+1} />
                                        {removeButton}

                                    </div>
                                )
                            }.bind(this))
                        }

                        <button className="addAnswer button green" style={{display:this.props.isView?'none':'block'}}  onClick={this.addAnswer}>添加答案</button>
                        {errorDom}
                    </div>
                );
                break;
            case 'FILLING': //填空题
                answerCon=(
                    <div>
                    {
                        this.props.answers.map(function(item,index){
                            var removeButton;
                            if(index>0 && !this.props.isView){
                                removeButton = (<button  className="button red small" data-index={index} onClick={this.removeAnswer}>删除</button>);
                            }
                            return(
                                <div key={index}>
                                    <label><em>*</em>答案{this.props.index?this.props.index+'.'+(index+1):index+1}:</label>
                                    <div className="answerCon noLabel">
                                        <ContentEditTable isView={this.props.isView}
                                                          questionType={this.props.questionType}
                                                          html={item.answer}
                                                          onChange={this.answerChange}
                                                          types={questionType+'_'+index}
                                                          sort={item.sort?item.sort:index+1} />
                                        {removeButton}
                                    </div>

                                </div>
                            )
                        }.bind(this))
                    }
                        <button className="addAnswer button green" style={{display:this.props.isView?'none':'block'}}  onClick={this.addAnswer}>添加答案</button>
                        {errorDom}
                    </div>
                );
                break;
            case 'JUDGE': //判断题
                var index = this.props.index == undefined?'':this.props.index;
                var radioName =this.props.id?this.props.id+'topicJUDGE'+index:'topicJUDGE'+index;
                var isChecked;
                if(this.props.isTrue === "true" || this.props.isTrue === true){
                     isChecked = true;
                }else{
                     isChecked = false;
                 }
                answerCon=(
                    <div>
                        <label><em>*</em>答案{this.props.index?this.props.index:""}:</label>
                        <div className="answerCon noLabel">
                            <label><input  disabled={disabled} type="radio" name={radioName} value="1" onChange={this.changeJUDGE} checked={isChecked} />正确</label>
                            <label><input  disabled={disabled} type="radio" name={radioName} value="0" onChange={this.changeJUDGE} checked={!isChecked} />错误</label>
                        </div>
                    </div>
                );
                break;
            case 'SHORTANSWER': //简答题
                 answerCon=(
                    <div>
                        <label><em>*</em>答案{this.props.index?this.props.index:""}:</label>
                        <div className="answerCon noLabel">
                            <ContentEditTable isView={this.props.isView}  questionType={this.props.questionType} html={this.props.answer} onChange={this.answerChange} types={questionType} sort={1} />
                        </div>
                        {errorDom}
                    </div>
                );
                break;
        }
        return(
            <section className={errorClass}>{answerCon}</section>
        )
    },
    answerChange:function(event){//更改答案
        var html =event.target.value;
        var sort =event.target.sort;
        TopicAddActions.answerChange(html,sort,this.state.notSYNTHETICAL,this.props.sort);
    },
    answerChangeCHOICE:function(event){//更改选择题选项是否为正确的
        var checked = event.target.checked;
        var sort =event.target.attributes['data-sort'].value;
        TopicAddActions.answerChangeCHOICE(checked,sort,this.state.notSYNTHETICAL,this.props.sort);
    },
    removeAnswer:function(event){//删除答案
        var index =event.target.attributes['data-index'].value;
        TopicAddActions.removeAnswer(index,this.state.notSYNTHETICAL,this.props.sort);
    },
    addAnswer:function(){//添加答案
        TopicAddActions.addAnswer(this.props.questionType,this.state.notSYNTHETICAL,this.props.sort);
    },
    changeJUDGE:function(event){//更改判断题
        var flag = Number(event.target.value)?true:false;
        TopicAddActions.changeJUDGE(flag,this.state.notSYNTHETICAL,this.props.sort)
    }
});
module.exports= TopicAnswers;