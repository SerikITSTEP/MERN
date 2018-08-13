import React, { Component } from 'react'
import proptypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import blogReducer from "../../reducers/blogReducer";
import {getSingleBlog, AddComment} from '../../actions/blogAction';
import moment from 'moment-with-locales-es6'

moment.locale("kk");



class ShowBlog extends Component{

    constructor() {
        super();

        this.state = {
            blog: {
                comments:[],
                author:{}
            },
            addedcomment: "",
            iscoment:false

        };
        this.AddComment = this.AddComment.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    //componentWillReceiveProps not work on first render
    //componentDidMount works in one time in one circle

    componentDidMount(nextProps) {
        //this.props.match.params.id() --berem id kotory v route
        this.props.getSingleBlog(this.props.match.params.id);

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps) {
             this.setState({
                 blog: nextProps.blogreducer.blog
             });
             if (nextProps.match.params.id != this.state.blog._id) {
                 this.props.getSingleBlog(nextProps.match.params.id);
             }
        }
    }

    onChange (e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    AddComment (e) {
        e.preventDefault();
        if (this.state.addedcomment != "") {
            this.props.AddComment(this.state.addedcomment, this.state.blog._id);
            this.setState({
                addedcomment: "",
                iscoment:false
            })
        }
        else {
            this.setState({
                iscoment:true
            })
        }

    }
    render () {
        const {blog} = this.state;


        const comments = this.state.blog.comments.map((data, index)=>(
            <div key={index} className="comments-item">

                <div className="comments-item--delete">
                    <img src="images/close-black.svg"/>
                </div>


                <div className="comments-item--img">
                    <img src={data.author.ava}/>
                </div>
                <div className="comments-item--content">
                    <h3 >{data.author.name}</h3>
                    <p>{data.text}</p>
                    <span>{moment(data.date).fromNow()}</span>
                </div>
            </div>

        ));
        return(
            <div className="block block-centered">
                <img className="post-img" src={blog.image}/>
                <h1 className="post-title" >{blog.title}</h1>
                <p className="post-date">Публиковано {moment(blog.date).format('DD.MM.YYYY')}</p>
                <div className="post-info">
                    <div className="post-author">
                        <div className="post-author--img">
                            <img src=""/>
                        </div>
                        <div className="post-author--content">
                            <h2 >{blog.author.name}</h2>
                            <a > 21 постов </a>
                        </div>
                    </div>
                    <div className="post-icons">
                        <div className="post-icons--item">
                            <div className="post-icons--img">
                                <img src="images/like.svg"/>
                            </div>
                            324234
                        </div>
                        <div className="post-icons--item">
                            <div className="post-icons--img">
                                <img src="images/comment.svg"/>
                            </div>
                            {blog.comments.length}
                        </div>
                    </div>
                </div>
                <p className="post-desc">{blog.description}</p>

                <div className="comment-block">
                    <h2 className="comment-title">{blog.comments.length} comments</h2>
                    <div className="comments">
                        <div className="comments-item">
                            <div className="comments-item--img">
                                <img src="images/ava.svg"/>
                            </div>
                            <div className="comments-item--content">
                                <form onSubmit={this.AddComment}>
                                    <input className="input" placeholder="Введите комметарии" onChange={this.onChange}  name="addedcomment"
                                           value={this.state.addedcomment}/>
                                    {this.state.iscoment&&(<span className="input-msg-error">Введите коментарий</span>)}
                                </form>
                            </div>
                        </div>
                        {comments}
                        {/*<div className="comments-item">

                            <div className="comments-item--delete">
                                <img src="images/close-black.svg"/>
                            </div>


                            <div className="comments-item--img">
                                <img src=""/>
                            </div>
                            <div className="comments-item--content">
                                <h3 >Alem Utemissov</h3>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown</p>
                                <span>52 секунды назад</span>
                            </div>
                        </div>*/}
                    </div>
                </div>
            </div>
        )
    }
}


ShowBlog.propTypes = {
    blogreducer: proptypes.object.isRequired,
    getSingleBlog: proptypes.func.isRequired
}
const mapStateProps  = (state) => ({
    blogreducer: state.blog
})
export default connect(mapStateProps, {getSingleBlog, AddComment})(withRouter(ShowBlog));