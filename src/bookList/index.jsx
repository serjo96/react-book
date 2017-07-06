import React, { Component } from 'react';
import { connect } from 'react-redux'
import  {deleteBook} from '../actions/userActions'




 class BookList extends Component {
     constructor(props) {
         super(props);
         this.test = this.test.bind(this);
         this.state = {
             id: '2'
         }
     }

    test(e){
         console.log(e.target.parentNode.id)
        this.props.deleteBook({
            id: e.target.parentNode.id
        });
         // e.target.parentNode.remove();
    }

    render() {
        return (
                <div className='book-list clearfix'>
                    <h2>Здесь будет ваш список книг!</h2>
                    {this.props.book.map((el, index) =>
                        (el.name.length === 0 && el.author.length === 0) ? console.log(el) :
                            <div className="book-item" key={index} id={el.id}>
                                <div className="book-item__delete-btn" onClick={this.test}></div>
                                <div className="book-item__img">
                                    <img src={el.imgUrl} alt=""/>
                                    <div className="book-item__info">
                                        <div>{el.author}</div>
                                        <div>{el.name }</div>
                                    </div>
                                </div>
                            </div>
                        )}
                </div>

        )
    }
}

function mapStateToProps (state) {
    return {
        book: state
    }
}

const mapDispatchToProps = (dispatch) => ({
    deleteBook: (params) => dispatch(deleteBook(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(BookList)