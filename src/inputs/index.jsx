import React, { Component } from 'react';
import { connect } from 'react-redux';
import DropZone from "./dropZone";

class Inputs extends Component {
    constructor(props) {
        super(props);
        this.onInputChange = this.onInputChange.bind(this);
        this.takeVal = this.takeVal.bind(this);
        this.takeImgUrl = this.takeImgUrl.bind(this);
        this.state = {
            id: '',
            author: '',
            name: '',
            imagePreviewUrl: null,
            imageStatusMessage: '',
            imgStatus: true,
            imgNotice: '',
            imgMessageClass: 'dz-message',
            imgInfoClass: 'dz-info'
        }
    }

    clearInputs(){
        this.setState({
            author: '',
            name: ''
        })

    }

    onInputChange(e){
        (e.target.classList.contains('inputs-book__name')) ? this.setState({ name: e.target.value }) : this.setState({ author: e.target.value})
        e.preventDefault();
    }

    takeVal() {
        if(this.state.author.length !== 0 && this.state.name.length !== 0 && this.state.imagePreviewUrl){
            if(!this.props.change){
                this.props.addBook({
                    id: Math.floor(Math.random() * (250 - 1) + 1).toString(),
                    author: this.state.author,
                    name: this.state.name,
                    imgUrl: this.state.imagePreviewUrl
                });
            }else{
                this.props.changeBook({
                    id: Math.floor(Math.random() * (250 - 1) + 1).toString(),
                    author: this.state.author,
                    name: this.state.name,
                    imgUrl: this.state.imagePreviewUrl
                });
            }
            this.setState({
                imgNotice: 'clear'
            });
            this.clearInputs();
        }else {
                this.setState({
                    imgNotice: 'error'
                });
        }
    }



    takeImgUrl(url){
        this.setState({
            imagePreviewUrl: url
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.change !== this.props.change && nextProps.change) {
            this.setState(nextProps.change)
        }
    }

    render() {
        if (!this.props.change) {
            return (
                <div className="app__enter">
                    <div className="inputs-filds">
                        <h1 className="app__title">Создай свой список книг!</h1>
                        <div className="inputs-book">
                            <input onChange={this.onInputChange} className="inputs-book__author" placeholder="Автор"
                                   type="text" value={this.state.author}/>
                            <input onChange={this.onInputChange} className="inputs-book__name" placeholder="Название"
                                   type="text" value={this.state.name}/>
                        </div>

                        <DropZone takeImgUrl={this.takeImgUrl} imgNotice={this.state.imgNotice}/>

                    </div>

                    <div className="button-wrap">
                        <button className="btn-add-book" onClick={this.takeVal}>Добавить книгу</button>
                    </div>
                </div>
            )
        }else {
            return(
                <div>
                    <input onChange={this.onInputChange} className="inputs-book__author" placeholder="Автор"
                           type="text" value={this.state.author}/>
                    <input onChange={this.onInputChange} className="inputs-book__name" placeholder="Название"
                           type="text" value={this.state.name}/>
                    <DropZone takeImgUrl={this.takeImgUrl} />
                    <button onClick={this.takeVal}>change book</button>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => ({
    change: state.changesData
});

export default connect(mapStateToProps)(Inputs)