import React, {Component} from 'react';

export default class Inputs extends Component {
    constructor(props) {
        super(props);
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

    render() {
        return (
            <div className="inputs-book">
                <input onChange={this.props.onInputChange} className="inputs-book__author" placeholder="Автор"
                       type="text" value={this.state.author}/>
                <input onChange={this.props.onInputChange} className="inputs-book__name" placeholder="Название"
                       type="text" value={this.state.name}/>
            </div>
        )
    }
}
