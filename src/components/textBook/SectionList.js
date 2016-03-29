var React = require('react');
var TextBookActions = require('../../actions/TextBookActions');

var Section = require('./Section');

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





var SectionList = React.createClass({
    addChapter: function () {
        if(judgeSectionName()){
            TextBookActions.addChapter(this.props.sectionData);
        }
    },
    removeChapter:function(index){
        "use strict";
        TextBookActions.removeSection(this.props.sectionData,index);

    },
    render: function () {
        var items = [];
        var chapter = 1;
        var content;

        this.props.sectionData.forEach(function (item,index) {
            items.push(<Section postData={this.props.postData} type={this.props.type} sectionData={item} removeSelf={this.removeChapter}  isDisabled="" chapter={chapter} index={index} key={index}/>);
            if (!item.specialType) {
                chapter++;
            }
        }.bind(this));
        if(this.props.type != 'view'){
            content =(
                <div className="SectionCon col-sm-12 no-padding">
                    <h1 className="col-sm-1  no-margin no-padding">章节编辑</h1>
                    <ul className="SectionUl col-sm-10  no-padding">
                        {items}
                        <div className="addSection">
                            <button className="button green " onClick={this.addChapter}>添加{chapter}</button>
                        </div>
                    </ul>
                </div>
            )
        }else{
            content =(
                <div className="SectionViewCon col-sm-12 no-padding">
                    <h1 className="col-sm-1  no-margin no-padding">章节目录</h1>
                    <ul className="SectionUl col-sm-10  no-padding">
                        {items}
                    </ul>
                </div>
            )
        }
        return (
            <div>{content}</div>
         );
    }
});

module.exports = SectionList;