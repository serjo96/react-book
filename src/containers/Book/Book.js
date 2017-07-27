import React, { Component } from 'react';
import { connect } from 'react-redux'
import  { onSelectBook, updateChangeBookForm, errorAddBook, onAddBook } from '../../actions/book-action'
import BookForm from '../../components/BookForm/BookForm';

class Book extends Component {

    onSubmit = () => {
        this.props.onSelectBook(-1);
        console.log(this.props.books);
        this.props.onAddBook(this.props.books);
    };

	render() {
		const { books } = this.props;
		if (this.props.selectBook === -1){
			return null;
		}
		return (
			<div>
				<div className="modal-wrapper"/>
				<div className="change-book">
					<BookForm
						onInputChange={this.props.updateChangeBookForm}
						author={books.author}
						name={books.name}
						subtitle={books.subtitle}
						id={books.id}
						img={books.img}
						error={books.error}
						errorAction={this.props.errorAddBook}
					/>
					<div className="button-wrap">
						<button className="btn-add-book" onClick={() => this.onSubmit()}>Сохранить изменения</button>
					</div>
				</div>
			</div>
		)
	}
}

function mapStateToProps (state) {
	return {
		selectBook: state.selectBook,
		books: state.changeBookFrom
	}
}


const mapDispatchToProps = (dispatch) => ({
    onSelectBook: (params) => dispatch(onSelectBook(params)),
    updateChangeBookForm: (params) => dispatch(updateChangeBookForm(params)),
    errorAddBook: (params) => dispatch(errorAddBook(params)),
    onAddBook: (params) => dispatch(onAddBook(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(Book)
