import React from 'react';

const BookItem = (props) => (
	<div className="book-item" id={props.id}>
		<div className="book-item__btn delete-btn" onClick={() => props.deleteItem(props)} />
		<div className="book-item__btn change-btn" onClick={() => props.test(props)} />
		<div className="book-item__data" onClick={() => props.onClick(props.index)}>
			<img className="book-item__img" src={props.img}  alt=""/>
			<div className="book-item__info">
				<div className="book-item__author">{props.author}</div>
				<div className="book-item__name">{props.name}</div>
			</div>
		</div>
	</div>
);

export default BookItem;
