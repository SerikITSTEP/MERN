import React,{Component} from 'react'
import classnames from 'classnames'
import {connect} from 'react-redux'
import proptype from 'prop-types'
import TextFieldGroup from "./TextFieldGroup";
import { add_blog, update_blog } from "../actions/blogAction"


class ModalForBlog extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            description: "",
            errors: {},
            isEdit: false,
            file: null
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeFile = this.onChangeFile.bind(this);
    }

    componentWillReceiveProps(nextProp) {
        if(nextProp){
            if (nextProp.blog){
                this.setState({title: nextProp.blog.title,
                    description: nextProp.blog.description,
                    isEdit: true});
            }
            else {
                this.setState({title: "",
                    description: "",
                    isEdit: false});
            }
            if (nextProp.errors) {
                this.setState({
                    errors: this.props.errors
                })
            }
        }

    }

    onChange (e) {
        this.setState({
                [e.target.name]: e.target.value
            })
    }
    onChangeFile (e) {
        this.setState ({
            file: e.target.files[0]
        })
    }
    onSubmit (e) {
        e.preventDefault();
        const sentData = {
            title: this.state.title,
            description: this.state.description,
            file: this.state.file
        }
        if (this.state.isEdit)
        {
            sentData._id = this.props.blog._id;
            this.props.update_blog(sentData, this.props.showModal);
        }
        else {
            this.props.add_blog(sentData, this.props.showModal);
        }
    }

    render () {
        const {errors, isEdit} = this.state;
        let _titile = "Добавление блога";

        if (isEdit) {
            _titile = "Редактирование блога";
        }
        return(
            <div className={classnames('modal', {'active': this.props.isOpen})} >
                <div className="modal-backdrop" onClick={this.props.showModal}>
                </div>
                <div className="modal-inner">
                    <div className="modal-close" onClick={this.props.showModal}>
                        &times;
                    </div>
                    <div className="modal-title" >{_titile}</div>

                    <form onSubmit={this.onSubmit}>
                        <div className="modal-form">
                            <TextFieldGroup val={this.state.title} placeholder={"title"} onChange={this.onChange} name={"title"} error={errors.title}/>
                            <div className="form-field">
                                <textarea name="description" id="" cols="30" rows="10" className="input textarea"  onChange={this.onChange}
                                          value={this.state.description}></textarea>
                                {errors.description&&(<span className="input-msg-error">{errors.description}</span>)}
                            </div>
                            <div className="form-field">
                                <input type="file" name="image" onChange={this.onChangeFile}/>
                                {errors.image&&(<span className="input-msg-error">{errors.image}</span>)}

                            </div>
                            <div className="form-field">
                                <button className="button" >Создать</button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

ModalForBlog.propTypes = {
    isOpen: proptype.bool.isRequired,
    errors: proptype.object.isRequired,
    blog_id: proptype.string,
    showModal: proptype.func.isRequired

}
const mapStatetoProps = (state) => ({
    errors: state.errors
})


export default connect(mapStatetoProps,{add_blog, update_blog})(ModalForBlog);