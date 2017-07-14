import React, { Component } from 'react';
import { connect } from 'react-redux'
import {loadLocalData} from '../actions/userActions'
import Book from './index'



class BookList extends Component {
    componentDidMount(){
        if (localStorage.getItem('items')) {
            const localItems = localStorage.getItem('items');
            this.props.loadLocalData(JSON.parse(localItems));
        }
    }
    render() {
        if(this.props.books.length > 0){
            return (
                <div className='book-list clearfix'>
                    {this.props.books.map((item, index) =>
                        (item.name.length === 0 && item.author.length === 0) ? null :
                        <Book author={item.author} name={item.name} id={item.id} img={item.imgUrl} key={index}/>)
                    }

                    <button className="btn-save-list" onClick={()=> localStorage.setItem('items', JSON.stringify(this.props.books))}>Сохранить список книг</button>

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
        books: state.books
    }
}

const mapDispatchToProps = (dispatch) => ({
    loadLocalData: (item) => dispatch(loadLocalData(item))
});

export default connect(mapStateToProps,mapDispatchToProps)(BookList)