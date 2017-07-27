import React from 'react';

const BookItem = (props) => (
	<div className={props.selected ? 'book-item book-item--selected' : 'book-item'} id={props.id} >
		<div className="book-item__btn delete-btn" onClick={() => props.deleteBook(props.id)} />
		<div className="book-item__btn change-btn"
			 onClick={() => props.changeItem(props.index, {
			 	name: props.name,
				 author: props.author,
				 subtitle: props.subtitle,
				 id: props.id,
				 img: props.img,
				 error: {
					info: '',
					classInfo: ''
				 },
				 index: props.index,
				 formType: 'change'
			 }
			 )} />
		<div className="book-item__data">
			<img className="book-item__img" src={props.img.data}  alt=""/>
			<div className="book-item__info">
				<div className="book-item__author">{props.author}</div>
				<div className="book-item__name">{props.name}</div>
				<div className="book-item__subtitle">{props.subtitle}</div>
			</div>
		</div>
	</div>
);

export default BookItem;
