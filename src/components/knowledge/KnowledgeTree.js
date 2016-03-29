var React = require('react');
var KnowledgeTreeNode = require('./KnowledgeTreeNode');
var KnowledgeActions = require('../../actions/KnowledgeActions');
var classnames = require('classnames');

var KnowledgeTree = React.createClass({
    getInitialState: function () {
        "use strict";
        return {isSearch: false};
    },

    _subjectChangeHandler: function (evt) {
        "use strict";
        KnowledgeActions.subjectChanged(this.props.knowledgeData.baseTree, evt.target.value, this.props.isView);
    },

    _knowledgeSelect: function (item) {
        "use strict";
        KnowledgeActions.knowledgeSelect(item, this.props.isView);
    },

    render: function () {
        "use strict";
        var list = [], subjectList, subjectNode, searchResultList = [];

        var isView = this.props.isView;
        this.props.knowledgeData.baseTree.children.forEach(function (item,index) {
            list.push(<KnowledgeTreeNode padding="0" isView={isView} knowledgePoint={item} key={index}/>);
        });

        subjectList = [];
        this.props.knowledgeData.subject.forEach(function (item,index) {
            subjectList.push(<option value={item.id} key={index}>{item.name}</option>);
        });

        subjectNode = (<div><select className="form-control knowledge-tree-select" ref="subject_list"
                                    value={this.props.knowledgeData.subjectId}
                                    onChange={this._subjectChangeHandler}>{subjectList}</select></div>);

        this.props.knowledgeData.searchResult.forEach(function (item,index) {
            var select = classnames('', item.isSelect ? 'select' : '');
            searchResultList.push(<li onClick={this._knowledgeSelect.bind(this,item)} className={select}
                                      title={item.name} key={index}><span></span><span>{item.name}</span></li>);
        }.bind(this));

        return (
            <div className="knowledge-tree-container">
                {subjectNode}
                <div>
                    <div className="input-group">
                        <input type="text" className="form-control" ref="searchInput"
                               onKeypress={this._searchInputHandler} placeholder="请输入搜索内容"/>
                        <span className="input-group-btn">
                            <button className="button" type="button"
                                    onClick={this._searchClickHandler}><img src="./img/search-icon.png"/>
                            </button>
                        </span>
                    </div>
                </div>

                <ul className={this.state.isSearch?'knowledge-tree-base hide':'knowledge-tree-base'}>
                    {list}
                </ul>

                <ul className={this.state.isSearch?'search-result':'search-result hide'}>
                    {searchResultList}
                </ul>
            </div>
        );
    },

    _searchInputHandler: function (event) {
        "use strict";
        if (event.keyCode == 13) {
            this._searchClickHandler();
        }
    },

    _searchClickHandler: function () {
        "use strict";

        var isSearch = false;
        if (this.refs.searchInput.value.length > 0) {
            isSearch = true;
        }

        this.setState({
            isSearch: isSearch
        });

        if (isSearch) {
            KnowledgeActions.searchKnowledge(this.refs.searchInput.value, this.refs.subject_list.value, this.props.isView);
        }
    },
    componentWillMount: function () {
        "use strict";
        KnowledgeActions.subjectChanged(this.props.knowledgeData.baseTree, this.props.knowledgeData.subjectId, this.props.isView);
    }
});

module.exports = KnowledgeTree;