import React, {Component} from 'react';


export default class DropZone extends Component {
    constructor(props) {
        super(props);
        this.CheckImg = this.CheckImg.bind(this);
        this.state = {
            file: '',
            imagePreviewUrl: null,
            imageStatusMessage: '',
            imgStatus: true,
            imgMessageClass: 'dz-message',
            imgInfoClass: 'dz-info'
        }
    }

    formatBytes(bytes, decimals) {
        if(bytes === 0) return '0 Bytes';
        let k = 1000,
            dm = decimals || 2,
            sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    _handleImageChange(e) {
        let reader = new FileReader();
        let file = e.files[0];
        this.setState({
            imageStatusMessage: 'loading'
        });
        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result,
                imgStatus: true
            });
        };
        reader.readAsDataURL(file);
    }

    drawImg(){
        const {imagePreviewUrl, file} = this.state;
        if (this.state.imgStatus) {
            return <div className="imgPreview" onClick={(e) => e.preventDefault()}>
                <div className="imgPreview__info">
                    <div>{file.name}</div>
                    <div>{this.formatBytes(file.size)}</div>
                </div>
                <img className="dz-image img-checking" src={imagePreviewUrl} onLoad={this.CheckImg} />
            </div>
        } else {
            return null
        }
    }

    CheckImg(e){
        if(e.target.width === 140 && e.target.height === 205){
            this.setState({
                imageStatusMessage: 'Обложка успешно загружена',
                imgInfoClass: 'dz-info dz-success',
                imgMessageClass: 'is--hide',
                imgStatus: true
            });
            setTimeout(()=> this.setState({imageStatusMessage: '', imgInfoClass: 'dz-info'}), 2500);
            e.target.parentNode.classList.add('is--checked');
            e.target.classList.remove('img-checking');
        }else{
            e.target.parentNode.classList.remove('is--checked');
            this.setState({
                imgStatus: false,
                imageStatusMessage: 'Обложка должна быть 140х205',
                imgInfoClass: 'dz-info dz-error',
                imgMessageClass: 'dz-message'
            });
            setTimeout(()=> this.setState({
                imageStatusMessage: '',
                imgInfoClass: 'dz-info'
            }), 2500);
        }
    }

    drop(e) {
        e.stopPropagation();
        e.preventDefault();
        if (e.target.className.indexOf('img-load-preview') === 0 || e.target.className.indexOf('dz-message') === 0) {
            e.target.closest('.img-load-preview').classList.remove("is--hover")
        }
        const dt = e.dataTransfer;
        this._handleImageChange(dt)
    }

    render() {
       function dragenter(e) {
            e.stopPropagation();
            e.preventDefault();
        }

        function dragover(e) {
            console.log(e.target)
            e.stopPropagation();
            e.preventDefault();
            if (e.target.className.indexOf('img-load-preview') === 0 || e.target.className.indexOf('imgPreview') === 0 || e.target.className.indexOf('dz-message') === 0 || e.target.className.indexOf('dz-image') === 0) {
                e.target.closest('.img-load-preview').classList.add("is--hover")
            }
        }

        function dragLeave(e){
            if (e.target.className.indexOf('img-load-preview') === 0 || e.target.className.indexOf('dz-message') === 0) {
                e.target.closest('.img-load-preview').classList.remove("is--hover")
            }
        }
        return (
        <div>
            <input id="fileUpload" className="add-file-input" type="file" accept=".jpg,.png" onChange={(e) => this._handleImageChange(e.target)}/>
            <label htmlFor="fileUpload">
                <div className="img-load-preview"
                onDragOver={(e) => dragover(e)}
                onDragEnter={(e) => dragenter(e)}
                onDrop={(e) => this.drop(e)}
                onDragLeave={(e) => dragLeave(e)}
                >
                {this.drawImg()}
                <div className={this.state.imgMessageClass}>Drop files here or click to upload.</div>
                <div className={this.state.imgInfoClass}>{this.state.imageStatusMessage}</div>
                </div>
            </label>
         </div>
        )
    }
}