import {GET_ERRORS, GET_USER_BLOGS, SET_BLOG, DELETE_USER_BLOGS, UPDATE_BLOG, GET_SINGLE_BLOG, GET_COMMENT} from "./types";
import ajax from 'axios';
import store from'../store'

export const  add_blog = (blogData, showModal) => dispatch => {
    //esli est faily
    let fromdata = new FormData()
    fromdata.append('title', blogData.title);
    fromdata.append('description', blogData.description);
    fromdata.append('image', blogData.file);
    ajax ({
        method: 'post',
        url: '/api/blog',
        data: fromdata,
        config: {headers: {'Content-Type': 'multipart/form-data'}}
    }).then(res =>{
            dispatch({
                type: SET_BLOG,
                payload: res.data
            })
            showModal();
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
    //------------------------------------
    /*ajax.post ('/api/blog', blogData)
        .then(res =>{
            dispatch({
                type: SET_BLOG,
                payload: res.data
            })
            showModal();
        })
        .catch(err => {
            dispatch({
              type: GET_ERRORS,
              payload: err.response.data
            })
        })*/
}
export const  update_blog = (blogData, showModal) => dispatch => {
    let fromdata = new FormData()
    fromdata.append('title', blogData.title);
    fromdata.append('_id', blogData._id);
    fromdata.append('description', blogData.description);
    fromdata.append('image', blogData.file);
    ajax ({
        method: 'put',
        url: '/api/blog',
        data: fromdata,
        config: {headers: {'Content-Type': 'multipart/form-data'}}
    })
        .then(res =>{
            dispatch({
                type: UPDATE_BLOG,
                payload: res.data
            })

            showModal();

        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}
export const  get_user_blogs = () => dispatch => {
    ajax.get ('/api/blog')
        .then(res =>{
            dispatch({
                type: GET_USER_BLOGS,
                payload: res.data
            })
        })
        .catch(err => {
            alert(err.response.data);
        })
}
export const  delete_user_blogs = (data, callback) => dispatch => {

    ajax.delete(`/api/blog/${data._id}`)
        .then(() =>{
            dispatch({
                type: DELETE_USER_BLOGS,
                payload: data
            })

            //callback();


        })
        .catch(err => {
            alert(err.response.data);
        })
}
export  const getSingleBlog = (id) => dispatch =>{
    ////////////////////////////////
    // eto s reduxa = store.getState().userblogs
    ajax.get (`/api/blog/${id}`)
        .then(res =>{
            console.log(id, res.data);
            dispatch({
                type: GET_SINGLE_BLOG,
                payload: res.data
            })
        })
        .catch(err => {
            alert(err.response.data);
        })
}


export  const AddComment = (comment, blogid) => dispatch =>{
    const addedcoment = {
        text: comment,
        blogid: blogid
    }
    ajax.post("/api/comment", addedcoment)
        .then(res =>{
           console.log(res.data);
            dispatch({
                type: GET_COMMENT,
                payload: res.data
            })
        })
        .catch(err => {
            alert(err.response.data);
        })
}

