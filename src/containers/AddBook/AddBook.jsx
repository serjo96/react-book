import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateBookForm, onAddBook, cleanForm, errorAddBook } from '../../actions/book-action';
import BookForm from '../../components/BookForm/BookForm';

class AddBook extends Component {
    onSubmit = (data) => {
        this.props.onAddBook(data);
    };

    render() {
        return (
			<div className="app__enter">
				<div className="add-form">
					<h1 className="app__title">Создай свой список книг!</h1>
					<BookForm
						submit={this.onSubmit}
						error={this.props.bookForm.error}
						errorAction={this.props.errorAddBook}
						formStatus={true}
					/>

				</div>
			</div>
        )
    }
}

const mapStateToProps = (state) => ({
    bookForm: state.addBook
});

export default connect(mapStateToProps, { updateBookForm, onAddBook, cleanForm, errorAddBook })(AddBook)
