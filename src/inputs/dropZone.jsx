import React, {Component} from 'react';


export default class DropZone extends Component {

    formatBytes(bytes,decimals) {
        if(bytes == 0) return '0 Bytes';
        var k = 1000,
            dm = decimals || 2,
            sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    _handleImageChange(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }
        reader.readAsDataURL(file)
        e.target.value = "";
    }

    drawImg(){
        const {imagePreviewUrl, file} = this.state;
        if (imagePreviewUrl) {
            return <div key="162" className="imgPreview">
                <div className="imgPreview__info">
                    <span>{file.name}</span>
                    <span>{this.formatBytes(file.size)}</span>
                </div>
                <img className="img-checking" src={imagePreviewUrl} onLoad={this.CheckImg} />
            </div>
        }
    }

    CheckImg(e){
        if(e.target.width==140 && e.target.height==205){
            alert('Обложка успешно загружена')
            e.target.parentNode.classList.add('is--checked')
            e.target.classList.remove('img-checking')
        }else{
            e.target.parentNode.classList.remove('is--checked')
            e.target.src = '';
            alert('Обложка должна быть 140х205');
        }
    }

    render() {
        return (

            <div className="img-load-preview"
                 onDragOver={(e)=> e.target.classList.add("is--hover")}
                 onDragLeave={(e)=> e.target.classList.remove('is--hover')}
            >
                <input className="add-file-input" type="file" accept=".jpg,.png" onChange={(e)=>this._handleImageChange(e)} />
                {/*{this.drawImg()}*/}
                <div className="dz-message">Drop files here or click to upload.</div>
            </div>
        )
    }

}