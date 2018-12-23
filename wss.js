const online = [];

module.exports = (server) => {
    
    server.on('connection', (socket) => {
        socket.on('message', (msg) => {
            const data = JSON.parse(msg);
            switch(data.type){
                case 'REQ_ONLINE': return reqOnline(socket, data.data)
            }
        })
        socket.on('close', (msg) => {
            for(let i=0; i<online.length; i++){
                let exists = false;
                try{
                    server.clients.forEach(sock => {
                        if(sock == online[i][1]){
                            exists = true;
                            throw 'break';
                        }
                    })
                }catch(e){}

                if(!exists){
                    emitLeft(online[i][0])
                    online.splice(i, 1);
                    break;
                }
            }
        })
    })

    const reqOnline = (socket, data) => {
        online.push([data, socket]);
        const packet = { 
            type: 'RES_ONLINE_JOINED', 
            data
        }
        const msg = JSON.stringify(packet)
        server.clients.forEach(sock => {
            if(sock == socket){
                sock.send(JSON.stringify({
                    type: 'RES_ONLINE', 
                    data: online.map(on => on[0])
                }))
            } else {
                sock.send(msg)
            }
        });
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
}
