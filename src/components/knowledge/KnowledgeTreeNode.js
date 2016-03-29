var React = require('react');
var KnowledgeActions = require('../../actions/KnowledgeActions');
var classnames = require('classnames');

var KnowledgeTreeNode = React.createClass({
    render: function () {
        "use strict";
        var child;
        var knowledgePoint = this.props.knowledgePoint;
        var isView = this.props.isView;
        var padding = parseInt(this.props.padding) + 1;

        var level = this.props.level;
        level++;

        if (knowledgePoint.expand) {
            var list = [];
            knowledgePoint.children.forEach(function (item) {
                list.push(<KnowledgeTreeNode padding={padding} level={level} isView={isView} level={0}
                                             knowledgePoint={item}
                                             key={item.id}/>);
            });
            child = (<ul className="react-tree-node-items">{list}</ul>);
        }

        var subArrow;
        if (knowledgePoint.hasChild) {
            subArrow = (<span className={knowledgePoint.expand?"icon-angle-down":""}></span>);
        }

        var treeNodeTitle = 'react-tree-node-title';
        var isSelect = knowledgePoint.isSelect;
        var treeNodeClassName = classnames(treeNodeTitle, isSelect ? 'select' : '');
        return (
            <li className="react-tree-node">
                <div className={treeNodeClassName} onClick={this._expandCollapseAndSelect}>
                    <span style={{paddingLeft:padding*10}}></span>
                    <span title={knowledgePoint.name}>{knowledgePoint.name}</span>
                    {subArrow}
                </div>
                {child}
            </li>
        );
    },
    _expandCollapseAndSelect: function (event) {
        "use strict";
        KnowledgeActions.expandCollapseTreeNode(this.props.knowledgePoint, false, this.props.isView);
        event.preventDefault();
        event.stopPropagation();
    }
});

module.exports = KnowledgeTreeNode;