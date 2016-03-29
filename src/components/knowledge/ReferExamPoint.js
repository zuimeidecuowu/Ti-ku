var React = require('react');
var KnowledgeActions = require('../../actions/KnowledgeActions');

var ReferExamPoint = React.createClass({

    getInitialState: function () {
        "use strict";
        return {
            description: this.props.refer.description,
            name: this.props.refer.name
        };
    },

    _changeName: function (evt) {
        var text = evt.target.value;
        if (evt.target.value.length > 200) {
            bootbox.alert('考点名称限定字数200个字');
            text = text.substring(0, 200);
        }

        "use strict";
        this.setState({
            name: text
        });
    },

    _changeDescription: function (evt) {
        "use strict";
        var text = evt.target.value;
        if (evt.target.value.length > 500) {
            bootbox.alert('考点描述限定字数500个字');
            text = text.substring(0, 500);
        }

        this.setState({
            description: text
        });
    },

    _saveRefer: function () {
        "use strict";
        KnowledgeActions.saveReferExamPoint(this.props.refer, {
            name: this.state.name,
            description: this.state.description
        });
    },
    _deleteRefer: function () {
        "use strict";
        KnowledgeActions.delReferExamPoint(this.props.refer);
    },

    render: function () {
        "use strict";
        var refer = this.props.refer;
        var isView = this.props.isView;
        var index = this.props.index;

        var description, name, close;

        //是否让考点可以勾选
        var chosenExam,isChecked=false;
        if(this.props.chosenExam){
            this.props.hadTestPoint.forEach(function(item){
                if(item==this.props.refer.id){
                    isChecked=true;
                    return;
                }
            }.bind(this));
            this.props.testPoint.forEach(function(item){
                if(item==this.props.refer.id){
                    isChecked=true;
                    return;
                }
            }.bind(this));
            chosenExam = (<input type="checkbox" name={this.props.refer.id} checked={isChecked} onChange={this.addTestPoint}/>);
        }


        if (isView) {
            description = (<span>{refer.description}</span>);
            name = (<span>{refer.name}</span>);
        } else {
            close = (<span onClick={this._deleteRefer} className="icon-remove"></span>);
            description = (<textarea className="form-control" value={this.state.description}
                                     onBlur={this._saveRefer}
                                     onChange={this._changeDescription}></textarea>);
            name = (<textarea className="form-control" value={this.state.name} onBlur={this._saveRefer}
                              onChange={this._changeName}></textarea>);
        }

        return (
            <div className="knowledge-refer-exam-item">
                <div className="exam-item-header">
                    {close}
                </div>
                <div>
                    <span className="exam-item-left">{chosenExam}考点{index}:</span>
                    <div className="exam-item-right">
                        {name}
                    </div>
                </div>
                <div>
                    <span className="exam-item-left">说明:</span>
                    <div className="exam-item-right">
                        {description}
                    </div>
                </div>
            </div>
        );
    },
    addTestPoint:function(event){
        var examPoint = event.target.name;
        var checked = event.target.checked;
        var knowledgeId = this.props.refer.knowledgeId;
        KnowledgeActions.addTestPoint(checked,examPoint,knowledgeId);

    }
});

module.exports = ReferExamPoint;