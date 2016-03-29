/**
 * Created by Administrator on 2016/1/6.
 */
var React = require('react');
var TextBookTreeNode = require('./TextBookTreeNode');
var TextBookTree = React.createClass({
    getInitialState:function(){
        return{textBookTree:{chapterSectionVos:[]}}
    },
    componentWillReceiveProps:function(nextProps){
      //  if(this.props.textBookId == nextProps.textBookId) return;
        var dataObj={
            id:nextProps.textBookId
        };
        $.ajax({
            url:'question/getTextbookById',
            dataType:'json',
            type:'post',
            data:dataObj,
            success:function(data){
                this.setState({textBookTree:data})
            }.bind(this)
        })
    },
    render:function(){
        var list=[];
        var textBookTreeObj= this.state.textBookTree;
        if(textBookTreeObj){
            textBookTreeObj['chapterSectionVos'].forEach(function(item,index){
                var isChecked = false;
                if(this.props.treeList){
                    this.props.treeList.forEach(function(node){
                       if( node.chapterSectionId == item.id){
                            isChecked = true;
                            return;
                       }
                    })
                }
                list.push(<TextBookTreeNode textBookTree={item}
                                            multiple={this.props.multiple}
                                            treeList={this.props.treeList}
                                            isChecked={isChecked}
                                            textBookTreeClick={this.textBookTreeClick}
                                            key={index} />)
            }.bind(this));
            if(this.props.hasVersions){
                var date = new Date(textBookTreeObj['publishTime']);
                var year =date?date.getFullYear()+'年'+(date.getMonth()+1)+'月':'';
                var textbookVersions;
                textbookVersions=(<div className="textbookVersions">
                    <span>{textBookTreeObj.subjectName}</span>
                    <span>{textBookTreeObj.textbookVersionName}</span>
                    <span>{textBookTreeObj.gradeName}</span>
                    <span>{textBookTreeObj.fasciculeName}</span>
                    <span>{year}出版</span>
                </div>);
            }
        }
        return(
            <div>
                {textbookVersions}
                <div className="textBookTree">
                    <ul>
                        {list}
                    </ul>
                </div>
            </div>
        )
    },
    textBookTreeClick:function(evt,textBookObj){
        if(this.props.onChange){
            this.props.onChange(textBookObj)
        }
    }
});
module.exports=TextBookTree;
