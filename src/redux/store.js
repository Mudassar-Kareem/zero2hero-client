import {configureStore} from '@reduxjs/toolkit';
import { userReducer } from './reducers/userReducer';
import { notificationReducer } from './reducers/notification';
import { reportReducer } from './reducers/report';
import { transactionReducer } from './reducers/transaction';

const Store = configureStore({
    reducer: {
        user: userReducer,
        notification: notificationReducer,
        report : reportReducer,
        transaction: transactionReducer
    }
});

export default Store;