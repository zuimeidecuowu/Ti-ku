var React = require('react');

var BasicForm = React.createClass({
    //getInitialState:function(){
    //    return {subject:[],textbookVersion:[],grade:[],fascicule:[],phase:[]}
    //},
    //componentWillMount:function(){
    //
    //    $.ajax({//学段
    //        //url:'./data/findPhasesValue.json',
    //        url: 'metaData/findPhasesValue',
    //        dataType : 'json',
    //        type : "POST",
    //        success : function(data) {
    //            this.setState({phase:data})
    //        }.bind(this)
    //    });
    //    $.ajax({//学科
    //        //url:'./data/findSubjectValue.json',
    //        url: 'metaData/findSubjectValue',
    //        dataType : 'json',
    //        type : "POST",
    //        success : function(data) {
    //            this.setState({subject:data})
    //        }.bind(this)
    //    });
    //    $.ajax({//年级
    //        //url:'./data/findBaseGrade.json',
    //        url: 'textbookmg/findBaseGrade',
    //        dataType : 'json',
    //        type : "POST",
    //        success : function(data) {
    //            this.setState({grade:data})
    //        }.bind(this)
    //    });
    //    $.ajax({//出版社
    //        //url:'./data/findTextBookVersionValue.json',
    //        url: 'metaData/findTextBookVersionValue',
    //        dataType : 'json',
    //        type : "POST",
    //        success : function(data) {
    //            this.setState({textbookVersion:data})
    //        }.bind(this)
    //    });
    //    var postData ={
    //        phase :this.props.phase.id,
    //        grade :this.props.grade.id,
    //        subject :this.props.subject.id,
    //        textBookVersion :this.props.textbookVersion.id
    //    };
    //    $.ajax({
    //        //url:'./data/findFascicule.json',
    //        url: 'textbookmg/findFascicule',
    //        dataType : 'json',
    //        type : "POST",
    //        data : postData,
    //        success : function(data) {
    //            this.setState({fascicule:data});
    //        }.bind(this)
    //    });
    //
    //},
    render:function(){

        var content;
            content=(
                <div className="information">
                    <h1>教材查看</h1>
                    <section className="clearfix">
                        <h2 className="col-sm-1 no-margin no-padding">基本信息</h2>
                        <div className="form col-sm-9 no-margin no-padding">
                            <div className="col-sm-12">
                                <div  className="col-sm-4">
                                    <label>*</label>
                                    <select name="subject" ref="subject" disabled="disabled">
                                        <option value="">{this.props.subject.name}</option>
                                    </select>

                                </div>
                                <div className="col-sm-4">
                                    <label>*</label>
                                    <select  name="phase" ref="phase" disabled="disabled" >
                                        <option value="">{this.props.phase.name}</option>
                                    </select>
                                </div>
                                <div className="col-sm-4">
                                    <label>*</label>
                                    <select  name="grade"  ref="grade" disabled="disabled" >
                                        <option value="">{this.props.grade.name}</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className="col-sm-4">
                                    <label>*</label>
                                    <select name="textbookVersion"  ref="textbookVersion" disabled="disabled" >
                                        <option value="">{this.props.textbookVersion.name}</option>
                                    </select>
                                </div>

                                <div className="col-sm-4">
                                    <label>*</label>
                                    <select  name="fascicule"  ref="fascicule" disabled="disabled" >
                                        <option value="">{this.props.fascicule.name}</option>
                                    </select>
                                </div>

                                <div className="col-sm-4">
                                    <label>*</label>
                                    <input ref="year"  type="text" disabled="disabled" value={this.props.year} />

                                </div>
                            </div>
                        </div>
                        <div className="col-sm-2 text-right no-margin no-padding">
                            <div className="updateImg"><img src={this.props.imgUrl} /></div>
                        </div>
                    </section>

                </div>
            )

        return(
            <div>{content}</div>
        )
    }
})

module.exports = BasicForm;