import store from "../store";
import {GET_USER_BLOGS, SET_BLOG, DELETE_USER_BLOGS, UPDATE_BLOG, GET_SINGLE_BLOG, GET_COMMENT} from "../actions/types";


const initialState = {
    blog:{},
    blogs: [],
    userblogs:[]
}

export  default function (state = initialState, action) {
    switch (action.type) {
        case GET_USER_BLOGS:
            return {
                //koroche zdes vse chto v initiaState pishet s ...state
                ...state,
                userblogs:action.payload
            }
        case SET_BLOG:
            state.userblogs.push(action.payload);
            return {
                ...state
            }
        case UPDATE_BLOG:
            console.log(state.userblogs, action.payload._id);
            state.userblogs[findbyID(state.userblogs, action.payload._id)] = action.payload;
            return {
                ...state
            }


        case DELETE_USER_BLOGS:
            state.userblogs.splice(state.userblogs.indexOf(action.payload),1);
            return {
                ...state
            }
        case GET_SINGLE_BLOG:
            state.blog=action.payload;
            return {
                ...state
            }
        case GET_COMMENT:
            state.blog.comments.push(action.payload);
            return {
                ...state
            }


        default:
            return state;
    }
}


const findbyID = (arr, id) => {
    for (var i=arr.length-1; i>=0; i--){
        if (arr[i]._id == id) {
            return i;
        }
    }
}