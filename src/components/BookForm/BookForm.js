import React, { Component } from 'react';
import { formatBytes } from '../../utils/formsUtils'

class BookForm extends Component {

    drawImg = () => {
        if (this.props.img.data) {
            return <div className="imgPreview is--checked" onClick={(e) => e.preventDefault()}>
                <div className="imgPreview__info">
                    <div>{this.props.img.fileName}</div>
                    <div>{formatBytes(this.props.img.fileSize)}</div>
                </div>
                <img className="dz-image" src={this.props.img.data} onLoad={this.CheckImg} />
            </div>
        } else {
            return null
        }
    };

    _handleImageChange = (e) => {
        let reader = new FileReader();
        let file = e.files[0];
        const _this = this;
        if (file && file.type.match('image.*')) {
            reader.onloadend = () => {
                let image = new Image();

                image.onload = function() {
                    if (this.width === 140 && this.height === 205) {
                        _this.props.onInputChange({  key: 'img',  value: { data: reader.result, fileName: file.name, fileSize: file.size } });
                        {_this.props.errorAction({info:'Обложка успешно загружена', classInfo:'dz-info dz-success'});}
                        e.value = '';
                    } else {
                        {_this.props.errorAction({info:'Обложка должна быть 140х205', classInfo:'dz-info dz-error'});}
                    }
                };
                image.src = reader.result;
            };
            reader.readAsDataURL(file);
        }

    };

    drop(e) {
        e.stopPropagation();
        e.preventDefault();
        if (e.target.className.indexOf('img-load-preview') === 0 || e.target.className.indexOf('dz-message') === 0) {
            e.target.closest('.img-load-preview').classList.remove("is--hover")
        }
        const dt = e.dataTransfer;
        this._handleImageChange(dt)
    }
    dragenter(e) {
        e.stopPropagation();
        e.preventDefault();
    }
    dragover(e) {
        e.stopPropagation();
        e.preventDefault();
        if (e.target.className.indexOf('img-load-preview') === 0 || e.target.className.indexOf('imgPreview') === 0 || e.target.className.indexOf('dz-message') === 0 || e.target.className.indexOf('dz-image') === 0) {
            e.target.closest('.img-load-preview').classList.add("is--hover")
        }
    }
    dragLeave(e){
        if (e.target.className.indexOf('img-load-preview') === 0 || e.target.className.indexOf('dz-message') === 0) {
            e.target.closest('.img-load-preview').classList.remove("is--hover")
        }
    }


    render() {
            return (
                <div className="add-book-form">
                    <div className="inputs-book">
                        <div className="form-input-wrap inputs-book__author">
                            <input
                                onChange={this.props.onInputChange}
                                className="inputs-book__author"
                                name="author"
                                placeholder="Автор"
                                type="text"
                                value={this.props.author}
                            />
                        </div>

                        <div className="form-input-wrap inputs-book__name">
                            <input
                                onChange={this.props.onInputChange}
                                className="inputs-book__name"
                                name="name"
                                placeholder="Заголовок"
                                type="text"
                                value={this.props.name}
                            />
                        </div>

                        <div className="form-input-wrap inputs-book__subtitle">
                            <input
                                onChange={this.props.onInputChange}
                                className="inputs-book__subtitle"
                                type="text"
                                name="subtitle"
                                placeholder="Подзаголовок"
                                value={this.props.subtitle}
                            />
                        </div>
                    </div>

                    <input
                        id={this.props.id ? "fileUpdate" : "fileUpload"}
                        className="add-file-input"
                        type="file"
                        accept=".jpg,.png"
                        onChange={(e) => this._handleImageChange(e.target)}
                    />
                    <div className={this.props.error.classInfo}>{this.props.error.info}</div>
                    <label htmlFor={this.props.id ? "fileUpdate" : "fileUpload"}>
                        <div className="img-load-preview"
                             onDragOver={(e) => this.dragover(e)}
                             onDragEnter={(e) => this.dragenter(e)}
                             onDrop={(e) => this.drop(e)}
                             onDragLeave={(e) => this.dragLeave(e)}
                        >
                            {this.drawImg()}
                            {!this.props.img.data && <div className="dz-message">Drop files here or click to upload.</div>}
                        </div>
                    </label>
                </div>
            );
    }
}

export default BookForm;