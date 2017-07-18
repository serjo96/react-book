import React, { Component } from 'react'
import '../styles/index.scss'
import InputsContainer from './countainer/inputs/InputsContainer'
import BookList from './countainer/bookList/booklist'


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
