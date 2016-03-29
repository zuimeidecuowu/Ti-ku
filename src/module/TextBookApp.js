var React = require('react');
var ReactDOM = require('react-dom');
var KnowledgeContainerViewer = require('./../containers/KnowledgeContainerViewer');
var TextBookActions = require('../actions/TextBookActions');
var SectionList = require('../components/textBook/SectionList');
var BasicForm = require('../components/textBook/basicInformation');
var BasicFormEdit = require('../components/textBook/BasicFormEdit');
var Header = require('../components/textBook/TextBookHeader');
var Reflux = require('reflux');
var store = require('./../stores/store');

var TextBookApp = React.createClass({
    mixins: [Reflux.connect(store, "data")],
    getInitialState:function(){

        return{show:false,type:types['type']}
    },
    componentWillMount:function(){
        TextBookActions.updateTextBookData();
    },
    showSection:function(val){
        if(val !=""){
            this.setState({show:true});

        }else{
            this.setState({show:false});
        }
    },
    changeType:function(type){
        this.setState({type:type});
    },
    deleteTextBook:function(){
        TextBookActions.deleteTextBook();
    },
    saveTextBook:function(){
        TextBookActions.saveTextBook();
    },
    cancelTextBook:function(){
        bootbox.confirm('你已经修改了内容确认取消吗？',function(result){
            if(result){
                if(this.state.data.textBookData.textbook.id !=""){
                    window.location.href="textbookChapter?id="+this.state.data.textBookData.textbook.id+"&type=view";
                }else{
                    window.location.href="textbookmg";
                }
            }
        }.bind(this));
    },
    render: function () {

        "use strict";
        var showAddView = this.state.data.addKnowledgeModal;

        var viewer;//知识点弹出层
        if (showAddView) {
            viewer = (<KnowledgeContainerViewer knowledgeData={this.state.data.knowledgeViewData}/>);
        }
        var section;//章节编辑
       if(this.state.show || this.state.type=='view' || this.state.type=='edit'){

            section=(<SectionList type={this.state.type} sectionData={this.state.data.textBookData.chapterSection} postData={this.state.data.textBookData.postData} />);
       }else{
           section=(<div className="SectionCon col-sm-12 no-padding">
                <h1 className="col-sm-1  no-margin no-padding">章节编辑</h1>
                <h1 className="col-sm-10  no-margin no-padding red">您必须完成上方的【基本信息】后才能进行【章节编辑】</h1>
           </div>)
       }
        var botBtn;//底部按钮
        if(this.state.type !='view'){
            botBtn=(<div className="botBtn">
                    <button onClick={this.deleteTextBook} className="button red">删除本教材</button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button onClick={this.saveTextBook} className="button">保存</button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button onClick={this.cancelTextBook} className="button purple">取消</button>
                </div>)
        }
        var information =this.state.data.textBookData.textbook;
        var informationForm;
        if(this.state.type=='view'){
            informationForm=(<BasicForm  {...information}  />)
        }else{
            informationForm=(<BasicFormEdit  {...information} showSection={this.showSection} errorInformation={this.state.data.errorInformation}  />)
        }
        return (

            <div className="col-sm-12">
                <Header type={this.state.type} textBookId={this.state.data.textBookData.textbook.id} status={this.state.data.textBookData.textbook.status} changeType={this.changeType} />
                {informationForm}
                {section}
                {viewer}
                {botBtn}
            </div>
        );
    }
});
ReactDOM.render(<TextBookApp />, document.getElementById('content'));
