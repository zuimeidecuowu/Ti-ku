var React = require('react');
var Simditor = require('simditor');

var Editor = React.createClass({
    _contentChangeHandler: function (value) {
        "use strict";
        this.props.editorChange(value);
    },

    render: function () {
        "use strict";
        var content = this.props.content;
        if (this.editor) {
            this.editor.setValue('');
        }

        return (
            <div className="editor-custom">
                <div className="editor-custom-toolbar">
                    <button className="button green" onClick={this._insertFormula}>插入图片</button>
                    <form className="hide" ref="fileUpload">
                        <input type="file" accept="image/png,image/jpg" ref="input_file" name="input_file"
                               onChange={this._doFileUpload}/>
                    </form>
                </div>
                <textarea ref="editor" value={content} readOnly="readonly"></textarea>
            </div>
        );
    },

    _onChangeHandler: function (e) {
        "use strict";
        console.log(e.target.value);
    },

    _doFileUpload: function () {
        "use strict";
        var fd = new FormData(this.refs.fileUpload);
        var editor = this.editor;
        $.ajax({
            url: "knowledges/uploadImage",
            type: "POST",
            data: fd,
            dataType: "json",
            processData: false,  // 告诉jQuery不要去处理发送的数据
            contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
            success: function (data) {
                console.log(data);
                if (data.isOk) {
                    editor.setValue(editor.getValue() + '<img src="' + data.result + '">');
                    this._contentChangeHandler(editor.getValue());
                    editor.focus();
                }
            }.bind(this)
        });
    },

    _insertFormula: function () {
        "use strict";
        this.refs.input_file.click();
    },
    componentDidUpdate: function () {
        "use strict";
        this.editor.setValue(this.props.content);
    },

    componentDidMount: function () {
        "use strict";
        //获取editor.
        var textBox = this.refs.editor;
        var toolbar = ['image'];

        this.editor = new Simditor({
            textarea: $(textBox),
            toolbar: toolbar,
            toolbarHidden: true
        });
        this.editor.setValue(this.props.content);

        this.editor.on('blur', function () {
            console.log('blur');
            this._contentChangeHandler(this.editor.getValue());
        }.bind(this));
    },

    shouldComponentUpdate: function (nextProps) {
        "use strict";
        if (nextProps.content != this.props.content) {
            return true;
        } else {
            return false;
        }
    }
});

module.exports = Editor;