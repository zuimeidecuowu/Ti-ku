var React = require('react');
var KnowledgeTree = require('../components/knowledge/KnowledgeTree');
var KnowledgeInfo = require('../components/knowledge/KnowledgeInfo');

var KnowledgeActions = require('../actions/KnowledgeActions');
var LabelClose = require('../components/knowledge/LabelClose');

var KnowledgeContainerViewer = React.createClass({
    render: function () {
        "use strict";
        var knowledgeData = this.props.knowledgeData;
        var isJustView = knowledgeData.isJustView;
        var hasAdd = knowledgeData.hasAdd;

        var selectNode;
        var leftTree;

        if (!isJustView) {

            if(Array.isArray(knowledgeData.selectedKnowledge)) {
                var selectedKnowledges = [];
                knowledgeData.selectedKnowledge.forEach(function (item,index) {
                    selectedKnowledges.push(<LabelClose closeAction={this._removeSelectKnoledge}
                                                        id={item.knowledgeId}
                                                        name={item.knowledgeName}
                                                        key={index}/>);
                }.bind(this));
            }else{
                var selectedKnowledges ;
                if(knowledgeData.selectedKnowledge.knowledgeId){
                    selectedKnowledges=(<LabelClose closeAction={this._removeSelectKnoledge}
                                                    firstNoDel={true}
                                                    id={knowledgeData.selectedKnowledge.knowledgeId}
                                                    name={knowledgeData.selectedKnowledge.knowledgeName}
                                                  />);
                }
            }
            selectNode = (<div>
                <span>已添加知识点</span>
                {selectedKnowledges}
            </div>);

            leftTree = <KnowledgeTree knowledgeData={knowledgeData} isView={true}/>;
        }

        var info = '添加知识点';
        if (this.props.knowledgeData.isJustView) {
            info = '查看知识点';
        }

        var hadTestPoint=[];//已选择的知识点对应的考点
        var selectedKonwledge = knowledgeData.selectedKnowledge;
        if(Array.isArray(selectedKonwledge)){
            selectedKonwledge.forEach(function(item){
                hadTestPoint=hadTestPoint.concat(item.testPoint) ;
            })
        }else{
            hadTestPoint = selectedKonwledge.testPoint?selectedKonwledge.testPoint:[];
        }
        return (
            <div className="modal fade in" style={{display:"block",background:"rgba(0, 0, 0, 0.38)"}}>
                <div className="modal-dialog" style={{width:"auto",padding:"150px"}}>
                    <div className="modal-content">
                        <div className="modal-body knowledge-container">
                            <div className="modal-header">
                                <span>{info}</span>
                                <span onClick={this._closeHandler} className="modal-header-close icon-remove"></span>
                            </div>
                            {selectNode}
                            <div className="modal-body">
                                {leftTree}
                                <KnowledgeInfo limitId={knowledgeData.limitId} hasAdd={hasAdd}
                                               currentPoint={knowledgeData.currentPoint}

                                               isView={true}
                                               chosenExam={knowledgeData.chosenExam}
                                               hadTestPoint={hadTestPoint}
                                               testPoint = {knowledgeData.testPoint}
                                               isJustView={isJustView}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
    componentWillMount: function () {
        "use strict";
        //加载么
        if ((this.props.knowledgeData.subject.length == 0 || this.props.knowledgeData.phase.length == 0) && !this.props.knowledgeData.isJustView) {
            //load subject and phase
            KnowledgeActions.loadSubjectPhase(this.props.knowledgeData);
        }
    },

    _closeHandler: function () {
        "use strict";
        KnowledgeActions.hideKnowledgeViewerModal();
    },
    _removeSelectKnoledge: function (id) {
        "use strict";
        KnowledgeActions.delReferKnowledge(id);
    }
});

module.exports = KnowledgeContainerViewer;
