var React = require('react');
var KnowledgeTree = require('../components/knowledge/KnowledgeTree');
var KnowledgeForm = require('../components/knowledge/KnowledgeForm');
var KnowledgeInfo = require('../components/knowledge/KnowledgeInfo');

var KnowledgeActions = require('../actions/KnowledgeActions');

var KnowledgeContainerEditor = React.createClass({
    render: function () {
        "use strict";
        var knowledgeData = this.props.knowledgeData;
        var isEditing = knowledgeData.isEditing;

        var knowledge;
        if (isEditing) {
            knowledge = (<KnowledgeForm checkInfo={knowledgeData.checkInfo} currentPoint={knowledgeData.currentPoint}
                                        subject={knowledgeData.subject}
                                        phase={knowledgeData.phase}/>);
        } else {
            knowledge = (<KnowledgeInfo currentPoint={knowledgeData.currentPoint} isView={false}/>);
        }

        return (
            <div className="knowledge-container">
                <KnowledgeTree knowledgeData={knowledgeData} isView={false}/>
                {knowledge}
            </div>
        );
    },

    componentWillMount: function () {
        "use strict";
        if (this.props.knowledgeData.subject.length == 0 || this.props.knowledgeData.phase.length == 0) {
            console.log('KnowledgeContainerEditor');
            KnowledgeActions.loadSubjectPhase(this.props.knowledgeData);
        }
    }


});

module.exports = KnowledgeContainerEditor;