var AjaxUtil = require('../utils/AjaxUtil');

var KnowledgeReflux = {
    onToggleAddKnowledge: function (label) {
        "use strict";
    },

    onExpandCollapseTreeNode: function (point, needSelectFirst, isView) {
        "use strict";
        if(point ===undefined) return;
        point.expand = !point.expand;
        this.data.knowledgeViewData.testPoint =[];
        AjaxUtil.loadTreeNode(point, this.updateTreeNode.bind(this), needSelectFirst, isView);
    },
    onShowKnowledgeViewerModal: function (refers, limitId, subjectId) {
        "use strict";
        this.data.addKnowledgeModal = true;
        this.data.knowledgeViewData.limitId = limitId;
        this.data.knowledgeViewData.subjectId = subjectId;
        this.data.knowledgeViewData.selectedKnowledge = refers;
        this.updateData(this.data);
    },
    onHideKnowledgeViewerModal: function () {
        "use strict";
        this.data.addKnowledgeModal = false;
        this.updateData(this.data);
    },
    onChangeCurrentPoint: function (obj) {
        "use strict";
        this.data.knowledgeData.currentPoint.name = obj.name;
        this.data.knowledgeData.currentPoint.remark = obj.remark;
        this.data.knowledgeData.currentPoint.phaseId = obj.phaseId;
        this.data.knowledgeData.currentPoint.subjectId = obj.subjectId;

        this.updateData(this.data);
    },
    onDelReferKnowledge: function (id, refer) {
        "use strict";
        function delRefer(refers, _this, isView) {
            var start = -1;
            refers.forEach(function (temp, index) {
                if (id == temp.knowledgeId) {
                    start = index;
                    return;
                }
            });

            if (start >= 0) {
                refers.splice(start, 1);

                if (isView) {
                    _this.data.knowledgeViewData.hasAdd = _this.isInRefers(refers, id);
                }
                _this.updateData(_this.data);
            } else {
                bootbox.alert('取消失败');
            }
        }

        if (refer) {
            delRefer(refer, this, false);
        } else {
            delRefer(this.data.knowledgeViewData.selectedKnowledge, this, true);
        }
    },
    onUpdateKnowledgeInfo: function (info) {
        "use strict";

        this.data.knowledgeData.currentPoint.id = info.id;
        this.updateData(this.data);
    },
    onAddReferKnowledge: function (item) {
        "use strict";
        //var sort;
        var knowledge = this.data.knowledgeViewData.selectedKnowledge;
        var id =item.knowledgeId;
        this.data.knowledgeViewData.hasAdd = this.isInRefers(this.data.knowledgeViewData.selectedKnowledge, id);
        if(!this.data.knowledgeViewData.hasAdd){
            if(Array.isArray(knowledge)){
                knowledge.push(item);
            }else{
                for(var i in item){
                    knowledge[i]=item[i]
                }
            }
        }
        this.updateData(this.data);
    },
    onAddTestPoint:function(flag,id,konwledgeId){
        var majorKnowledge = this.data.topicData.majorKnowledge;
        if(flag){
            if(Array.isArray(majorKnowledge)){
                var notAdd =true;
                majorKnowledge.forEach(function(item){
                    if(item.knowledgeId ==konwledgeId ){
                        item.testPoint.push(id);
                        notAdd = false;
                    }
                });
                if(notAdd){
                    this.data.knowledgeViewData.testPoint.push(id);
                }
            }else{
                if(majorKnowledge.knowledgeId==konwledgeId){
                    majorKnowledge.testPoint.push(id)
                }else{
                    this.data.knowledgeViewData.testPoint.push(id);
                }
            }
        }else{
            if(Array.isArray(majorKnowledge)){
                var notDelect =true;
                majorKnowledge.forEach(function(item){
                    if(item.knowledgeId == konwledgeId ){
                        item.testPoint.forEach(function(testPoint,index){
                            if(testPoint ==id){
                                item.testPoint.splice(index,1);
                                notDelect=false;
                            }
                        })
                    }
                });
                if(notDelect){
                    this.data.knowledgeViewData.testPoint.forEach(function(item,index){
                        if(item == id){
                            this.data.knowledgeViewData.testPoint.splice(index,1)
                        }
                    }.bind(this))
                }
            }else{
                if(majorKnowledge.knowledgeId==konwledgeId){
                    majorKnowledge.testPoint.forEach(function(testPoint,index){
                        if(testPoint ==id){
                            majorKnowledge.testPoint.splice(index,1);
                        }
                    });
                }else{
                    this.data.knowledgeViewData.testPoint.forEach(function(item,index){
                        if(item == id){
                            this.data.knowledgeViewData.testPoint.splice(index,1)
                        }
                    }.bind(this))
                }
            }
        }
        this.updateData(this.data);
    },
    isInRefers: function (refers, id) {
        "use strict";

        var isIn = false;
        if(Array.isArray(refers)){
            refers.forEach(function (item) {
                if (item.knowledgeId == id) {
                    isIn = true;
                    return;
                }
            });
        }else{
            if (refers.knowledgeId == id) {
                isIn = true;
                return;
            }
        }

        return isIn;
    },

    onKnowledgeSelect: function (point, isView) {
        "use strict";
        function selectAction(knowledgeData, _this) {
            point.isSelect = true;
            if (knowledgeData.selectNode != null && knowledgeData.selectNode.code != point.code) {
                knowledgeData.selectNode.isSelect = false;
            }
            knowledgeData.selectNode = point;
            if(point.id ==0) point.id=knowledgeData.baseTree.children[0].children[0].id;
            if (point.phaseId == 0) {
                _this.updateKnowledgeInfo(isView, {});
            } else {
                AjaxUtil.loadKnowledgeInfo(point, _this.updateKnowledgeInfo.bind(_this, isView));
            }
        }

        if (isView) {
            this.data.knowledgeViewData.hasAdd = this.isInRefers(this.data.knowledgeViewData.selectedKnowledge, point.id);
            selectAction(this.data.knowledgeViewData, this);
        } else {
            if (this.data.knowledgeData.isEditing && (this.data.knowledgeData.currentPoint.id == null || this.data.knowledgeData.currentPoint.id != point.id)) {
                bootbox.confirm('你还没有保存确认取消吗?', function (result) {
                    if (result) {
                        this.data.knowledgeData.checkInfo = {
                            knowledgeName: ''
                        };
                        selectAction(this.data.knowledgeData, this);
                    }
                }.bind(this));
            } else {
                selectAction(this.data.knowledgeData, this);
            }
        }
    },
    onSearchToggle: function (data) {
        "use strict";
        if (data == null || data.length == 0) {

        }
    },
    onEnterEditing: function () {
        "use strict";
        this.data.knowledgeData.isEditing = !this.data.knowledgeData.isEditing;

        //编辑取消
        //新增取消
        if (this.data.knowledgeData.currentPoint.id != 0) {
            AjaxUtil.loadKnowledgeInfo(this.data.knowledgeData.currentPoint, this.updateKnowledgeInfo.bind(this, false));
        } else {
            this.updateData(this.data);
        }
    },
    onAddExamPoint: function (refers, item) {
        "use strict";
        refers.push(item);
        this.updateData(this.data);
    },
    onSaveReferExamPoint: function (refer, item) {
        "use strict";
        refer.name = item.name;
        refer.description = item.description;
        this.updateData(this.data);
    },
    onDelKnowledge: function (id) {
        "use strict";

        AjaxUtil.delKnowledge(id, function (data) {
            if (data.isOk) {
                bootbox.alert('删除成功');
                this.delKnowledgeFromTree(id);
            } else {
                bootbox.alert(data.result);
            }
        }.bind(this));
    },

    onChangeDescription: function (value) {
        "use strict";
        this.data.knowledgeData.currentPoint.description = value;
    },

    onSaveKnowledge: function (currentPoint, item, callback) {
        "use strict";
        currentPoint.subjectId = item.subjectId;
        currentPoint.phaseId = item.phaseId;
        currentPoint.remark = item.remark;
        currentPoint.name = item.name;
        currentPoint.subjectName = item.subjectName;
        currentPoint.phaseName = item.phaseName;

        AjaxUtil.updateKnowledge(currentPoint, callback);
        this.updateData(this.data);
    },
    onCheckNameCanUse: function (knowledgeName, knowledgeId) {
        "use strict";

        var needBack = true;
        if (knowledgeName == null || knowledgeName.length == 0) {
            needBack = false;
            this.data.knowledgeData.checkInfo.knowledgeName = '知识点名称不能为空';
        } else if (knowledgeName.length > 20) {
            needBack = false;
            this.data.knowledgeData.checkInfo.knowledgeName = '知识点名称不能超过20个字符';
        } else {
            needBack = false;
            this.data.knowledgeData.checkInfo.knowledgeName = null;
        }

        if (needBack) {
            AjaxUtil.checkNameCanUse({knowledgeName: knowledgeName, knowledgeId: knowledgeId}, function (data) {
                if (data.isOk) {
                    this.data.knowledgeData.checkInfo.knowledgeName = null;
                } else {
                    this.data.knowledgeData.checkInfo.knowledgeName = data.result;
                }
                this.updateData(this.data);
            }.bind(this));
        } else {
            this.updateData(this.data);
        }
    },
    onAddNewKnowledge: function () {
        "use strict";
        this.data.knowledgeData.isEditing = true;
        this.data.knowledgeData.currentPoint = {
            id: 0,
            description: '',
            higher: [],
            before: [],
            lower: [],
            remark: '',
            referExamPoint: []
        };

        this.updateData(this.data);
    },
    onDelReferExamPoint: function (refer) {
        "use strict";
        var temp = [];
        this.data.knowledgeData.currentPoint.referExamPoint.forEach(function (item) {
            if (item.id !== refer.id) {
                temp.push(item);
            }
        });
        this.data.knowledgeData.currentPoint.referExamPoint = temp;
        this.updateData(this.data);
    },
    onLoadSubjectPhase: function (knowledgeData) {
        "use strict";
        AjaxUtil.loadSubject(this.updateSubjects.bind(this, knowledgeData));
    },
    onSubjectChanged: function (baseTree, subjectId, isView) {
        "use strict";
        baseTree.children.forEach(function (item, index) {
            item.expand = false;
            item.hasChild = true;
            item.children = [];
            item.phaseId = 0;
            item.subjectId = subjectId;
            item.code = subjectId + '-' + index;
        });

        if (isView) {
            this.data.knowledgeViewData.subjectId = subjectId;
        } else {
            this.data.knowledgeData.subjectId = subjectId;
        }

        this.onExpandCollapseTreeNode(baseTree.children[0], true, isView);

        this.updateData(this.data);
    },

    onSearchKnowledge: function (searchInfo, subjectId, isView) {
        "use strict";
        var param = {searchInfo: searchInfo, subjectId: subjectId};
        AjaxUtil.loadSearchResult(param, this.updateSearchResult.bind(this, isView));
    },
    delKnowledgeFromTree: function (id) {
        "use strict";

        function deleteTree(treeNode) {
            var children = [];

            treeNode.children.forEach(function (item) {
                if (item.id !== id) {
                    children.push(item);
                    deleteTree(item);
                }
            });

            treeNode.children = children;
        }

        this.data.knowledgeViewData.baseTree.children.forEach(function (item) {
            deleteTree(item);
        });
        this.data.knowledgeData.baseTree.children.forEach(function (item) {
            deleteTree(item);
        });
    },
    updateSearchResult: function (isView, data) {
        "use strict";
        if (isView) {
            this.data.knowledgeViewData.searchResult = data;
        } else {
            this.data.knowledgeData.searchResult = data;
        }
        this.updateData(this.data);
    },
    updatePhases: function (knowledgeData, data) {
        "use strict";
        knowledgeData.phase = data;
        var subjectId = knowledgeData.subject[0].id;

        if (knowledgeData.subjectId) {
            subjectId = knowledgeData.subjectId;
        }else{
            knowledgeData.subjectId=subjectId;
        }

        var children = [];
        data.forEach(function (item, index) {
            item.expand = false;
            item.hasChild = true;
            item.children = [];
            item.phaseId = 0;
            item.subjectId = subjectId;
            item.code = subjectId + '-' + index;

            children.push(item);
        });

        knowledgeData.baseTree.children = children;

        this.onExpandCollapseTreeNode(knowledgeData.baseTree.children[0], true, knowledgeData.isView);
        this.updateData(this.data);
    },
    updateTreeNode: function (where, data, needSelectFirst, isView) {


        "use strict";
        var children = [];
        data.forEach(function (item, index) {
            item.expand = false;
            item.isSelect = false;
            item.hasChild = true;
            item.children = [];
            item.code = where.code + '-' + index;
            children.push(item);
        });

        where.children = children;
        if (children.length == 0) {
            where.hasChild = false;
        }

        this.updateData(this.data);

        if (needSelectFirst && where.children.length > 0) {
            this.onKnowledgeSelect(where.children[0], isView);
        } else if (needSelectFirst && where.children.length == 0) {
            this.onKnowledgeSelect(where, isView);
        } else {
            this.onKnowledgeSelect(where, isView);
        }
    },
    updateSubjects: function (knowledgeData, data) {
        "use strict";
        knowledgeData.subject = data;
        AjaxUtil.loadPhase(this.updatePhases.bind(this, knowledgeData));
    },
    updateKnowledgeInfo: function (isView, data) {
        "use strict";
        if (isView) {
            this.data.knowledgeViewData.currentPoint = data;
        } else {
            this.data.knowledgeData.currentPoint = data;
        }
        this.updateData(this.data);
    }
};

module.exports = KnowledgeReflux;