import store from '../config'

const handleSocket = (socket) => {
    socket.onopen = () => {
        start();
    };
    socket.onmessage = (e) => {
        const res = JSON.parse(e.data);
        switch(res.type){
            case 'RES_ONLINE': console.log(res.data);
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

export default handleSocket;