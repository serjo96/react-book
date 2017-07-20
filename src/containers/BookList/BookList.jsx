import React, { Component } from 'react';
import { connect } from 'react-redux'
import {loadLocalData, deleteBook, onSelectBook} from '../../actions/book'
import BookItem from '../../components/Book/BookItem';

class BookList extends Component {
	componentDidMount(){
		if (localStorage.getItem('items')) {
			const localItems = localStorage.getItem('items');
			this.props.loadLocalData(JSON.parse(localItems));
		}
	}
	onSave = () => {
		localStorage.setItem('items', JSON.stringify(this.props.books))
	};
	render() {
		console.warn(this.props);
		if(this.props.books.length > 0){
			return (
				<div className='book-list clearfix'>
					{this.props.books.map((item, index) =>
						(item.name.length === 0 && item.author.length === 0) ? null :
							<BookItem
								author={item.author}
								name={item.name}
								id={item.id}
								img={item.imgUrl}
								index={index}
								key={index}
								loadLocalData={loadLocalData}
								deleteBook={deleteBook}
								changeItem={this.props.onSelectBook}
								selected={this.props.selectBook === index}
							/>)
					}
					<button className="btn-save-list" onClick={this.onSave}>Сохранить список книг</button>
				</div>
			)
		}else {
			return(
				null
			)
		}
	}
}



function mapStateToProps (state) {
	return {
		books: state.books,
		selectBook: state.selectBook
	}
}


const mapDispatchToProps = (dispatch) => ({
    loadLocalData: (item) => dispatch(loadLocalData(item)),
    deleteBook: (item) => dispatch(deleteBook(item)),
    onSelectBook: (item) => dispatch(onSelectBook(item))
});


export default connect(mapStateToProps, mapDispatchToProps)(BookList)
