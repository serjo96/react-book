import React, { Component } from 'react';
import { connect } from 'react-redux'
import  { onSelectBook, changeBook } from '../../actions/book'
// import BookItem from '../../components/Book/BookItem';
import BookForm from '../../components/BookForm/BookForm';

class Book extends Component {
	onChangeInput = (e) => {
        this.props.changeBook({ ...e, index: this.props.selectBook });
	};

	render() {
		const { selectBook, books } = this.props;
		if (this.props.selectBook === -1){
			return null;
		}
		return (
			<div className="change-book">
				{/*<BookItem*/}
					{/*author={books[selectBook].author}*/}
					{/*name={books[selectBook].name}*/}
					{/*id={books[selectBook].id}*/}
					{/*img={books[selectBook].imgUrl}*/}
				{/*/>*/}
				<BookForm
					onInputChange={this.onChangeInput}
					author={books[selectBook].author}
					name={books[selectBook].name}
					subtitle={books[selectBook].subtitle}
					id={books[selectBook].id}
					imgUrl={books[selectBook].imgUrl}
				/>
				<div className="button-wrap">
					<button className="btn-add-book" onClick={() => this.props.onSelectBook(-1)}>Скрыть</button>
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
    changeBook: (params) => dispatch(changeBook(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(Book)
