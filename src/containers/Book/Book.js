import React, { Component } from 'react';
import { connect } from 'react-redux'
import  { onSelectBook, changeBook, updateBookForm } from '../../actions/book'
// import BookItem from '../../components/Book/BookItem';
import BookForm from '../../components/BookForm/BookForm';

class Book extends Component {

	onChangeInput = (e) => {
        this.props.changeBook({ ...e, index: this.props.selectBook });
		this.props.onSelectBook(-1);
	};

	render() {
		const { selectBook, books } = this.props;
		if (this.props.selectBook === -1){
			return null;
		}
		return (
			<div>
				{/*<BookItem*/}
					{/*author={books[selectBook].author}*/}
					{/*name={books[selectBook].name}*/}
					{/*id={books[selectBook].id}*/}
					{/*img={books[selectBook].imgUrl}*/}
				{/*/>*/}
				<div className="modal-wrapper"/>
				<div className="change-book">
					<BookForm
						onInputChange={this.props.updateBookForm}
						author={books[selectBook].author}
						name={books[selectBook].name}
						subtitle={books[selectBook].subtitle}
						id={books[selectBook].id}
						img={books[selectBook].img}
						error={books[selectBook].error}
						errorAction={books[selectBook].errorAddBook}
					/>
					<div className="button-wrap">
						<button className="btn-add-book" onClick={() => this.onChangeInput}>Сохранить изменения</button>
					</div>
				</div>
			</div>
		)
	}
}

function mapStateToProps (state) {
	return {
		selectBook: state.selectBook,
		books: state.books
	}
}


const mapDispatchToProps = (dispatch) => ({
    onSelectBook: (params) => dispatch(onSelectBook(params)),
    changeBook: (params) => dispatch(changeBook(params)),
    updateBookForm: (params) => dispatch(updateBookForm(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(Book)
