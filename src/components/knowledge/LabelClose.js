var React = require('react');

var LabelClose = React.createClass({

    _closeAction: function (event) {
        "use strict";
        this.props.closeAction(this.props.id);
        event.preventDefault();
        event.stopPropagation();
    },

    _clickHandler: function (event) {
        "use strict";
        if (this.props.selectAction != undefined) {
            this.props.selectAction();
        }

        event.preventDefault();
        event.stopPropagation();
    },

    render: function () {
        "use strict";
        var name = this.props.name;

        var isView = this.props.isView;
        var close;

        if (!isView && !this.props.firstNoDel) {
            close = (<span className="close-btn icon-remove" onClick={this._closeAction}></span>);
        }

        return (
            <div className="label-custom" onClick={this._clickHandler}>
                <span>{name}</span>
                {close}
            </div>
        );
    }
});

module.exports = LabelClose;