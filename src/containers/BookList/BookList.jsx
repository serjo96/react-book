import React, { Component } from 'react';
import { connect } from 'react-redux'
import {loadLocalData, deleteBook, onSelectBook, changeBookData, deleteAllBook} from '../../actions/book-action'
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

    onDelete = () => {
		this.props.deleteAllBook();
		this.props.onSelectBook(-1);
        localStorage.removeItem('items');
	};

	takeItemData = (index, data) => {
			this.props.changeBookData(data);
			this.props.onSelectBook(index)
	};

	render() {
		let _this = this;
        window.addEventListener('unload', function() {
			localStorage.setItem('items', JSON.stringify(_this.props.books))
        });
		if(this.props.books.length > 0){
			return (
				<div className='book-list clearfix'>
					{this.props.books.map((item, index) =>
						(item.name.length === 0 && item.author.length === 0) ? null :
							<BookItem
								author={item.author}
								name={item.name}
								subtitle={item.subtitle}
								id={item.id}
								img={item.img}
								index={index}
								key={index}
								selected={this.props.selectBook === index}
								loadLocalData={loadLocalData}
								deleteBook={this.props.deleteBook}
								changeItem={this.takeItemData}

							/>)
					}
					<button className="btn-list btn-aqua btn-dlt-list" onClick={this.onDelete}>Удалить все книги</button>
					<button className="btn-list btn-aqua btn-save-list" onClick={this.onSave}>Сохранить список книг</button>
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
    deleteAllBook: (item) => dispatch(deleteAllBook(item)),
    onSelectBook: (item) => dispatch(onSelectBook(item)),
    changeBookData: (item) => dispatch(changeBookData(item))
});


export default connect(mapStateToProps, mapDispatchToProps)(BookList)
