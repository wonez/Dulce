import { SET_ONLINE, ADD_ONLINE, REMOVE_ONLINE, APPEND_MESSAGE, IS_TYPING, STOPPED_TYPING } from '../types/chatTypes'

import store from '../config'

const setOnline = (online) => {
    return {
        type: SET_ONLINE,
        online
    }
}
const addOnline = (user) => {
    return {
        type: ADD_ONLINE,
        user
    }
}
const removeOnline = (user) => {
    return {
        type: REMOVE_ONLINE,
        user
    }
}

const appendMessage = (message) => {
    return{
        type: APPEND_MESSAGE,
        message,
    }
}

const isTyping = () => {
    return {
        type: IS_TYPING
    }
}

const stoppedTyping = () => {
    return {
        type: STOPPED_TYPING
    }
}

const handleSocket = (socket) => {
    return dispatch => {
        socket.onopen = () => {
            start();
        };
        socket.onmessage = (e) => {
            const res = JSON.parse(e.data);
            console.log(res);
            switch(res.type){
                case 'RES_ONLINE': dispatch(setOnline(res.data));
                    break;
                case 'RES_ONLINE_JOINED': dispatch(addOnline(res.data));
                    break;
                case 'RES_ONLINE_LEFT': dispatch(removeOnline(res.data));
                    break;
                case 'MESSAGE': dispatch(appendMessage(res.data))
                    break;
                case 'IS_TYPING': dispatch(isTyping())
                    break;
                case 'STOPPED_TYPING': dispatch(stoppedTyping())
                    break;
            }
        }

        socket.onerror = (e) => {
            console.log(e.err);
        };

        const start = () => {
            try{
                const { avatarUrl, name, surname, uri, _id } = store.getState().auth.user;
                const packet = { 
                    type: 'REQ_ONLINE',
                    data: {
                        avatarUrl,
                        name,
                        surname,
                        uri,
                        _id
                    }
                }
                socket.send(JSON.stringify(packet));
            }catch(err){
                console.log('ERR ', err);
            }
        }
    }
}

export const sendMessage = (msg) => {
    return dispatch => {
        try{
            const { avatarUrl, name, surname, _id } = store.getState().auth.user;
            const packet = {
                type: 'MESSAGE',
                data: {
                    author: {
                        avatarUrl,
                        name,
                        surname,
                        _id
                    },
                    time: Date.now(),
                    text: msg,
                }
            }
            dispatch(appendMessage(packet.data))
            document.socket.send(JSON.stringify(packet));
        }catch(err){
            console.log('ERR ', err);
        }
    }
} 

export const emitIsTyping = () => {
    return dispatch => {
        try{
            const packet = { type: 'IS_TYPING'}
            document.socket.send(JSON.stringify(packet));
        }catch(err){
            console.log('ERR ', err);
        }
    }
}
export const emitStoppedTyping = () => {
    return dispatch => {
        try{
            const packet = { type: 'STOPPED_TYPING'}
            document.socket.send(JSON.stringify(packet));
        }catch(err){
            console.log('ERR ', err);
        }
    }
}

export default handleSocket;