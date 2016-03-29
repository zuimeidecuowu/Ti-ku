var React = require('react');
var Knowledge = require('./Knowledge');
var TextBookActions = require('../../actions/TextBookActions');

function judgeSectionName(){//判断sectionInputName是否为空
    "use strict";
    if($(".sectionInputName").length ==0){
        return true;
    }
    var flag = true;
    $(".sectionInputName").each(function(){
        if($(this).val()==''){
            bootbox.alert("请先为章节填写名称");
            flag = false;
            return flag;
        }
    });
    return flag;
}

var Section = React.createClass({
    getInitialState:function(){
        return {
            isEdit:false,
            inputName:this.props.sectionData.name
        };
    },
    componentWillReceiveProps:function(nextProps){
        this.setState({inputName:nextProps.sectionData.name});

    },
    _switchCheck: function () {
        "use strict";
        TextBookActions.specialTypeChange(this.props.sectionData);
    },
    removeSection:function(index){
        "use strict";
        TextBookActions.removeSection(this.props.sectionData.children,index);
    },
    _removeSelf:function(){
        "use strict";
        if(this.props.sectionData.children.length>0){
            bootbox.alert('请先删除子章节');
        }else{
            this.props.removeSelf(this.props.index);
        }
    },
    changeSectionName:function(){
        "use strict";
        if( this.refs.sectionName.value.length>200){
            bootbox.alert('章节名称长度不能大于200');
        }else{
            this.setState({inputName : this.refs.sectionName.value});
        }
    },
    updateSectionName:function(){
       TextBookActions.addSectionName(this.props.sectionData,this.refs.sectionName.value)
    },
    addSection: function () {
        if(judgeSectionName()){
            TextBookActions.addSection(this.props.sectionData, this.props.sectionData.specialType);
        }
    },
    addKnowledge:function(){
        "use strict";
        TextBookActions.addKnowledge(this.props.sectionData.knowledge);
    },
    removeKnowledge:function(index){
        TextBookActions.removeKnowledge(this.props.sectionData,index)
    },
    render: function () {

        var listSection = [];
        var itemChapter = 1;
        var isDisabled ='';
        var noChildren;

        if(this.props.sectionData.children.length == 0){
            noChildren='noChildren';
        }
        this.props.sectionData.children.forEach(function (item,index) {
            if(this.props.sectionData.specialType){
                isDisabled='disabled'
            }
            listSection.push(<Section
                postData={this.props.postData}
                sectionData={item}
                removeSelf={this.removeSection}
                isDisabled={isDisabled}
                index={index}
                chapter={this.props.chapter+'.'+itemChapter}
                key ={index}
                type={this.props.type}
            />);
            if (!item.specialType) {
                itemChapter++;
            }
        }.bind(this));
        var sectionName = this.props.sectionData.specialType?'特殊':this.props.chapter;
        var isChecked = this.props.sectionData.specialType?'checked':'';
        var btnName = this.props.sectionData.specialType?'特殊':sectionName+'.'+itemChapter;
        var addSectionBtn;
        if(sectionName.toString().split('.').length>5){
            addSectionBtn =(<button className="button disabled"  disabled="disabled">已达到章节最大层级</button>);
        }else{
            addSectionBtn =(<button className=" button green" onClick={this.addSection}>添加{btnName}</button>);
        }

        var knowList=[];
        this.props.sectionData.knowledge.forEach(function(item,index) {

            knowList.push( <Knowledge removeKnowledge={this.removeKnowledge} postData={this.props.postData} data={item} key={index}  index={index} type={this.props.type}/>)

        }.bind(this));
        var knowViewList;
        if(this.props.sectionData.knowledge.length==0){
            knowViewList =(<strong>无</strong>);
        }else{
            knowViewList=knowList;
        }
        var content;
        if(this.props.type != 'view'){
            content=(<div>
                <input type="checkbox" onChange={this._switchCheck} checked={isChecked} disabled={this.props.isDisabled} />
                <div className="con">
                    <aside>
                        <span className={this.props.sectionData.specialType?'special':''}>【{sectionName}】<i className="icon-star"></i></span>
                    </aside>
                    <article>
                        <div className="top">
                            <input type="text"
                                   className="sectionInputName"
                                   value={this.state.inputName}
                                   ref="sectionName"
                                   onChange={this.changeSectionName}
                                   onBlur={this.updateSectionName}
                                   placeholder="请输入章节名称"/>
                            <button className="button red" onClick={this._removeSelf}>删除</button>
                        </div>
                        <section>添加知识点<i className="icon-plus" onClick={this.addKnowledge}></i></section>
                        <section className="knowledge">
                            {knowList}

                        </section>
                    </article>
                </div>
                <ul>{listSection}
                    <div className="addSection">
                        {addSectionBtn}
                    </div>
                </ul>

            </div>)
        }else{
            content = (<div className={noChildren}>
                <div className="con">
                    <aside>
                        <span className={this.props.sectionData.specialType?'special':''}>【{sectionName}】<i className="icon-star"></i></span>
                    </aside>
                    <article>
                        <div className="top">
                            <label className={this.props.sectionData.specialType?'special':''}>{this.props.sectionData.name}</label>
                        </div>
                        <section className="knowledge">
                            <aside>知识点：</aside>
                            <div className="knowledgeCon">
                                {knowViewList}
                            </div>
                        </section>
                    </article>
                </div>
                <ul >{listSection}</ul>
            </div>)
        }
        return (
            <li>
                {content}
            </li>
        );
    }
});

module.exports=Section;