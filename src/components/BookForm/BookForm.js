import React, { Component } from 'react';

class BookForm extends Component {
    render() {
            return (
                <div>
                    <div className="inputs-book">
                        <input
                            onChange={this.props.onInputChange}
                            name="author"
                            placeholder="Автор"
                            type="text"
                            value={this.props.author}
                        />
                        <input
                            onChange={this.props.onInputChange}
                            name="name"
                            placeholder="Название"
                            type="text"
                            value={this.props.name}
                        />
                    </div>
                    <input
                        id="fileUpload"
                        className="add-file-input"
                        type="file"
                        accept=".jpg,.png"
                        onChange={(e) => this.props._handleImageChange(e.target)}
                    />
                    <label htmlFor="fileUpload">
                        <div className="img-load-preview"
                             onDragOver={(e) => this.props.dragover(e)}
                             onDragEnter={(e) => this.props.dragenter(e)}
                             onDrop={(e) => this.props.drop(e)}
                             onDragLeave={(e) => this.props.dragLeave(e)}
                        >
                            <img src={this.props.imgUrl} />
                            {this.props.drawImg()}
                            <div className={this.props.imgMessageClass}>Drop files here or click to upload.</div>
                            <div className={this.props.imgInfoClass}>{this.props.imageStatusMessage}</div>
                        </div>
                    </label>
                </div>
            );
    }
}

export default BookForm;