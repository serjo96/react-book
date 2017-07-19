import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateBookForm, addBook, cleanForm } from '../../actions/book';
import BookForm from '../../components/BookForm/BookForm';

class AddBook extends Component {
    constructor(props) {
        super(props);
        this.takeVal = this.takeVal.bind(this);
        this.CheckImg = this.CheckImg.bind(this);
        this.state = {
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

    onInputChange = (e) => {
        this.props.updateBookForm(e.target.name,  e.target.value);
    };

    takeVal() {
        if(this.state.author.length !== 0 && this.state.name.length !== 0 && this.state.imagePreviewUrl){
            if(!this.props.change){
                this.props.addBook({
                    id: Math.floor(Math.random() * (250 - 1) + 1).toString(),
                    author: this.state.author,
                    name: this.state.name,
                    imgUrl: this.state.imagePreviewUrl
                });
            }else{
                this.props.changeBook({
                    index: this.props.change.index,
                    id: Math.floor(Math.random() * (250 - 1) + 1).toString(),
                    author: this.state.author,
                    name: this.state.name,
                    imgUrl: this.state.imagePreviewUrl
                });
            }
            this.setState({
                imgMessageClass: 'dz-message',
                imagePreviewUrl: '',
                imgStatus: false
            });
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
    _handleImageChange = (e) => {
        let reader = new FileReader();
        let file = e.files[0];
        this.setState({
            imageStatusMessage: 'loading'
        });
        reader.onloadend = () => {
            this.props.updateBookForm('imgUrl',  reader.result);
            this.setState({
                file: file,
                imagePreviewUrl: reader.result,
                imgStatus: true
            });
        };
        reader.readAsDataURL(file);
    }

    drawImg(){
        /* const {imagePreviewUrl, file} = this.state;
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
        } */
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
    onSubmit = () => {
        this.props.addBook();
        this.props.cleanForm();
    };
    render() {
        return (
			<div className="app__enter">
				<div className="inputs-filds">
					<h1 className="app__title">Создай свой список книг!</h1>
					<BookForm
						onInputChange={this.onInputChange}
						author={this.props.bookForm.author}
						name={this.props.bookForm.name}
						imgUrl={this.props.bookForm.imgUrl}
						_handleImageChange={this._handleImageChange}
						dragover={this.dragover}
						dragenter={this.dragenter}
						drop={this.drop}
						dragLeave={this.dragLeave}
						drawImg={this.drawImg}
						imgMessageClass={this.state.imgMessageClass}
						imgInfoClass={this.state.imgInfoClass}
						imageStatusMessage={this.state.imageStatusMessage}
					/>
				</div>
				<div className="button-wrap">
					<button className="btn-add-book" onClick={this.onSubmit}>Добавить книгу</button>
				</div>
			</div>
        )
    }
}

const mapStateToProps = (state) => ({
    bookForm: state.addBook
});

export default connect(mapStateToProps, { updateBookForm, addBook, cleanForm })(AddBook)
