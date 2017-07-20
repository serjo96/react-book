import React, { Component } from 'react';
import { connect } from 'react-redux'
// import  {deleteBook, takeChanges} from '../../actions/book'
import BookItem from '../../components/Book/BookItem';

class Book extends Component {
	constructor(props) {
		super(props);

	}

	render() {
		const { selectBook, books } = this.props;
		if (this.props.selectBook === -1){
			return null;
		}
		return (
			<div>
				<BookItem
					author={books[selectBook].author}
					name={books[selectBook].name}
					id={books[selectBook].id}
					img={books[selectBook].imgUrl}
				/>
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


/* const mapDispatchToProps = (dispatch) => ({
	deleteBook: (params) => dispatch(deleteBook(params)),
	takeChanges: (params) => dispatch(takeChanges(params))
});
*/
export default connect(mapStateToProps)(Book)
