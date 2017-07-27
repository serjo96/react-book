import React, { Component } from 'react';
import { formatBytes } from '../../utils/formsUtils'

class BookForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageStatusMessage: '',
            imgStatus: true,
            imgMessageClass: 'dz-message',
            imgInfoClass: 'dz-info'
        }
    }

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

  /*  CheckImg = (e) => {
        if(e.target.width === 140 && e.target.height === 205){
            this.setState({
                imageStatusMessage: 'Обложка успешно загружена',
                imgInfoClass: 'dz-info dz-success',
                imgMessageClass: 'is--hide',
                imgStatus: true
            });
            setTimeout(()=> this.setState({imageStatusMessage: '', imgInfoClass: 'dz-info'}), 2500);
            e.target.parentNode.classList.add('is--checked');
            e.target.classList.remove('img-checking');
        }else{
            e.target.parentNode.classList.remove('is--checked');
            this.setState({
                imgStatus: false,
                imageStatusMessage: 'Обложка должна быть 140х205',
                imgInfoClass: 'dz-info dz-error',
                imgMessageClass: 'dz-message'
            });
            setTimeout(()=> this.setState({
                imageStatusMessage: '',
                imgInfoClass: 'dz-info'
            }), 2500);
        }
    };
    */

    _handleImageChange = (e) => {
        let reader = new FileReader();
        let file = e.files[0];
        this.setState({
            imageStatusMessage: 'loading'
        });
        const _this = this;
        reader.onloadend = () => {
            let image = new Image();

            image.onload = function() {
                if (this.width === 140 && this.height === 205) {
                    _this.props.onInputChange({  key: 'img',  value: { data: reader.result, fileName: file.name, fileSize: file.size } });
                    {_this.props.errorAction({info:'Обложка успешно загружена', classInfo:'dz-info dz-success'});}
                } else {
                    {_this.props.errorAction({info:'Обложка должна быть 140х205', classInfo:'dz-info dz-error'});}
                }
            };
            image.src = reader.result;
        };
        reader.readAsDataURL(file);
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
        console.log(this.props);
            return (
                <div className="add-book-form">
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
                            placeholder="Заголовок"
                            type="text"
                            value={this.props.name}
                        />
                        <input
                            onChange={this.props.onInputChange}
                            type="text"
                            name="subtitle"
                            placeholder="Подзаголовок"
                            value={this.props.subtitle}
                        />
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
                            {!this.props.img.data && <div className={this.state.imgMessageClass}>Drop files here or click to upload.</div>}
                            <div className={this.state.imgInfoClass}>{this.state.imageStatusMessage}</div>
                        </div>
                    </label>
                </div>
            );
    }
}

export default BookForm;