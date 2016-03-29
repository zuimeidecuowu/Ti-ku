var React = require('react');
var TextBookActions = require('../../actions/TextBookActions');

var Knowledge = React.createClass({
    getInitialState:function(){
        "use strict";
        return{cognizeLevel:[],ability:[]}
    },
    componentWillReceiveProps:function(nextProps){
        if(!this.props.notShowSelect){
            var postData = nextProps.postData;
            $.ajax({
                url: 'textbookmg/findAbility',
                dataType : 'json',
                type : "POST",
                data : postData,
                success : function(data) {
                    this.setState({ability:data})
                }.bind(this)
            });
            $.ajax({
                url: 'textbookmg/findCognizeLevel',
                dataType : 'json',
                type : "POST",
                data : postData,
                success : function(data) {
                    this.setState({cognizeLevel:data})
                }.bind(this)
            });
        }
    },
    componentWillMount:function(){
        if(!this.props.notShowSelect) {
            var postData = this.props.postData;
            $.ajax({
                url: 'textbookmg/findAbility',
                dataType: 'json',
                type: "POST",
                data: postData,
                success: function (data) {
                    this.setState({ability: data})
                }.bind(this)
            });
            $.ajax({
                url: 'textbookmg/findCognizeLevel',
                dataType: 'json',
                type: "POST",
                data: postData,
                success: function (data) {
                    this.setState({cognizeLevel: data})
                }.bind(this)
            });
        }
    },
    updateKnowledge:function(e){
        "use strict";
        TextBookActions.updateKnowledge(this.props.data,e.target.name,e.target.value);
    },
    removeKnowledge:function(){
        this.props.removeKnowledge(this.props.index)
    },
    showKnowledge:function(){
        TextBookActions.showKnowledge(this.props.data.id);
    },
    render: function () {
        "use strict";
        var content;
        var selectList;
        if(!this.props.notShowSelect) {
            var disabled = this.props.type =='view'?'disabled':'';
            selectList=(
                <span>
                    <select disabled={disabled} name="cognizeLevelId" ref="acknowledge" onChange={this.updateKnowledge} value={this.props.data.cognizeLevelId || ""}>
                        <option value="">认知层次</option>
                        {
                            this.state.cognizeLevel.map(function(item,index){
                                return <option value={item.id} key={index}>{item.name}</option>
                            })
                        }
                    </select>
                    <select disabled={disabled} name="abilityId" ref="ability" onChange={this.updateKnowledge} value={this.props.data.abilityId || ""}>
                        <option value="">能力体系</option>
                        {
                            this.state.ability.map(function(item,index){
                                return <option value={item.id} key={index}>{item.name}</option>
                            })
                        }
                    </select>
                </span>
            )
        }
        if(this.props.type != "view"){
            content=(
                <p>
                    <label>{this.props.data.name}</label>
                    {selectList}
                    <button className="button red" onClick={this.removeKnowledge}>删除</button>
                </p>
            )
        }else{
            content=(
                <p>
                    <a onClick={this.showKnowledge}>{this.props.data.name}</a>
                    {selectList}
                </p>
            )
        }

        return(
            <div> {content}</div>
        )

    }

});

module.exports=Knowledge;
