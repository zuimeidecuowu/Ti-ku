/**
 *
 * ━━━━━━神兽出没━━━━━━
 * 　　　┏┓　　　┏┓
 * 　　┏┛┻━━━┛┻┓
 * 　　┃　　　　　　　┃
 * 　　┃　　　━　　　┃
 * 　　┃　┳┛　┗┳　┃
 * 　　┃　　　　　　　┃
 * 　　┃　　　┻　　　┃
 * 　　┃　　　　　　　┃
 * 　　┗━┓　　　┏━┛Code is far away from bugs with the animal protecting
 * 　　　　┃　　　┃    神兽保佑,代码无bug
 * 　　　　┃　　　┃
 * 　　　　┃　　　┃
 * 　　　　┃　　　┃
 * 　　　　┃　　　┗━━━┓
 * 　　　　┃　　　　　　　┣┓
 * 　　　　┃　　　　　　　┏┛
 * 　　　　┗┓┓┏━┳┓┏┛
 * 　　　　　┃┫┫　┃┫┫
 * 　　　　　┗┻┛　┗┻┛
 *
 * ━━━━━━感觉萌萌哒━━━━━━
 */
var React = require('react');
var ReactDOM = require('react-dom');
var KnowledgeContainerEditor = require('./../containers/KnowledgeContainerEditor');
var KnowledgeContainerViewer = require('./../containers/KnowledgeContainerViewer');

var SectionList = require('../components/textBook/SectionList');

var Reflux = require('reflux');
var store = require('./../stores/store');

var KnowledgeActions = require('../actions/KnowledgeActions');

var KnowledgeApp = React.createClass({
    mixins: [Reflux.connect(store, "data")],
    render: function () {
        "use strict";
        var showAddView = this.state.data.addKnowledgeModal;

        var viewer;
        if (showAddView) {
            viewer = (<KnowledgeContainerViewer knowledgeData={this.state.data.knowledgeViewData}/>);
        }

        var disabled = this.state.data.knowledgeData.currentPoint == null || this.state.data.knowledgeData.currentPoint == undefined
            || this.state.data.knowledgeData.currentPoint.id == undefined || this.state.data.knowledgeData.currentPoint.id == null;

        return (
            <div className="konwledge-main-container">
                <div className="knowledge-main-actions">
                    <button className="button" disabled={disabled} onClick={this._enterEditing}>
                        {
                            this.state.data.knowledgeData.isEditing ? "退出编辑模式" : "进入编辑模式"
                        }
                    </button>
                    <button className="button" style={{"float":"right"}} onClick={this._addKnowledge}>
                        新增知识点
                    </button>
                </div>
                <KnowledgeContainerEditor knowledgeData={this.state.data.knowledgeData}/>
                {viewer}
            </div>
        );
    },

    _addKnowledge: function () {
        "use strict";
        KnowledgeActions.addNewKnowledge()
    },

    _enterEditing: function () {
        "use strict";
        if (this.state.data.knowledgeData.currentPoint.id == undefined || this.state.data.knowledgeData.currentPoint.id == null) {
            alert("请先选择知识点");
            return;
        }

        KnowledgeActions.enterEditing();
    }
});
ReactDOM.render(<KnowledgeApp/>, document.getElementById('content'));