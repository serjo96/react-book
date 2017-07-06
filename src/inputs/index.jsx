import React, { Component } from 'react';

const random = Math.floor(Math.random() * (150 - 1) + 1);
export default class Inputs extends Component {
    constructor(props) {
        super(props);
        this.onInputChange = this.onInputChange.bind(this);
        this.takeVal = this.takeVal.bind(this);
        this.CheckImg = this.CheckImg.bind(this);
        this.state = {
            id: '',
            author: '',
            name: '',
            inputA: '',
            inputN: '',
            file: '',
            imagePreviewUrl: '',
            imageStatus: '',
            imgMessageClass: 'dz-message',
            imgInfoClass: 'dz-info',
            imgParentClass: 'img-load-preview'
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

        this.state.inputA.value = '';
        this.state.inputN.value = '';

    }

    onInputChange(e){
        (e.target.classList.contains('inputs-book__name')) ? this.setState({ name: e.target.value, inputN: e.target }) : this.setState({ author: e.target.value, inputA: e.target})
    }

    takeVal() {
        if(this.state.author.length !== 0 && this.state.name.length !== 0 && this.state.imagePreviewUrl.length !== 0){
            this.props.addBook({
                id: random.toString(),
                author: this.authorInput.value,
                name: this.nameInput.value,
                imgUrl: this.state.imagePreviewUrl
            });
            this.setState({
                imgMessageClass: 'dz-message',
                imagePreviewUrl: '',
                imgParentClass: 'img-load-preview'
            });
            this.clearInputs();
        }else {
            this.setState({
                imgInfoClass: 'dz-info dz-error',
                imageStatus: 'Заполните все поля и загрузите обложку!'
            });
            setTimeout(()=> this.setState({imageStatus: '', imgInfoClass: 'dz-info'}), 2500);
        }
    }


    _handleImageChange(e) {
            e.preventDefault();
            let reader = new FileReader();
            let file = e.target.files[0];
            reader.onloadend = () => {
                this.setState({
                    file: file,
                    imagePreviewUrl: reader.result,
                    imageStatus: 'loading'
                });
            };
            reader.readAsDataURL(file);
            e.target.value = '';
    }

    drawImg(){
        const {imagePreviewUrl, file} = this.state;
        if (imagePreviewUrl) {
           return <div key="162" className="imgPreview">
               <div className="imgPreview__info">
                   <div>{file.name}</div>
                   <div>{this.formatBytes(file.size)}</div>
               </div>
               <img className="img-checking" src={imagePreviewUrl} onLoad={this.CheckImg} />
           </div>
        }
    }

    CheckImg(e){
        if(e.target.width === 140 && e.target.height === 205){
            this.setState({
                imageStatus: 'Обложка успешно загружена',
                imgInfoClass: 'dz-info dz-success',
                imgMessageClass: 'is--hide',
                imgParentClass: 'img-load-preview img--loaded'
            });
            setTimeout(()=> this.setState({imageStatus: '', imgInfoClass: 'dz-info'}), 2500);
            e.target.parentNode.classList.add('is--checked');
            e.target.classList.remove('img-checking');
        }else{
            e.target.parentNode.classList.remove('is--checked');
            e.target.src = '';
            this.setState({imageStatus: 'Обложка должна быть 140х205', imgInfoClass: 'dz-info dz-error'});
            setTimeout(()=> this.setState({imageStatus: '', imgInfoClass: 'dz-info'}), 2500);
        }
    }


    render() {
        return (
            <div className="app__enter">
                <div className="inputs-filds">

                    <h1 className="app__title">Создай свой список книг!</h1>

                    <div className="inputs-book">
                        <input ref={(input) => { this.authorInput = input }} onChange={this.onInputChange} className="inputs-book__author" placeholder="Автор" type="text" />
                        <input ref={(input) => { this.nameInput = input }} onChange={this.onInputChange} className="inputs-book__name" placeholder="Название" type="text" />
                    </div>

                    <div className={this.state.imgParentClass}
                         onDragOver={(e)=> e.target.parentNode.classList.add("is--hover")}
                         onDragLeave={(e)=> e.target.parentNode.classList.remove('is--hover')}
                        >
                        <input className="add-file-input" type="file" accept=".jpg,.png" onChange={(e)=>this._handleImageChange(e)} />
                        {this.drawImg()}
                        <div className={this.state.imgMessageClass}>Drop files here or click to upload.</div>
                        <div className={this.state.imgInfoClass}>{this.state.imageStatus}</div>
                    </div>

                </div>

                <div className="button-wrap">
                    <button className="btn-add-book" onClick={this.takeVal}>Добавить книгу</button>
                </div>
            </div>
        )
    }
}
