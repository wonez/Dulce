import { SET_ONLINE, ADD_ONLINE, REMOVE_ONLINE } from '../types/chatTypes'

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
            }
        }

        const start = () => {
            const { avatarUrl, name, surname, _id } = store.getState().auth.user;
            const packet = { 
                type: 'REQ_ONLINE',
                data: {
                    avatarUrl,
                    name,
                    surname,
                    _id
                }
            }
            socket.send(JSON.stringify(packet));
        }
    }
}

export default handleSocket;