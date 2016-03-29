/**
 * Created by Administrator on 2015/12/26.
 */
var React = require('react');


var ContentEditTable= React.createClass({
    //getInitialState:function(){
    //  return {
    //      html:this.props.html
    //  }
    //},
    //componentWillReceiveProps:function(nextProps){
    //    this.setState({html:nextProps.html})
    //},
    //shouldComponentUpdate: function(nextProps){
    //    return nextProps.html !== this.refs["contentEditTable"+this.props.types+this.props.sort].innerHTML;
    //},
    componentDidMount:function(){
        var contentEditTable = this.refs["contentEditTable"+this.props.types+this.props.questionType+this.props.sort];
        contentEditTable.addEventListener("drop", function(e){
            e.stopPropagation();
            e.preventDefault();
        }, false);
    },
    _keypress:function(event){
        //var lKeyCode = (navigator.appname=="Netscape")?event.which:event.keyCode;
        //if(lKeyCode==13){
        //    var contentEditTable = this.refs["contentEditTable"+this.props.types+this.props.questionType+this.props.sort];
        //    _insertimg("<br/>",contentEditTable);
        //    this.emitChange();
        //}
    },
    render:function(){
        var updateImg;
        var ref = "contentEditTable"+this.props.types+this.props.questionType+this.props.sort;
        if(!this.props.isView && !this.props.noUpdateImg){
            updateImg =(<div className="updateImg"><a>插入图片</a><input name="imgFile" type="file" data-forwho={ref} onChange={this.uploadImg} ref="uploadImg"/></div>);
        }
        return(
            <form ref="uploadImgFrom">
            {updateImg}
            <div className="contentEditable"
                ref={ref}
                onMouseUp={this.conChange}
                onKeyDown={this._keypress}
                onBlur={this.emitChange}
                contentEditable={this.props.isView?false:true}
                dangerouslySetInnerHTML={{__html: this.props.html}}
                >
            </div>
        </form>
        )
    },
    uploadImg:function(event){
        var type = this.refs.uploadImg.value.split('.');
        var fileType = type[type.length-1].toLowerCase();
        var forWho = event.target.attributes['data-forwho'].value;
        var contentEditTable = this.refs[forWho];
        if(fileType == 'jpg' || fileType == 'png' || fileType == 'gif' || fileType == 'jpeg' ){
            var fd = new FormData(this.refs.uploadImgFrom);
            $.ajax({
                url:'textbookmg/uploadImage',
                type:'POST',
                data:fd,
                processData: false,  // 告诉jQuery不要去处理发送的数据
                contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
                success:function(data){
                    var str = '<img src='+data+' />';
                    _insertimg(str,contentEditTable);
                    this.emitChange();
                }.bind(this),
                error:function(){
                    bootbox.alert('上传图片失败');
                }

            })

        }else if(type[0] !=""){
            bootbox.alert('上传文件类型错误');
            return;
        }

    },
    emitChange:function(){
        var contentEditTable = this.refs["contentEditTable"+this.props.types+this.props.questionType+this.props.sort];
        var lastHtml = "contentEditTable"+this.props.types+this.props.questionType+this.props.sort+"_lastHtml";
        var html = contentEditTable.innerHTML;
        var regHtml;
        var reg = /<(?!img).*?>/g;
        regHtml=html.replace(reg,'');
        if(regHtml==="" || regHtml==="<br>"){
            html="";
        }
        if (this.props.onChange && html !== this[lastHtml]) {
            this.props.onChange({
                target: {
                    value: html,
                    sort:this.props.sort?this.props.sort:null
                }
            });
        }
        this[lastHtml] = html;
    }
});
module.exports= ContentEditTable;


//锁定编辑器中鼠标光标位置。。
function _insertimg(str,contentEditTable){
    contentEditTable.focus();
    var selection= window.getSelection ? window.getSelection() : document.selection;
    var range= selection.createRange ? selection.createRange() : selection.getRangeAt(0);
    if (!window.getSelection){

        var selection= window.getSelection ? window.getSelection() : document.selection;
        var range= selection.createRange ? selection.createRange() : selection.getRangeAt(0);
        range.pasteHTML(str);
        range.collapse(false);
        range.select();
    }else{
        range.collapse(false);
        var hasR = range.createContextualFragment(str);
        var hasR_lastChild = hasR.lastChild;
        while (hasR_lastChild && hasR_lastChild.nodeName.toLowerCase() == "br"
        && hasR_lastChild.previousSibling
        && hasR_lastChild.previousSibling.nodeName.toLowerCase() == "br") {
            var e = hasR_lastChild;
            hasR_lastChild = hasR_lastChild.previousSibling;
            hasR.removeChild(e)
        }
        range.insertNode(hasR);
        if (hasR_lastChild) {
            range.setEndAfter(hasR_lastChild);
            range.setStartAfter(hasR_lastChild)
        }
        selection.removeAllRanges();
        selection.addRange(range)
    }

}