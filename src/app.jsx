import React, { Component } from 'react'
import '../styles/index.scss'
import InputsContainer from './inputs/InputsContainer'
import BookList from './bookList/booklist'


export default class App extends Component {
  render() {
    return (
        <div className="main">
            <InputsContainer />
            <BookList  />
        </div>
    )
  }
}
