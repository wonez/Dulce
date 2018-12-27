const online = []; //{data}[opened sockets]

const User = require('./models/user');

module.exports = (server) => {
    
    server.on('connection', (socket) => {
        socket.on('message', (msg) => {
            const data = JSON.parse(msg);
            switch(data.type){
                case 'REQ_ONLINE': return reqOnline(socket, data.data)
                case 'MESSAGE': return forwardMessage(socket, data.data)
                case 'IS_TYPING': return isTyping(socket)
                case 'STOPPED_TYPING': return stoppedTyping(socket)
            }
        })
        socket.on('close', () => {
            for(let i=0; i<online.length; i++){
                for(let j=0; j<online[i][1].length; j++){
                    let exists = false;
                    try{
                        server.clients.forEach(sock => {
                            if(sock == online[i][1][j]){
                                exists = true;
                                throw 'break';
                            }
                        })
                    }catch(e){}
                    if(!exists){
                        online[i][1].splice(j, 1);
                        if(online[i][1].length == 0){
                            emitLeft(online[i][0])
                            online.splice(i,1);
                        }
                        break;
                    }
                }
            }
        })
    })

    const reqOnline = (socket, data) => {
        const item = online.find(item => {
            return item[0]._id == data._id;
        })
        if(item){
            //alredy joined anotehr connection
            item[1].push(socket);
        }else{
            //new connection, new user
            online.push([data, [socket]])
            const packet = { 
                type: 'RES_ONLINE_JOINED', 
                data
            }
            const msg = JSON.stringify(packet)
            server.clients.forEach(sock => {
                if(sock != socket){
                    sock.send(msg)
                }
            });
        }
        //all users FOR TESTING ONLY!
        // User.find({}).then(res => {
        //     socket.send(JSON.stringify({
        //         type: 'RES_ONLINE',
        //         data: res
        //     }))
        // })
        socket.send(JSON.stringify({
            type: 'RES_ONLINE', 
            data: online.map(on => on[0])
        }))
    }

    const emitLeft = data => {
        const packet = { 
            type: 'RES_ONLINE_LEFT', 
            data
        }
        const msg = JSON.stringify(packet)
        server.clients.forEach(sock => {
            sock.send(msg);
        });
    }

    const forwardMessage = (author, data) => {
        const packet = { 
            type: 'MESSAGE', 
            data
        }
        const msg = JSON.stringify(packet)
        server.clients.forEach(socket => {
            if(socket != author){
                socket.send(msg)
            }
        })
    }

    const isTyping = author => {
        const packet = { type: 'IS_TYPING'}
        const msg = JSON.stringify(packet)
        server.clients.forEach(socket => {
            if(socket != author){
                socket.send(msg)
            }
        })
    }

    const stoppedTyping = author => {
        const packet = { type: 'STOPPED_TYPING'}
        const msg = JSON.stringify(packet)
        server.clients.forEach(socket => {
            if(socket != author){
                socket.send(msg)
            }
        })
    }
}
