import React, { Component } from 'react'
import { connect } from 'react-redux'
import  {deleteBook} from './actions/userActions'
import '../styles/index.scss'
import InputsContainer from './inputs/InputsContainer'
import BookList from './bookList/index'


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
