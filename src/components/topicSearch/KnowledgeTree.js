/**
 * Created by Administrator on 2016/1/5.
 */
var React =require('react');
var KnowledgeTreeNode = require('./KnowledgeTreeNode');
var classnames = require('classnames');
var KnowledgeTree = React.createClass({
    getInitialState: function () {
        return {
            isSearch: false,
            baseTree:[],
            subject:[],
            subjectId:'',
            searchResult:[]
        };
    },
    componentDidMount:function(){
        $.ajax({
            url:'knowledges/findAllSubject',
            dataType:'json',
            type:'post',
            success:function(data){
                this.setState({
                    subject:data.result,
                    subjectId:data.result[0].id
                });
                $.ajax({
                    url:'knowledges/findAllPhases',
                    dataType:'json',
                    type:'post',
                    success:function(data){
                        var baseTree=data.result;
                        var dataObj={
                            phaseId: baseTree[0].id,
                            subjectId: this.state.subjectId
                        };
                        $.ajax({
                            url:'knowledges/findAllByKnowledges',
                            dataType:'json',
                            type:'post',
                            data:dataObj,
                            success:function(data){
                                baseTree[0].children=data.result;
                                if(data.result.length !=0){
                                    baseTree[0].expand = true;
                                }
                                this.setState({baseTree:baseTree});
                            }.bind(this)
                        });
                    }.bind(this)
                });
            }.bind(this)
        });

    },
    render:function(){
        var list=[],searchResultList=[];
        this.state.baseTree.forEach(function (item,index) {
            list.push(<KnowledgeTreeNode isPhases={true}
                                         knowledgePoint={item}
                                         key={item.id}
                                         index={index}
                                         padding={0}
                                         expandCollapseTreeNode={this.expandCollapseTreeNode}/>);
        }.bind(this));
        this.state.searchResult.forEach(function (item) {
            searchResultList.push(<li className='searchResultLi' onClick={this.searchResultChosen}
                                      title={item.name} name={item.id} key={item.id}><span></span><span>{item.name}</span></li>);
        }.bind(this));
        return(
        <div className="knowledge-tree-container">
            <select className="form-control knowledge-tree-select" value={this.state.subjectId}  ref="subject_list" onChange={this.subjectChange}>
                {
                    this.state.subject.map(function(item,index){
                        return(<option value={item.id} key={index}>{item.name}</option>);
                    })
                }
            </select>
            <div>
                <div className="input-group">
                    <input type="text" className="form-control" ref="searchInput"
                            placeholder="请输入搜索内容"/>
                    <span className="input-group-btn">
                        <button className="button" type="button"
                                onClick={this.searchKnowledge}><img src="./img/search-icon.png"/>
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
        )
    },
    subjectChange:function(evt){
        var subjectId = evt.target.value;
        $.ajax({
            url:'knowledges/findAllPhases',
            dataType:'json',
            type:'post',
            success:function(data){
                var baseTree=data.result;
                var dataObj={
                    phaseId: baseTree[0].id,
                    subjectId: subjectId
                };
                $.ajax({
                    url:'knowledges/findAllByKnowledges',
                    dataType:'json',
                    type:'post',
                    data:dataObj,
                    success:function(data){
                        baseTree[0].children=data.result;
                        if(data.result.length !=0){
                            baseTree[0].expand = true;
                        }
                        this.setState({baseTree:baseTree,subjectId:subjectId});
                    }.bind(this)
                });

            }.bind(this)
        });

    },
    expandCollapseTreeNode:function(event,knowledgeObj,isPhases){
        var Id = knowledgeObj.id;
        var knowledgeId='';
        if(isPhases){
            var dataObj={
                phaseId: Id,
                subjectId: this.state.subjectId
            }
        }else{
            var dataObj={
                knowledgeId: Id
            };
            knowledgeId=Id;
            knowledgeObj.isSelect=true;
        }
        $.ajax({
            url:'knowledges/findAllByKnowledges',
            dataType:'json',
            type:'post',
            data:dataObj,
            success:function(data){
                if(data.isOk){
                    knowledgeObj.children=data.result;
                    if(data.result.length !=0){
                        knowledgeObj.expand = true;
                    }
                }
                this.setState({baseTree:this.state.baseTree});
            }.bind(this)
        });
        if (this.props.onChange){
            this.props.onChange({
                knowledgeId:knowledgeId,
                knowledgeName:knowledgeObj.name,
                subjectId:this.state.subjectId

            });
        }
    },
    searchKnowledge:function(){

        if(this.refs.searchInput.value){
            var param = {searchInfo: this.refs.searchInput.value, subjectId: this.state.subjectId};
            $.ajax({
                url:'knowledges/searchKnowledges',
                dataType:'json',
                type:'post',
                data:param,
                success:function(data){
                    this.setState({
                        searchResult:data.result,
                        isSearch:true
                    })
                }.bind(this)
            });
        }else{
            this.setState({
                isSearch:false
            })
        }
    },
    searchResultChosen:function(evt){
        $(".searchResultLi").removeClass('select');
        var Li = $(evt.target).closest('li');
        var knowledgeId = Li.attr('name');
        var knowledgeName = Li.attr('title');
        Li.addClass('select');
        if (this.props.onChange){
            this.props.onChange({
                knowledgeId:knowledgeId,
                knowledgeName:knowledgeName,
                subjectId:this.state.subjectId
            });
        }
    }
});
module.exports= KnowledgeTree;