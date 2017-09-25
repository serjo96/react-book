import React, { Component } from 'react';
import { connect } from 'react-redux'
import  { onSelectBook, errorAddBook, onAddBook } from '../../actions/book-action'
import BookForm from '../../components/BookForm/BookForm';

class Book extends Component {

    onSubmit = (data) => {
        this.props.onSelectBook(-1);
        this.props.onAddBook(data);
    };

	render() {
		const { changeBookForm } = this.props;
		if (this.props.selectBook === -1){
			return null;
		}
		return (
			<div>
				<div className="change-book">
					<BookForm
						submit={this.onSubmit}
						author={changeBookForm.author}
						name={changeBookForm.name}
						subtitle={changeBookForm.subtitle}
						id={changeBookForm.id}
						img={changeBookForm.img}
						imgData={changeBookForm.imgData}
						indexBook={changeBookForm.index}
						error={changeBookForm.error}
						errorAction={this.props.errorAddBook}
						formStatus={false}
					/>

				</div>
			</div>
		)
	}
}

function mapStateToProps (state) {
	return {
		selectBook: state.selectBook,
		changeBookForm: state.changeBookFrom
	}
}


const mapDispatchToProps = (dispatch) => ({
    onSelectBook: (params) => dispatch(onSelectBook(params)),
    errorAddBook: (params) => dispatch(errorAddBook(params)),
    onAddBook: (params) => dispatch(onAddBook(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(Book)
