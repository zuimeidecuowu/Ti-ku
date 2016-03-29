var React = require('react');
var ReferKnowledge = require('./ReferKnowledge');
var ReferExamPoint = require('./ReferExamPoint');
var KnowledgeActions = require('../../actions/KnowledgeActions');
var classnames = require('classnames');
var KnowledgeInfo = React.createClass({
    getInitialState:function(){
        return{testPoint:[]}
    },
    _addReferKnowledge: function () {
        "use strict";

        if(this.props.chosenExam){
            var refers ={
                knowledgeId: this.props.currentPoint.id,
                knowledgeName: this.props.currentPoint.name,
                subjectId:this.props.currentPoint.subjectId,
                phaseId:this.props.currentPoint.phaseId,
                "cognizeLevelId":"",
                "cognizeLevelName":"",
                "abilityId":"",
                "abilityName":"",
                testPoint:this.props.testPoint
            }
        }else{
            var refers ={
                knowledgeId: this.props.currentPoint.id,
                knowledgeName: this.props.currentPoint.name
            }
        }
        KnowledgeActions.addReferKnowledge(refers);
    },
    _delReferKnowledge: function () {
        "use strict";
        KnowledgeActions.delReferKnowledge(this.props.currentPoint.id, null);
    },

    _referSelected: function (id) {
        "use strict";
        KnowledgeActions.knowledgeSelect({id: id}, this.props.isView);
    },

    componentWillMount: function () {
        "use strict";
        if (this.props.currentPoint.id != null && this.props.currentPoint.name == null) {
            KnowledgeActions.knowledgeSelect({id: this.props.currentPoint.id}, this.props.isView);
        }
    },
    componentWillReceiveProps :function(nextProps){

    },
    render: function () {
        "use strict";

        var isView = this.props.isView;
        var isJustView = this.props.isJustView;
        var currentPoint = this.props.currentPoint;
        var referExamPoints = [];
        var hasAdd = this.props.hasAdd;

        if (currentPoint.referExamPoint) {
            currentPoint.referExamPoint.forEach(function (item, index) {

                index++;
                referExamPoints.push(<ReferExamPoint
                    chosenExam={this.props.chosenExam}
                    hadTestPoint={this.props.hadTestPoint}
                    testPoint ={this.props.testPoint}
                    refer={item} index={index} isView={true} key={index}/>);
            }.bind(this));
        }

        var addBtn;
        var knowlegeInfoContainer = "knowledge-info-container";
        if (isView && !isJustView) {
            if (currentPoint.id != undefined && currentPoint.id != null && this.props.limitId != currentPoint.id) {
                if (!hasAdd) {
                    addBtn = (
                        <button className="button" onClick={this._addReferKnowledge}>添加</button>);
                } else {
                    addBtn = (
                        <button className="button red" onClick={this._delReferKnowledge}>取消</button>);
                }
            } else {
                addBtn = (
                    <button className="button" disabled onClick={this._addReferKnowledge}>添加</button>);
            }
        }

        if (isJustView) {
            knowlegeInfoContainer = classnames(knowlegeInfoContainer, "just-view");
        }

        return (
            <div className={knowlegeInfoContainer}>
                <div className="knowledge-info-name">
                    <span>{currentPoint.name}</span>
                    {addBtn}
                </div>

                <div className="knowledge-info-subject-phase">
                    <span className="label label-primary">{currentPoint.subjectName}</span>
                    <span className="label label-primary">{currentPoint.phaseName}</span>
                </div>

                <div className="knowledge-info-description">
                    <p>知识点说明</p>
                    <div className="description-container" dangerouslySetInnerHTML={{
                        __html: currentPoint.description
                      }}></div>
                </div>

                <div className="knowledge-info-remark">
                    <p>备注</p>
                    <p>
                        {currentPoint.remark}
                    </p>
                </div>

                <ReferKnowledge description="上级知识点" selectAction={this._referSelected} refers={currentPoint.higher}
                                isView={true}/>
                <ReferKnowledge description="前置知识点" selectAction={this._referSelected} refers={currentPoint.before}
                                isView={true}/>
                <ReferKnowledge description="下级知识点" selectAction={this._referSelected} refers={currentPoint.lower}
                                isView={true}/>

                <div className="knowledge-info-exam-point">
                    <div className="knowledge-info-exam-point-header">
                        <span>相关考点</span>
                    </div>
                    {referExamPoints}
                </div>
            </div>
        );
    }
});

module.exports = KnowledgeInfo;