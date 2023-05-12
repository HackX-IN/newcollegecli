import {configureStore} from '@reduxjs/toolkit'
import { adminReducer } from './reducers/adminReducer';
import { otherreducer } from './reducers/cfReducers';
import { courseReducer } from './reducers/CourseReducer';
import { Profilereducer, SubscriptionReducer, userReducer } from './reducers/userReducer';




const store =configureStore({
    reducer:{
        user:userReducer,
        profile:Profilereducer,
        course:courseReducer,
        subscription:SubscriptionReducer,
        admin:adminReducer,
        other:otherreducer
    }
});

export default store;
export const server='http://localhost:8081/api/v1'
