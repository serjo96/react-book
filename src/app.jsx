import React, { Component } from 'react'
import '../styles/index.scss'
import AddBook from './containers/AddBook/AddBook'
import BookList from './containers/BookList/BookList'
import Book from './containers/Book/Book';

export default class App extends Component {
  render() {
    return (
        <div className="main">
            <AddBook />
            <BookList  />
            <Book />
        </div>
    )
  }
}
