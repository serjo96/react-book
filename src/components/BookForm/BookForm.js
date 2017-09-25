import React, { Component } from 'react';
import { formatBytes } from '../../utils/formsUtils'

class BookForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            author: '',
            subtitle: '',
            imgUrl: '',
            imgData: '',
            imageStatusMessage: '',
            imgStatus: true,
            imgMessageClass: 'dz-message',
            imgInfoClass: 'dz-info'
        }
    }

    componentDidMount(){
        if(!this.props.formStatus){
            this.setState({
                name: this.props.name,
                author: this.props.author,
                subtitle: this.props.subtitle,
                imgUrl: this.props.img,
                imgData: this.props.imgData
            });
        }
    }

    sendData = () => {
        if(this.props.formStatus){
            this.props.submit({
                name: this.state.name,
                author: this.state.author,
                subtitle: this.state.subtitle,
                imgUrl: this.state.imgUrl,
                imgData: this.state.imgData,
                indexBook: this.props.indexBook
            });
        }else {
            this.props.submit({
                name: this.state.name,
                author: this.state.author,
                subtitle: this.state.subtitle,
                imgUrl: this.state.imgUrl,
                imgData: this.state.imgData,
                indexBook: this.props.indexBook,
                changeForm: true
            });
        }
        this.clearInputs();
    };

    clearInputs(){
        this.setState({
            author: '',
            name: '',
            subtitle: '',
            img: ''
        })

    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    drawImg = () => {
        if (this.state.imgUrl) {
            return <div className="imgPreview is--checked" onClick={(e) => e.preventDefault()}>
                <div className="imgPreview__info">
                    <div>{this.state.imgData.name}</div>
                    <div>{formatBytes(this.state.imgData.size)}</div>
                </div>
                <img className="dz-image" src={this.state.imgUrl}/>
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
                        _this.setState({
                            imgData: file,
                            imgUrl: reader.result
                         });
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
                                onChange={this.onInputChange}
                                className="inputs-book__author"
                                name="author"
                                placeholder="Автор"
                                type="text"
                                value={this.state.author}
                            />
                        </div>
                        <div className="form-input-wrap inputs-book__name">
                            <input
                                onChange={this.onInputChange}
                                className="inputs-book__name"
                                name="name"
                                placeholder="Заголовок"
                                type="text"
                                value={this.state.name}
                            />
                        </div>
                        <div className="form-input-wrap inputs-book__subtitle">
                            <input
                                onChange={this.onInputChange}
                                className="inputs-book__subtitle"
                                type="text"
                                name="subtitle"
                                placeholder="Подзаголовок"
                                value={this.state.subtitle}
                            />
                        </div>
                    </div>
                    <input
                        id={!this.props.formStatus ? "fileUpdate" : "fileUpload"}
                        className="add-file-input"
                        type="file"
                        accept=".jpg,.png"
                        onChange={(e) => this._handleImageChange(e.target)}
                    />
                    <div className={this.props.error.classInfo}>{this.props.error.info}</div>
                    <label htmlFor={!this.props.formStatus ? "fileUpdate" : "fileUpload"}>
                        <div className="img-load-preview"
                             onDragOver={(e) => this.dragover(e)}
                             onDragEnter={(e) => this.dragenter(e)}
                             onDrop={(e) => this.drop(e)}
                             onDragLeave={(e) => this.dragLeave(e)}
                        >
                            {this.drawImg()}
                            {!this.state.imgUrl && <div className="dz-message">Drop files here or click to upload.</div>}
                        </div>
                    </label>
                    {this.props.formStatus ?
                        <div className="button-wrap">
                            <button className="btn-add-book btn-aqua" onClick={this.sendData}>Добавить книгу</button>
                        </div>
                        :
                        <div className="button-wrap">
                            <button className="btn-add-book btn-aqua" onClick={this.sendData}>Сохранить изменения</button>
                        </div>
                    }

                </div>
            );
    }
}

export default BookForm;
