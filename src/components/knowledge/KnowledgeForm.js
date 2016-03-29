var React = require('react');
var Editor = require('./Editor');
var ReferKnowledge = require('./ReferKnowledge');
var ReferExamPoint = require('./ReferExamPoint');
var KnowledgeActions = require('../../actions/KnowledgeActions');

var KnowledgeForm = React.createClass({

    getInitialState: function () {
        "use strict";
        return {
            //description: this.props.currentPoint.description,
            remark: this.props.currentPoint.remark,
            name: this.props.currentPoint.name
        };
    },

    __saveKnowledge: function (callback) {
        "use strict";
        if (this.refs.subjectIdSelect.value == 0) {
            bootbox.alert("请选择学科");
            return;
        }

        if (this.refs.phaseIdSelect.value == 0) {
            bootbox.alert("请选择学段");
            return;
        }

        var subjectName = '';
        this.props.subject.forEach(function (item) {
            "use strict";
            if (item.id == this.refs.subjectIdSelect.value) {
                subjectName = item.name;
            }
        }.bind(this));

        var phaseName = '';
        this.props.phase.forEach(function (item) {
            "use strict";
            if (item.id == this.refs.phaseIdSelect.value) {
                phaseName = item.name;
            }
        }.bind(this));

        if (this.state.name == null || this.state.name.length == 0) {
            bootbox.alert('知识点名称不能为空');
            return;
        }

        if (this.state.name.length > 20) {
            bootbox.alert('知识点名称不能超过20个字符。');
            return;
        }

        if (this.props.checkInfo.knowledgeName) {
            bootbox.alert(this.props.checkInfo.knowledgeName);
            return;
        }

        KnowledgeActions.saveKnowledge(this.props.currentPoint, {
            name: this.state.name,
            remark: this.state.remark,
            subjectId: this.refs.subjectIdSelect.value,
            phaseId: this.refs.phaseIdSelect.value,
            phaseName: phaseName,
            subjectName: subjectName
        }, callback);
    },

    _tempSaveKnowledge: function () {


        this.__saveKnowledge(function (data) {
            "use strict";
            if (data.isOk) {
                KnowledgeActions.updateKnowledgeInfo(data.result);
                bootbox.alert("保存成功");
            } else {
                bootbox.alert(data.result);
            }
        });
    },

    _tempSaveKnowledgeAndGoon: function () {
        "use strict";
        console.log('_tempSaveKnowledgeAndGoon');
        this.__saveKnowledge(function (data) {
            if (data.isOk) {
                bootbox.alert('保存成功');
                KnowledgeActions.addNewKnowledge();
            } else {
                boobox.alert(data.result);
            }
        });
    },

    _nameBlurHandler: function () {
        "use strict";
        KnowledgeActions.checkNameCanUse(this.state.name, this.props.currentPoint.id);

        this.__updateCurrentInfo();
    },

    _nameChangeHandler: function (evt) {
        "use strict";
        this.setState({
            name: evt.target.value
        });
    },

    _referSelected: function (id) {
        "use strict";
        KnowledgeActions.knowledgeSelect({id: id}, false);
    },

    _descriptionChangeHandler: function (value) {
        "use strict";
        //this.setState({
        //    description: value
        //});

        KnowledgeActions.changeDescription(value);
    },

    _delReferKnowldge: function (refer, id) {
        "use strict";
        KnowledgeActions.delReferKnowledge(id, refer);
    },

    _subjectChangeHandler: function (evt) {
        "use strict";
        this.__updateCurrentInfo();
    },

    _phaseChangeHandler: function (evt) {
        "use strict";
        this.__updateCurrentInfo();
    },

    render: function () {
        "use strict";
        var _subjectId = this.props.currentPoint.subjectId;
        var _phaseId = this.props.currentPoint.phaseId;

        var subjectList = [];

        subjectList.push(<option value={0} key={0}>学科</option>);
        this.props.subject.forEach(function (item) {
            subjectList.push(<option value={item.id} key={item.id}>{item.name}</option>);
        });

        var phaseList = [];
        phaseList.push(<option value={0} key={0}>学段</option>);

        this.props.phase.forEach(function (item) {
            phaseList.push(<option value={item.id} key={item.id}>{item.name}</option>);
        });

        var currentPoint = this.props.currentPoint;
        var referExamPoints = [];

        if (currentPoint.referExamPoint) {
            currentPoint.referExamPoint.forEach(function (item, index) {
                index++;
                referExamPoints.push(<ReferExamPoint refer={item} index={index} isView={false} key={item.id}/>);
            });
        }

        var checkInfo = this.props.checkInfo;
        return (
            <div className="knowledge-info-container">
                <div className="knowledge-info-name">
                    <button className="button purple" onClick={this._cancleHandler}>取消</button>
                    <button className="button " onClick={this._tempSaveKnowledge}>保存</button>
                </div>

                <div className="knowledge-info-subject-phase editing">
                    <span>名称:</span>
                    <input type="text" value={this.state.name} onChange={this._nameChangeHandler}
                           onBlur={this._nameBlurHandler}/>
                    <span className="check-result">{checkInfo.knowledgeName}</span>

                    <select ref="subjectIdSelect" onChange={this._subjectChangeHandler} value={_subjectId}>
                        {subjectList}
                    </select>
                    <select ref="phaseIdSelect" onChange={this._phaseChangeHandler} value={_phaseId}>
                        {phaseList}
                    </select>
                </div>

                <div className="knowledge-info-description">
                    <p>知识点说明</p>
                    <Editor editorChange={this._descriptionChangeHandler}
                            content={this.props.currentPoint.description}/>
                </div>

                <div className="knowledge-info-remark">
                    <p>备注</p>
                    <textarea ref="remarkArea" type="text" onChange={this._remarkChangeHandler}
                              onBlur={this._remarkBlurHandler} value={this.state.remark}/>
                </div>

                <ReferKnowledge description="上级知识点"
                                selectAction={this._referSelected}
                                closeAction={this._delReferKnowldge.bind(this,currentPoint.higher)}
                                refers={currentPoint.higher} subjectId={currentPoint.subjectId}
                                currentKnowledgeId={currentPoint.id} isView={false}/>
                <ReferKnowledge description="前置知识点"
                                selectAction={this._referSelected}
                                closeAction={this._delReferKnowldge.bind(this,currentPoint.before)}
                                refers={currentPoint.before} subjectId={currentPoint.subjectId}
                                currentKnowledgeId={currentPoint.id} isView={false}/>

                <div className="knowledge-info-exam-point">
                    <div className="knowledge-info-exam-point-header">
                        <span>相关考点:</span>
                        <span onClick={this._addExamPoint} className="icon-plus"></span>
                    </div>
                    {referExamPoints}
                </div>

                <div className="knowledge-info-actions">
                    <button className="button red"
                            disabled={this.props.currentPoint.id == 0} onClick={this._deleteHandler}>删除
                    </button>
                    <button className="button" onClick={this._tempSaveKnowledge}>保存</button>
                    <button className="button" onClick={this._tempSaveKnowledgeAndGoon}>保存并新增</button>
                    <button className="button purple" onClick={this._cancleHandler}>取消</button>
                </div>
            </div>
        );
    },

    __updateCurrentInfo: function () {
        "use strict";
        KnowledgeActions.changeCurrentPoint({
            remark: this.state.remark,
            name: this.state.name,
            subjectId: this.refs.subjectIdSelect.value,
            phaseId: this.refs.phaseIdSelect.value
        });
    },

    _remarkBlurHandler: function () {
        "use strict";
        this.__updateCurrentInfo();
    },

    _remarkChangeHandler: function (evt) {
        "use strict";
        this.setState({
            remark: evt.target.value
        });
    },
    _addExamPoint: function () {
        "use strict";
        KnowledgeActions.addExamPoint(this.props.currentPoint.referExamPoint, {
            id: new Date().valueOf(),
            name: '',
            description: ''
        });
    },
    _deleteHandler: function () {
        "use strict";
        var id = this.props.currentPoint.id;

        bootbox.confirm('确认删除当前知识点？', function (result) {
            if (result) {
                KnowledgeActions.delKnowledge(id);
            }
        });
    },
    _cancleHandler: function () {
        "use strict";
        bootbox.confirm('您还没有保存确定要取消么？', function (result) {
            if (result) {
                KnowledgeActions.enterEditing();
            }
        });
    },

    componentWillReceiveProps: function (nextProps) {
        "use strict";
        this.setState({
            description: nextProps.currentPoint.description,
            remark: nextProps.currentPoint.remark,
            name: nextProps.currentPoint.name
        });
    },

    shouldComponentUpdate: function () {
        "use strict";
        return true;
    }
});

module.exports = KnowledgeForm;