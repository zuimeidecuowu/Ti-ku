var React = require('react');
var TextBookActions = require('../../actions/TextBookActions');
var Header = React.createClass({
    render:function(){
        var content;
        if(this.props.type!='view'){
            var name;
            if(this.props.status){
                name="禁用本教材";
            }else{
                name="启用本教材";
            }
            content=(<div className="col-sm-12 no-margin no-padding">
                <div className="col-sm-6 text-left no-margin-left no-padding">
                    <a className="button" onClick={this.changeTypeToView}>退出编辑模式</a>
                </div>
                <div className="col-sm-6 text-right  no-margin-right no-padding">
                    <a onClick={this.changeStates} className="button green">{name}</a>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <a  onClick={this.saveTextBook} className="button">保存</a>
                </div>
            </div>)
        }else{
            content=(<div className="col-sm-12 no-margin no-padding">
                <div className="col-sm-6 text-left no-padding no-margin">
                    <a onClick={this.goBackToList}  className="button">返回列表</a>
                </div>
                <div className="col-sm-6 text-right no-padding no-margin">
                    <a  className="button  " onClick={this.changeTypeToEdit}>进入编辑模式</a>
                </div>
            </div>)
        }
        return(
            <div className="textBookHeader">
                {content}
            </div>
        )
    },
    changeTypeToEdit:function(){
        this.props.changeType('edit');
    },
    changeTypeToView:function(){
        if(this.props.textBookId !=""){
            window.location.href="textbookChapter?id="+this.props.textBookId+"&type=view";
        }else{
            window.location.href="textbookmg"
        }
    },
    changeStates:function(){
        TextBookActions.changeStates(!this.props.status);
    },
    goBackToList:function(){
        window.location.href="textbookmg"
    },
    saveTextBook:function(){
        TextBookActions.saveTextBook();
    }
});
module.exports = Header;
