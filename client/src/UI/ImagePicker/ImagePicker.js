import React from 'react'

import classes from './ImagePicker.scss';

class ImagePicker extends React.Component {

    changeHandler = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            this.props.fileHandler(reader.result, file)
        }
    }

    render() {

        let picker = '';

        if(this.props.type == 'create'){
            picker = (
                <div className={classes.ImageBox}>
                    <input className={classes.Input} onChange={this.changeHandler} id={this.props.id} type="file" />
                    <div className={classes.Img}
                        style={{ backgroundImage: `url('${this.props.src}')` }}>
                        {!this.props.src ? <p>No image to show</p> : null}
                    </div>
                    <label htmlFor={this.props.id}>{this.props.label}</label>
                </div>
            )
        } else if (this.props.type == 'avatar'){
            picker = (
                <div className={classes.AvatarImage}>
                    <input className={classes.Input} onChange={this.changeHandler} id={this.props.id} type="file" />
                    <label htmlFor={this.props.id}>{this.props.label}</label>
                </div>
            )
        } else if (this.props.type == 'cover') {
            picker = (
                <div className={classes.CoverImage}>
                    <input className={classes.Input} onChange={this.changeHandler} id={this.props.id} type="file" />
                    <label htmlFor={this.props.id}>{this.props.label}</label>
                </div>
            )
        }

        return picker;
    }
}

export default ImagePicker;