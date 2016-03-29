/**
 * Created by Administrator on 2016/1/4.
 */
var React = require('react');

var StarsChosen = React.createClass({
    propTypes:{
        starsNums: React.PropTypes.number.isRequired
    },
    getInitialState:function(){
        return{point:this.props.point?this.props.point:0};
    },
    componentWillReceiveProps:function(nextProps){
        this.setState({point:nextProps.point});
    },
    render:function(){
        var starsList=[];
        for(var i=0;i<this.props.starsNums*2;i++){
            var className='';
            if(i+1<=this.state.point){
                className='select'
            }
            starsList.push(<li className={className}
                               onMouseOver={this.props.isView?this.noThing:this.mouseOver}
                                onClick={this.props.isView?this.noThing:this.starsChange}
                               value={i+1} key={i}></li>);
        }
        return(
            <div className="StarRating">
                <ul id="StarRating"  onMouseOut={this.props.isView?this.noThing:this.mouseOut}>
                    {starsList}
                </ul>
            </div>
        )
    },
    mouseOver:function(evt){
        var nums = evt.target.value;
        $("#StarRating").addClass('chosening');
        $("#StarRating li").each(function(){
            if($(this).attr('value')<nums){
                $(this).addClass('hover');
            }
        })
    },
    mouseOut:function(){
        $("#StarRating li").removeClass('hover');
        $("#StarRating").removeClass('chosening');
    },
    starsChange:function(evt){
        this.setState({point:evt.target.value});
        this.props.onChange(evt.target.value);
    },
    noThing:function(){
        return false;
    }
});
module.exports = StarsChosen;