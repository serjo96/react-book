import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateBookForm, onAddBook, cleanForm, errorAddBook } from '../../actions/book-action';
import BookForm from '../../components/BookForm/BookForm';

class AddBook extends Component {

    /* takeVal = () => {
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
    */


    onSubmit = () => {
    	console.warn(this.props.bookForm);
        this.props.onAddBook(this.props.bookForm);
    };
    render() {
        return (
			<div className="app__enter">
				<div className="inputs-filds">
					<h1 className="app__title">Создай свой список книг!</h1>
					<BookForm
						onInputChange={this.props.updateBookForm}
						author={this.props.bookForm.author}
						name={this.props.bookForm.name}
						subtitle={this.props.bookForm.subtitle}
						img={this.props.bookForm.img}
						error={this.props.bookForm.error}
						errorAction={this.props.errorAddBook}
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
    change: state.changesData,
    bookForm: state.addBook
});

export default connect(mapStateToProps, { updateBookForm, onAddBook, cleanForm, errorAddBook })(AddBook)
