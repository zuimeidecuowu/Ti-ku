/**
 * Created by Administrator on 2016/1/7.
 */
var React = require('react');

var PagePlugIn = React.createClass({
    propTypes:{
        total:React.PropTypes.number.isRequired
    },
    componentWillReceiveProps:function(nextProps){
        if(this.props.total === nextProps.total) return;
        this.setState({
            pageNums:Math.ceil(nextProps.total/10)>1?Math.ceil(nextProps.total/10):1});
    },
    getInitialState:function(){
       return{
           nowPage:1,
           pageSize:10,
           pageNums:Math.ceil(this.props.total/10)>1?Math.ceil(this.props.total/10):1
       }
   },
   PropsChange:function(pageObj){
       if(!this.props.onChange) return;
       this.props.onChange(pageObj);
   },
   render:function(){
        var pageList=(
          <div>当前第<input type="text" onChange={this.pageChange} value={this.state.nowPage} />页/共{this.state.pageNums}页</div>
        );
       var pageSizeSelect=(
           <div>
               <select onChange={this.pageSizeChange} value={this.state.pageSize}>
                   <option value="10">10</option>
                   <option value="20">20</option>
                   <option value="30">30</option>
               </select>
           </div>
       );
        return(
            <div className="pagePlugIn">
                <a className={this.state.nowPage<=1?'disabled':''} disabled={this.state.nowPage<=1?'disabled':''}  onClick={this.goToFirst}>&laquo;</a>
                <a className={this.state.nowPage<=1?'disabled':''} disabled={this.state.nowPage<=1?'disabled':''} onClick={this.goToPrev}>&lt;</a>
                {pageList}
                <a className={this.state.nowPage>=this.state.pageNums?'disabled':''} disabled={this.state.nowPage>=this.state.pageNums?'disabled':''} onClick={this.goToNext}>&gt;</a>
                <a className={this.state.nowPage>=this.state.pageNums?'disabled':''} disabled={this.state.nowPage>=this.state.pageNums?'disabled':''} onClick={this.goToLast}>&raquo;</a>
                {pageSizeSelect}
            </div>
        )
   },
    pageChange:function(evt){
        var val = Number(evt.target.value);
        if(isNaN(val)){
            return false;
        }else{
            if(val>this.state.pageNums || val===0)
                return false;
            this.setState({nowPage:val});
            this.PropsChange({
                nowPage:val,
                pageSize:this.state.pageSize,
                pageNums:this.state.pageNums
            });
        }


    },
    pageSizeChange:function(evt){
        var pageSize = Number(evt.target.value);
        var pageNums = Math.ceil(this.props.total/pageSize);
        pageNums=pageNums>1?pageNums:1;
        this.setState({pageSize:pageSize,pageNums:pageNums, nowPage:1});
        this.PropsChange({
            nowPage:1,
            pageSize:pageSize,
            pageNums:pageNums
        });
    },
    goToFirst:function(evt){
        var disabled = evt.target.attributes.disabled;
        if(disabled!=undefined)return;
        this.setState({nowPage:1});
        this.PropsChange({
            nowPage:1,
            pageSize:this.state.pageSize,
            pageNums:this.state.pageNums
        });
    },
    goToPrev:function(evt){
        var disabled = evt.target.attributes.disabled;
        if(disabled!=undefined) return;
        var nowPage = this.state.nowPage;
        this.setState({nowPage:nowPage-1});
        this.PropsChange({
            nowPage:nowPage-1,
            pageSize:this.state.pageSize,
            pageNums:this.state.pageNums
        });
    },
    goToNext:function(evt){
        var disabled = evt.target.attributes.disabled;
        if(disabled!=undefined) return;
        var nowPage = this.state.nowPage;
        this.setState({nowPage:nowPage+1});
        this.PropsChange({
            nowPage:nowPage+1,
            pageSize:this.state.pageSize,
            pageNums:this.state.pageNums
        });
    },
    goToLast:function(evt){
        var disabled = evt.target.attributes.disabled;
        if(disabled!=undefined) return;
        this.setState({nowPage:this.state.pageNums});
        this.PropsChange({
            nowPage:this.state.pageNums,
            pageSize:this.state.pageSize,
            pageNums:this.state.pageNums
        });
    }
});
module.exports=PagePlugIn;
