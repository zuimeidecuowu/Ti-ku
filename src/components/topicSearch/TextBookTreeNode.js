/**
 * Created by Administrator on 2016/1/6.
 */
var React = require('react');

var TextBookTreeNode = React.createClass({
    getInitialState:function(){
      return {isChecked:this.props.isChecked}
    },
    componentWillReceiveProps:function(nextProps){
        this.setState({isChecked:nextProps.isChecked});
    },
    render:function(){
        var children=this.props.textBookTree.children;
        var childList,checkBox;
        var hasCheckedBox;
        if(this.props.multiple){
            hasCheckedBox="hasCheckedBox";
        }
        if(children.length>0){
            var list=[];
            children.forEach(function(item,index){
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
                                            isChecked={isChecked}
                                            treeList={this.props.treeList}
                                            textBookTreeClick={this.textBookTreeClick}
                                            key={index} />)
            }.bind(this));
            childList = (<ul className="childrenUl">{list}</ul>);
        }
        if(this.props.multiple){
            checkBox=(<input type="checkbox" checked={this.state.isChecked} onChange={this.inputChange} />)
        }
        return(
            <li className={hasCheckedBox}>
                {checkBox}
                <div className='treeNode' onClick={this.props.multiple?this.returnNUll:this.textBookTreeClick}>
                    <span>{this.props.textBookTree.name}</span>
                </div>
                {childList}
            </li>
        )
    },
    returnNUll:function(){
      return;
    },
    inputChange:function(evt,textBookObj){
        this.setState({isChecked: evt.target.checked});
        if(textBookObj == undefined){
            var data=this.props.textBookTree;
            var textBookObj={
                myOwnPropery:true,
                id:data.id,
                hasChildren:data.children.length>0?true:false,
                hasKnowledge: data.knowledge.length>0?true:false,
                name:data.name,
                sort:data.sort,
                specialType:data.specialType,
                flag:evt.target.checked
            };
        }
        this.props.textBookTreeClick(evt,textBookObj);
    },
    textBookTreeClick:function(evt,textBookObj){
        $(".textBookTree .treeNode").removeClass('select');
        $(evt.target).closest('.treeNode').addClass('select');
        if(!textBookObj.hasOwnProperty("myOwnPropery")){
            var data=this.props.textBookTree;
            var textBookObj={
                myOwnPropery:true,
                id:data.id,
                hasChildren:data.children.length>0?true:false,
                hasKnowledge: data.knowledge.length>0?true:false,
                name:data.name,
                sort:data.sort,
                specialType:data.specialType
            };
        }
        this.props.textBookTreeClick(evt,textBookObj);
    }
});
module.exports=TextBookTreeNode;