import React, { Component } from 'react';
import { connect } from 'react-redux';
import DropZone from "./dropZone";

class Inputs extends Component {
    constructor(props) {
        super(props);
        this.onInputChange = this.onInputChange.bind(this);
        this.takeVal = this.takeVal.bind(this);
        this.CheckImg = this.CheckImg.bind(this);
        this.test = this.test.bind(this);
        this.state = {
            id: '',
            author: '',
            name: '',
            file: '',
            imagePreviewUrl: null,
            imageStatusMessage: '',
            imgStatus: true,
            imgMessageClass: 'dz-message',
            imgInfoClass: 'dz-info'
        }
    }

    formatBytes(bytes, decimals) {
        if(bytes === 0) return '0 Bytes';
        let k = 1000,
            dm = decimals || 2,
            sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    clearInputs(){
        this.setState({
            author: '',
            name: ''
        })

    }

    onInputChange(e){
        (e.target.classList.contains('inputs-book__name')) ? this.setState({ name: e.target.value }) : this.setState({ author: e.target.value})
        e.preventDefault();
    }

    takeVal() {
        if(this.state.author.length !== 0 && this.state.name.length !== 0 && this.state.imagePreviewUrl){
            this.props.addBook({
                id: Math.floor(Math.random() * (250 - 1) + 1).toString(),
                author: this.state.author,
                name: this.state.name,
                imgUrl: this.state.imagePreviewUrl
            });
            this.setState({
                imgMessageClass: 'dz-message',
                imagePreviewUrl: '',
                imgStatus: false
            });
            this.clearInputs();
        }else {
            this.setState({
                imgInfoClass: 'dz-info dz-error',
                imageStatusMessage: 'Заполните все поля и загрузите обложку!'
            });
            setTimeout(()=> this.setState({
                imageStatusMessage: '',
                imgInfoClass: 'dz-info'
            }), 2500);
        }
    }


    _handleImageChange(e) {
        let reader = new FileReader();
        let file = e.files[0];
        this.setState({
            imageStatusMessage: 'loading'
        });
        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result,
                imgStatus: true
            });
        };
        reader.readAsDataURL(file);
    }

    drawImg(){
        const {imagePreviewUrl, file} = this.state;
        if (this.state.imgStatus) {
           return <div className="imgPreview" onClick={(e) => e.preventDefault()}>
               <div className="imgPreview__info">
                   <div>{file.name}</div>
                   <div>{this.formatBytes(file.size)}</div>
               </div>
                   <img className="dz-image img-checking" src={imagePreviewUrl} onLoad={this.CheckImg} />
           </div>
        } else {
            return null
        }
    }

    CheckImg(e){
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
    }

    test (){
        console.log(123)
        if(this.props.change){
        console.log(123)
            this.setState({
                author: this.props.change.author
            })
        }
    }

    dragenter(e) {
        e.stopPropagation();
        e.preventDefault();
    }

    dragover(e) {
        console.log(e.target)
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

     drop(e) {
        e.stopPropagation();
        e.preventDefault();
         if (e.target.className.indexOf('img-load-preview') === 0 || e.target.className.indexOf('dz-message') === 0) {
             e.target.closest('.img-load-preview').classList.remove("is--hover")
         }
        const dt = e.dataTransfer;
        this._handleImageChange(dt)
     }

    render() {

        if (!this.props.change) {
            return (
                <div className="app__enter">
                    <div className="inputs-filds">
                        <h1 className="app__title">Создай свой список книг!</h1>
                        <div className="inputs-book">
                            <input onChange={this.onInputChange} className="inputs-book__author" placeholder="Автор"
                                   type="text" value={this.state.author}/>
                            <input onChange={this.onInputChange} className="inputs-book__name" placeholder="Название"
                                   type="text" value={this.state.name}/>
                        </div>
                        <input id="fileUpload" className="add-file-input" type="file" accept=".jpg,.png" onChange={(e) => this._handleImageChange(e.target)}/>
                        <label htmlFor="fileUpload">
                        <div className="img-load-preview"
                             onDragOver={(e) => this.dragover(e)}
                             onDragEnter={(e) => this.dragenter(e)}
                             onDrop={(e) => this.drop(e)}
                             onDragLeave={(e) => this.dragLeave(e)}
                        >
                            {this.drawImg()}
                            <div className={this.state.imgMessageClass}>Drop files here or click to upload.</div>
                            <div className={this.state.imgInfoClass}>{this.state.imageStatusMessage}</div>
                        </div>
                        </label>
                        {/*<DropZone/>*/}
                    </div>

                    <div className="button-wrap">
                        <button className="btn-add-book" onClick={this.takeVal}>Добавить книгу</button>
                    </div>
                </div>
            )
        }else {
            return(
                <div>hello world</div>
            )
        }
    }
}

const mapStateToProps = (state) => ({
    change: state.changesData
});

export default connect(mapStateToProps)(Inputs)