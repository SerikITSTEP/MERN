import React, { Component } from 'react'
import proptypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import ModalForBlog from '../../common/ModalForBlog';
import {get_user_blogs, delete_user_blogs} from "../../actions/blogAction";



class Profile extends Component{

    constructor() {
        super();

        this.state = {
            user: {},
            modalIsOpen: false,
            editblog: null
        };
        this.showModal = this.showModal.bind(this);
    }
        //componentWillReceiveProps not work on first render
        //componentDidMount works in one time in one circle
    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.setState({user: this.props.auth.user});
            this.props.get_user_blogs();

        }
        else {
            this.props.history.push('/');
        }

    }
    componentWillReceiveProps (nextprop) {
        this.setState({});
    }
    deleteBlog (data) {
            this.props.delete_user_blogs(data, ()=>{
                //this.setState({});
            });
    }
    OpenEditBlog (data ) {
        this.setState({
            editblog:data,
            modalIsOpen: true
        })

    }
    showBlog (id) {
        this.props.history.push("/blog/"+id);
    }
    showModal () {
        this.setState ({
            modalIsOpen: !this.state.modalIsOpen
        })
        if (!this.state.modalIsOpen) {
            this.setState({
                editblog: null
            })
        }
    }

    render () {

        const {user} = this.state;
        const userblogs = this.props.blog.userblogs.map((data, index)=>(

            <div key={index} className="blogs-item" onClick={this.showBlog.bind(this, data._id)}>
                <div className="blog-item-editor">
                    <div onClick={this.OpenEditBlog.bind(this, data)}>Edit</div>
                    <div onClick={this.deleteBlog.bind(this, data)}>&times;</div>
                </div>
                <div className="blogs-item-img">
                    {!data.image&&(<img src="https://banner2.kisspng.com/20180426/cdw/kisspng-drawing-cartoon-clip-art-little-mouse-5ae21c4a6f31b3.5363277615247678184555.jpg" alt=""/>)}
                    {data.image&&(<img src={data.image} alt=""/>)}
                     </div>
                <h3 className="text-bold">
                    {data.title}
                </h3>
            </div>
        ));


        return(
            <div className="profile">
                <div className="profile-author">
                    <div className="profile-author-info">
                        <img src={user.ava} alt=""/>
                        <h3 className="text-bold">{user.name}</h3>
                        <p className="desc">{user.position}</p>
                    </div>
                    <div className="profile-stats">
                        <div>
                            <h3 className="text-bold">343</h3>
                            <p className="desc">Descrition1</p>
                        </div>
                        <div>
                            <h3 className="text-bold">258</h3>
                            <p className="desc">Descrition2</p>
                        </div>
                    </div>
                    <div className="profile-social">
                        <div className="profile-social-item">
                            <img src="" alt=""/>
                            <p>Linked In</p>
                        </div>
                        <div className="profile-social-item">
                            <img src="" alt=""/>
                            <p>Facebook</p>
                        </div>
                        <div className="profile-social-item">
                            <img src="" alt=""/>
                            <p>Twitter</p>
                        </div>
                    </div>
                </div>

                <div className="profile-blogs">
                    <div className="profile-header">
                        Мой Блоги
                        <button className="button righted" onClick={this.showModal}>
                            Добавить Блог
                        </button>
                    </div>
                    <div className="blogs">
                        {userblogs}
                    </div>
                </div>
                <ModalForBlog isOpen={this.state.modalIsOpen} showModal={this.showModal} blog={this.state.editblog}/>
            </div>
        )
    }
}


Profile.propTypes = {
    auth: proptypes.object.isRequired,
    blog: proptypes.object.isRequired
}
const mapStateProps  = (state) => ({
    auth: state.auth,
    blog: state.blog
})
export default connect(mapStateProps, {get_user_blogs, delete_user_blogs})(withRouter(Profile));