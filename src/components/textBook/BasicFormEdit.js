var React = require('react');
var TextBookActions = require('../../actions/TextBookActions');

var BasicFormEdit = React.createClass({
    getInitialState:function(){
        return {subject:[],textbookVersion:[],grade:[],fascicule:[],phase:[]}
    },
    componentWillReceiveProps:function(nextProps){

        if(nextProps.errorInformation.length>0){
            nextProps.errorInformation.forEach(function(name){
                var obj = {};
                obj['error_'+name] = true;
                this.setState(obj);
            }.bind(this))
        }
        if(nextProps.phase.id!="" && nextProps.grade.id!="" && nextProps.subject.id!="" && nextProps.textbookVersion.id!="" ){
            var postData ={
                phase :nextProps.phase.id,
                grade :nextProps.grade.id,
                subject :nextProps.subject.id,
                textBookVersion :nextProps.textbookVersion.id
            };
            $.ajax({
                url:'./data/findFascicule.json',
                //url: 'textbookmg/findFascicule',
                dataType : 'json',
                type : "POST",
                data : postData,
                success : function(data) {
                    this.setState({fascicule:data});
                }.bind(this)
            });
        }
    },

    componentDidMount:function(){
        $("#dateinput").datepicker({
            format: 'yyyy-mm',
            weekStart: 1,
            autoclose: true,
            startView: 2,
            maxViewMode: 1,
            minViewMode:1,
            forceParse: false,
            width:'400px',
            language: 'zh-CN'
        }).on("hide",function(){

            TextBookActions.updateTextbook($("#dateinput").val(),null,'year');
            $("#dateinput").next('em').removeClass('show');
            this.showSectionList();

        }.bind(this));
        $.ajax({//学段
            url:'./data/findPhasesValue.json',
            //url: 'metaData/findPhasesValue',
            dataType : 'json',
            type : "POST",
            success : function(data) {
                this.setState({phase:data})
            }.bind(this)
        });
        $.ajax({//学科
            url:'./data/findSubjectValue.json',
            //url: 'metaData/findSubjectValue',
            dataType : 'json',
            type : "POST",
            success : function(data) {
                this.setState({subject:data})
            }.bind(this)
        });
        $.ajax({//年级
            url:'./data/findBaseGrade.json',
            //url: 'textbookmg/findBaseGrade',
            dataType : 'json',
            type : "POST",
            success : function(data) {
                this.setState({grade:data})
            }.bind(this)
        });
        $.ajax({//出版社
            url:'./data/findTextBookVersionValue.json',
            //url: 'metaData/findTextBookVersionValue',
            dataType : 'json',
            type : "POST",
            success : function(data) {
                this.setState({textbookVersion:data})
            }.bind(this)
        });
        //册
        var postData ={
            phase :this.props.phase.id,
            grade :this.props.grade.id,
            subject :this.props.subject.id,
            textBookVersion :this.props.textbookVersion.id
        };
        $.ajax({
            url:'./data/findFascicule.json',
            //url: 'textbookmg/findFascicule',
            dataType : 'json',
            type : "POST",
            data : postData,
            success : function(data) {
                this.setState({fascicule:data});
            }.bind(this)
        });


    },
    uploadImg:function(){

        var type = this.refs.uploadImg.value.split('.');
        if(type[type.length-1] == 'jpg' ||type[type.length-1] == 'png' ||type[type.length-1] == 'gif' || type[type.length-1] == 'jpeg' ){
            var fd = new FormData(this.refs.uploadImgFrom);
            $.ajax({
                url:'textbookmg/uploadImage',
                type:'POST',
                data:fd,
                processData: false,  // 告诉jQuery不要去处理发送的数据
                contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
                success:function(data){
                    TextBookActions.updateTextbook(data,null,'imgUrl')
                }.bind(this),
                error:function(){
                    bootbox.alert('上传图片失败');
                }

            })

        }else if(type[0] !=""){
            bootbox.alert('上传文件类型错误');
            return;
        }

    },
    showSectionList:function(){
        if( this.refs.fascicule.value!="" && this.refs.year.value!=""){
            this.props.showSection();
        }
    },
    updateInformation:function(e){
        var inforName = e.target.name;
        var eId = e.target.value;
        var index = e.target.selectedIndex; // 选中索引
        var text = e.target.options[index].text; // 选中文本
        if(this.refs.subject.value!="" && this.refs.phase.value!="" && this.refs.grade.value!="" && this.refs.textbookVersion.value!="" ){

            this.showSectionList();
        }
        if(eId !=""){
            var obj={};
            obj['error_'+inforName]=false;
            this.setState(obj)
        }

        TextBookActions.updateTextbook(eId,text,inforName);

    },
    render:function(){

        var content;
        var imgUpdate;
        if(!this.props.imgUrl){
            imgUpdate=(<form ref="uploadImgFrom"><div className="updateImg"><a>点击上传教材封面</a><input name="imgFile" type="file" onChange={this.uploadImg} ref="uploadImg"/></div></form>);
        }else{
            imgUpdate=(<form ref="uploadImgFrom"><div className="updateImg"><img src={this.props.imgUrl} /><input name="imgFile" type="file" onChange={this.uploadImg} ref="uploadImg"/></div></form>);
        }
        content=(
            <div className="information">
                <h1>教材创建及编辑</h1>
                <section  className="clearfix">
                    <h2 className="col-sm-1 no-margin no-padding">基本信息填写</h2>
                    <div className="form col-sm-9 no-margin no-padding">
                        <div className="col-sm-12">
                            <div className="col-sm-4">
                                <label>*</label>
                                <select name="subject" ref="subject" onChange={this.updateInformation} value={this.props.subject.id ||""}>
                                    <option value="">学科选择</option>
                                    {
                                        this.state.subject.map(function(item,index){
                                            return <option value={item.keyCode} key={index}>{item.keyValue}</option>
                                        })
                                    }
                                </select>
                                <em className={this.state.error_subject?'show error':'error'}>请选择学科！</em>
                            </div>
                            <div className="col-sm-4">
                                <label>*</label>
                                <select  name="phase" ref="phase" onChange={this.updateInformation} value={this.props.phase.id ||""}>
                                    <option value="">学段选择</option>
                                    {
                                        this.state.phase.map(function(item,index){
                                            return <option value={item.keyCode} key={index}>{item.keyValue}</option>
                                        })
                                    }
                                </select>
                                <em className={this.state.error_phase?'show error':'error'}>请选择学段！</em>
                            </div>

                            <div className="col-sm-4">
                                <label>*</label>
                                <select  name="grade"  ref="grade" onChange={this.updateInformation}  value={this.props.grade.id ||""}>
                                    <option value="">年级选择</option>
                                    {
                                        this.state.grade.map(function(item,index){
                                            return <option value={item.keyCode} key={index}>{item.keyValue}</option>
                                        })
                                    }
                                </select>
                                <em className={this.state.error_grade?'show error':'error'}>请选择年级！</em>
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <div className="col-sm-4">
                                <label>*</label>
                                <select name="textbookVersion"  ref="textbookVersion" onChange={this.updateInformation}  value={this.props.textbookVersion.id ||""}>
                                    <option value="">出版社选择</option>
                                    {
                                        this.state.textbookVersion.map(function(item,index){
                                            return <option value={item.keyCode}  key={index}>{item.keyValue}</option>
                                        })
                                    }
                                </select>
                                <em className={this.state.error_textbookVersion?'show error':'error'}>请选择出版社！</em>
                            </div>
                            <div className="col-sm-4">
                                <label>*</label>
                                <select  name="fascicule"  ref="fascicule" onChange={this.updateInformation} value={this.props.fascicule.id ||""}>
                                    <option value="">册选择</option>
                                    {
                                        this.state.fascicule.map(function(item,index){
                                            return <option value={item.keyCode} key={index}>{item.keyValue}</option>
                                        })
                                    }
                                </select>
                                <em className={this.state.error_fascicule?'show error':'error'}>请选择册！</em>
                            </div>

                            <div className="col-sm-4">
                                <label>*</label>

                                <input id="dateinput"  ref="year" type="text" readOnly
                                       onChange={this.showSectionList}
                                       value={this.props.year}
                                       placeholder="点击选择时间" />
                                <em className={this.state.error_year?'show error':'error'}>请选择出版年份！</em>

                            </div>
                        </div>
                    </div>
                    <div className="col-sm-2 text-right  no-margin no-padding">
                        {imgUpdate}
                    </div>
                </section>

            </div>
        )


        return(
            <div>{content}</div>
        )
    }
})

module.exports = BasicFormEdit;
