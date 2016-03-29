var React = require('react');
var ReactDOM = require('react-dom');
var storeSearch= require('./../stores/storeSearch');
var KnowledgeTree = require('./../components/topicSearch/KnowledgeTree');
var TextBookList = require('./../components/topicSearch/TextBookList');
var TextBookTree = require('./../components/topicSearch/TextBookTree');
var Reflux = require('reflux');
var TopicSearchActions = require('../actions/TopicSearchActions');
var TopicList =require('../components/topicAdd/TopicList');
var PagePlugIn =require('../components/page/PagePlugIn');

var TopicSearchApp=React.createClass({
    mixins: [Reflux.connect(storeSearch, "data")],
    getInitialState:function(){
        return{
                searchType:'knowledge',
                showTextBookList:false,
                questionTypeList:[]
        }
    },
    componentDidMount:function(){
        $.ajax({
            url: 'question/getAllQuestionType',
            dataType : 'json',
            type : "POST",
            success : function(data) {
                if(data.status=="OK"){
                    this.setState({questionTypeList: data.bean});
                }
            }.bind(this)
        });

    },
    render:function(){

        var textBookList;
        var treeList;

        var pagePlug;
        if(this.state.showTextBookList ){
            textBookList=(<TextBookList onChange={this.chosenTextBookId} />)
        }
        if(this.state.searchType =='knowledge'){
            treeList= <KnowledgeTree onChange={this.knowledgeChange} />
        }else if(this.state.searchType =='textbook'){
            treeList= <TextBookTree textBookId={this.state.data.textBookId}  hasVersions={true} onChange={this.textBookChange}/>
        }
        if(this.state.data.topicDataList.length){
            pagePlug =(<PagePlugIn total={this.state.data.topicTotal}
                                   onChange={this.pagePlugChange} />);
        }
        return(
            <div>
                <div className="col-sm-12 textBookHeader no-padding-left no-padding-right">
                    <div className="col-sm-6  no-padding-left">
                        <button onClick={this.goToAdd} className="button">新增题目</button>
                    </div>
                    <div className="col-sm-6 text-right no-padding-right" >
                        <button className="button">上传试题</button>
                    </div>
                </div>
                <hr/>
                <div className="col-sm-12 textBookHeader no-padding-left no-padding-right">
                    <div className="space-6"></div>
                    <button onClick={this.searchTypeChange} name="knowledge" className="btn btn-xs btn-danger">
                        按知识点查询
                    </button>
                    <button onClick={this.showTextBookList} name="textbook" className="btn btn-xs btn-white">
                        按教材查询
                    </button>
                </div>
                <hr/>
                <div className="col-sm-12 no-padding-left no-padding-right">
                    <div className="space-6"></div>
                    <div className="knowledge-container">
                        {treeList}
                        <div className="topicList">
                            <header>

                                <select onChange={this.questionTypeChange} id="topicSelect">
                                    {
                                        this.state.questionTypeList.map(function(item,index){
                                          return(
                                              <option value={item.value} key={index}>{item.name}</option>
                                          )
                                        })
                                    }
                                </select>
                                <span id="topicNums" className="right">
                                    共计{this.state.data.topicTotal}道题
                                </span>
                            </header>
                            <arction id="topicCon">
                                {
                                    this.state.data.topicDataList.map(function(item,index){
                                        return(<TopicList {...item} isView={true} key={index} />)
                                    })
                                }

                            </arction>
                            {pagePlug}
                        </div>
                    </div>

                </div>
                {textBookList}

            </div>

        )
    },
    searchTypeChange:function(evt) {
        var type = evt.target.name;
        $(evt.target).addClass('btn-danger').removeClass('btn-white').siblings('button').addClass('btn-white').removeClass('btn-danger');
        this.setState({searchType: type})
    },
    showTextBookList:function(){
        this.setState({showTextBookList: true});

    },
    knowledgeChange:function(knowledgeObj){
        TopicSearchActions.knowledgeChange(knowledgeObj);
    },
    textBookChange:function(textBookObj){
        TopicSearchActions.textBookChange(textBookObj);
    },
    questionTypeChange:function(evt){
        TopicSearchActions.questionTypeChange(evt.target.value);
    },
    chosenTextBookId:function(textBookId){
        if(!textBookId){
            this.setState({showTextBookList:false})
            return;
        }
        TopicSearchActions.chosenTextBookId(textBookId);
        $("button[name=textbook]").addClass('btn-danger').removeClass('btn-white').siblings('button').addClass('btn-white').removeClass('btn-danger');
        this.setState({showTextBookList:false,searchType:'textbook'});

    },
    pagePlugChange:function(pageObj){
        TopicSearchActions.pagePlugChange(pageObj);
    },
    goToAdd:function(){
        window.location.href="topicAdd"
    }
});
ReactDOM.render(<TopicSearchApp />,document.getElementById('topicSearch'));