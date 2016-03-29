/**
 * Created by Administrator on 2016/1/5.
 */
var React = require('react');
var classnames = require('classnames');

var KnowledgeTreeNode = React.createClass({
    render: function () {
        "use strict";
        var child;
        var knowledgePoint = this.props.knowledgePoint;
        var padding = parseInt(this.props.padding) + 1;

        var level = this.props.level;
        level++;

        if (knowledgePoint.expand) {
            var list = [];
            var subArrow;
            knowledgePoint.children.forEach(function (item,index) {
                var propsIndex =this.props.index+'.'+index;
                list.push(<KnowledgeTreeNode isPhases={false} padding={padding} level={level}
                                             knowledgePoint={item}
                                             index={propsIndex}
                                             expandCollapseTreeNode={this.props.expandCollapseTreeNode}
                                             key={index}/>);
            }.bind(this));
            child = (<ul className="react-tree-node-items">{list}</ul>);
            subArrow = (<span onClick={this.hideChildren} className={knowledgePoint.expand?"icon-angle-down":""}></span>);
        }
        return (
            <li className="react-tree-node">
                <div className='react-tree-node-title' onClick={this.expandCollapseAndSelect}>
                    <span style={{paddingLeft:padding*10}}></span>
                    <span title={knowledgePoint.name}>{knowledgePoint.name}</span>
                    {subArrow}
                </div>
                {child}
            </li>
        );
    },
    expandCollapseAndSelect: function (event,knowledgeObj,isPhases) {
        "use strict";
        $(".react-tree-node-title").removeClass('select');
        $(event.target).closest('div').addClass('select');
        if(!knowledgeObj.hasOwnProperty('myOwnPropery')){
            var knowledgeObj=this.props.knowledgePoint;
            var isPhases=this.props.isPhases;
             knowledgeObj.myOwnPropery=true;
            //for(var i in data){
            //    knowledgeObj[i]=data[i]
            //}
        }
        this.props.expandCollapseTreeNode(event,knowledgeObj, isPhases);
        event.preventDefault();
        event.stopPropagation();
    },
    hideChildren:function(evt){
        if( $(evt.target).hasClass('icon-angle-down')){
            $(evt.target).removeClass('icon-angle-down').addClass('icon-angle-up').closest('li').find('ul').css('display','none');
        }else{
            $(evt.target).removeClass('icon-angle-up').addClass('icon-angle-down').closest('li').find('ul').css('display','block');
        }
        evt.preventDefault();
        evt.stopPropagation();
    }
});

module.exports = KnowledgeTreeNode;