var React = require('react');
var TopicAddActions= require('../../actions/TopicAddActions');
var QuestionTypesModal = React.createClass({
    getInitialState:function(){
      return {
          isShow:this.props.SYNTHETICAL?true:false,
          typeName:'选择题',
          questionType:[]
      }
    },
    componentWillMount:function(){
        $.ajax({
            url: 'question/getAllQuestionType',
            dataType : 'json',
            type : "POST",
            success : function(data) {
                if(data.status=="ERROR") return;
                if(this.props.SYNTHETICAL){
                    var types=[];
                    data.bean.forEach(function(item){
                        if(item.value == this.props.SYNTHETICAL){
                            return;
                        }else{
                            types.push(item);
                        }
                    }.bind(this));
                    this.setState({questionType: types});
                }else{
                    this.setState({questionType: data.bean});
                }
            }.bind(this)
        })
    },
    render:function(){
        var questionType = this.props.questionType;
        var questionTypeArr = this.state.questionType;
        var TypesBtn=[];
        questionTypeArr.forEach(function(item,index){
            var className ='button';
                if(item.value== questionType){
                    className='button green'
                }
                TypesBtn.push(<button className={className} name={item.value} onClick={this.changeQuestionTypes} key={index}>
                    {item.name}
                </button>);

        }.bind(this));
        var header;
        if(!this.props.SYNTHETICAL){
            header =(
                <header>
                    <h1>题型模板选择：<button className="button" onClick={this.showQuestionTypes}>{this.state.typeName}</button></h1>
                </header>
            )
        }
        return(
            <div>
                {header}
                <div className={this.state.isShow?'QuestionTypesModal show':'QuestionTypesModal hide'}>
                    <div className="conModal">
                        {TypesBtn}
                        <br/>
                        <button className="button red"  onClick={this.hideQuestionTypes}>取&nbsp;消</button>
                    </div>
                </div>
            </div>
        )
    },
    showQuestionTypes:function(){
        this.setState({'isShow':true});
    },
    changeQuestionTypes:function(event){
        if(this.props.SYNTHETICAL){
            this.setState({'isShow':false});
            this.props.hideSYNTHETICAL();
            this.props.addSYNTHETICAL(event.target.name);
        }else{
            var questionType=event.target.innerHTML;
            this.setState({'typeName':questionType,'isShow':false});
            TopicAddActions.changeQuestionTypes(event.target.name);
        }
    },
    hideQuestionTypes:function(){
        this.setState({'isShow':false});
        if(this.props.SYNTHETICAL){
            this.props.hideSYNTHETICAL();
        }
    }

});

module.exports=QuestionTypesModal;
