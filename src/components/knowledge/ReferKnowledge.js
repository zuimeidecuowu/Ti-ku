var React = require('react');
var KnowledgeActions = require('../../actions/KnowledgeActions');
var LabelClose = require('./LabelClose');

var ReferKnowledge = React.createClass({

    _clickAction: function (id) {
        "use strict";
        this.props.closeAction(id);
    },

    _selectAction: function (id) {
        "use strict";
        if (this.props.selectAction != undefined) {
            this.props.selectAction(id);
        }
    },

    render: function () {
        "use strict";
        var description = this.props.description;
        var isView = this.props.isView;
        var refers = this.props.refers;
        var referNodes = [];

        if (refers)
            refers.forEach(function (item) {
                referNodes.push(<LabelClose key={item.id} isView={isView}
                                            selectAction={this._selectAction.bind(this,item.id)}
                                            closeAction={this._clickAction.bind(this,item.id)} id={item.id}
                                            name={item.name} key={item.id}/>);

                //referNodes.push(<li key={item.id} onClick={this._clickAction.bind(this,item.id)}><span  className="label">{item.name}</span></li>);
            }.bind(this));

        var addBtn;

        if (!isView) {
            addBtn = (<span onClick={this._addClickHandler} className="icon-plus"></span>);
        }

        return (
            <div className="knowledge-info-refer">
                <div>
                    <span>{description}</span>
                    {addBtn}
                </div>
                <ul className="knowledge-refers">
                    {referNodes}
                </ul>
            </div>
        );
    },
    _addClickHandler: function () {
        "use strict";
        KnowledgeActions.showKnowledgeViewerModal(this.props.refers, this.props.currentKnowledgeId, this.props.subjectId);
    }
});

module.exports = ReferKnowledge;