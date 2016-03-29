/**
 * Created by Administrator on 2016/1/6.
 */
var React = require('react');
var TextBookList = React.createClass({
    getInitialState:function(){
        return{
            subject:[],
            grade:[],
            textbookVersion:[],
            fascicule:[],
            subjectId:'',
            gradeId:'',
            textbookVersionId:'',
            fasciculeId:''
        }
    },
    componentDidMount:function(){
        var _this = this;
        var grid_selector = "#dataTable";
        var pager_selector = "#grid-pager";
        jQuery(grid_selector).jqGrid({
            datatype: "json", //将这里改为使用JSON数据
            url:'textbookmg/textbooks', //这是Action的请求地址
            mtype: 'POST',
            height:450  ,
            colNames:['ID', '学科','出版社','年级','上下册','出版年月','状态','操作'],
            colModel:[
                {name: 'id',index:'id', width:60,  sorttype:"int", editable: false,hidden:true},
                {name: 'subjectName',index:'subjectName', hidden:false, width:60, editable: false},
                {name: 'textbookVersionName',index:'textbookVersionName',editable: true},
                {name: 'gradeName',index:'gradeName', hidden:false, width:60, editable: false},
                {name: 'fasciculeName',index:'fasciculeName',editable: true},
                {name: 'publishTime',index:'publishTime', hidden:false, width:60, editable: true,formatter:function(cellvalue, options, rowObject){

                    var year = cellvalue.substr(0,4);
                    var month =cellvalue.substr(5,2);
                    return year+"年"+month+"月";
                }},
                {name: 'status',index:'status', width:60,editable: true,formatter:function(cellvalue, options, rowObject){
                    if("1"==cellvalue){
                        return "启用"
                    }else{
                        return "禁用"
                    }
                }},
                {name: 'act', index: 'act', hidden: false, width: 60,  editable: false,formatter:function(cellvalue, options, rowObject){

                    var se = "<i style='height:30px;width:70px;line-height:30px;margin-left:5px;color:#72b4de;font-size:16px;cursor:pointer;' " +
                            "class='icon-eye-open chosenTextbook' value='选择' name="+rowObject.id+"  ></i>";
                    return se;
                }}
            ],
            viewrecords : true,
            rowNum:10,
            rowList:[10,20,30],
            pager : pager_selector,
            altRows: true,
            //toppager: true,
            multiselect: false,
            //multikey: "ctrlKey",
            multiboxonly: true,
            //rownumbers:true,
            loadComplete : function() {
                var table = this;
                $(".chosenTextbook").on('click',function(){
                    _this.viewTextbook($(this).attr('name'));
                })
                var total=$(".ui-paging-info").text().split("/");
                if(total!='没有数据记录'){
                    $("#total").empty();
                    $("#total").append(total[1]);
                } else{
                    $("#total").empty();
                    $("#total").append(0);
                }
                setTimeout(function(){
                    updatePagerIcons(table)
                },0)
            },
            caption: "",
            ajaxSelectOptions: {type: "post"},
            autowidth: true
        });
        function updatePagerIcons(table) {
            var replacement =
            {
                'ui-icon-seek-first' : 'icon-double-angle-left bigger-120',
                'ui-icon-seek-prev' : 'icon-angle-left bigger-120',
                'ui-icon-seek-next' : 'icon-angle-right bigger-120',
                'ui-icon-seek-end' : 'icon-double-angle-right bigger-120'
            };
            $('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function(){
                var icon = $(this);
                var $class = $.trim(icon.attr('class').replace('ui-icon', ''));
                if($class in replacement) icon.attr('class', 'ui-icon '+replacement[$class]);
            })
        }
        $.ajax({
            url: 'metaData/findSubjectValue',
            dataType : 'json',
            type : "POST",
            success : function(data) {
                this.setState({subject: data});
            }.bind(this)
        });
        $.ajax({
            url: 'textbookmg/findBaseGrade',
            dataType : 'json',
            type : "POST",
            success : function(data) {
                this.setState({grade: data});
            }.bind(this)
        });
        $.ajax({
            url: 'metaData/findTextBookVersionValue',
            dataType : 'json',
            type : "POST",
            success : function(data) {
                this.setState({textbookVersion: data});
            }.bind(this)
        });
    },
    render:function(){
        return(
            <div id="textBookListDialog">
                <div className="DialogCon">
                    <header>
                        教材列表<a onClick={this.closeDialog}><i className="icon-remove"></i></a>
                    </header>
                    <div className="col-sm-12">
                        <form className="form-inline">
                            <div className="inline ">
                                <select ref="subject" name="subject" onChange={this.selectChange} >
                                    <option value="">请选择学科</option>
                                    {
                                        this.state.subject.map(function(item,index){
                                            return(<option value={item.keyCode} key={index}>{item.keyValue}</option>)
                                        })
                                    }
                                </select>
                            </div>
                            <div className="inline">
                                <select ref="grade"  name="grade" onChange={this.selectChange} >
                                    <option value="">请选择年级</option>
                                    {
                                        this.state.grade.map(function(item,index){
                                            return(<option value={item.keyCode} key={index}>{item.keyValue}</option>)
                                        })
                                    }
                                </select>
                            </div>
                            <div className="inline">
                                <select ref="textbookVersion" onChange={this.selectChange} name="textbookVersion">
                                    <option value="">请选择出版社</option>
                                    {
                                        this.state.textbookVersion.map(function(item,index){
                                            return(<option value={item.keyCode} key={index}>{item.keyValue}</option>)
                                        })
                                    }
                                </select>
                            </div>
                            <div className="inline">
                                <select value={this.state.fasciculeId} onChange={this.selectChange}  name="fascicule">
                                    <option value="">请选择册</option>
                                    {
                                        this.state.fascicule.map(function(item,index){
                                            return(<option value={item.keyCode} key={index}>{item.keyValue}</option>)
                                        })
                                    }
                                </select>
                            </div>
                            <div className="inline width-23">
                                <button className="button" type="button" onClick={this.freshTable} id="dosearch">
                                    查询
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="col-sm-12 ">
                        <table id="dataTable"></table>
                        <div id="grid-pager"></div>
                    </div>
                </div>
            </div>
        )
    },
    freshTable:function(){
        var grid_selector = "#dataTable";
        var postData ={
            subjectId:this.state.subjectId,
            gradeId:this.state.gradeId,
            textbookVersionId:this.state.textbookVersionId,
            fasciculeId:this.state.fasciculeId
        };
        $(grid_selector).jqGrid("setGridParam",{page:1,datatype:'json',postData:postData}).trigger("reloadGrid");
    },
    selectChange:function(evt){
        var name = evt.target.name;
        var obj ={};
        var val = evt.target.value;
        obj[name+'Id']=val;

        if(name!== 'fascicule'){
            var postData ={
                phase : "",
                grade : this.refs.grade.value,
                subject :this.refs.subject.value,
                textBookVersion : this.refs.textbookVersion.value
            };
            $.ajax({
                url: 'textbookmg/findFasciculeValue',
                dataType : 'json',
                type : "POST",
                data : postData,
                success : function(data) {
                    this.setState({fascicule: data,fasciculeId:''});
                }.bind(this)
            });
        }
        this.setState(obj);
    },
    viewTextbook:function(textBookId){
        this.props.onChange(textBookId);
    },
    closeDialog:function(){
        this.props.onChange(false);
    }
});

module.exports=TextBookList;
