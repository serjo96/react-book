import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateBookForm, onAddBook, cleanForm, errorAddBook } from '../../actions/book-action';
import BookForm from '../../components/BookForm/BookForm';

class AddBook extends Component {


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
					<button className="btn-add-book btn-aqua" onClick={this.onSubmit}>Добавить книгу</button>
				</div>
			</div>
        )
    }
}

const mapStateToProps = (state) => ({
    bookForm: state.addBook
});

export default connect(mapStateToProps, { updateBookForm, onAddBook, cleanForm, errorAddBook })(AddBook)
