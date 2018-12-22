const online = [];

module.exports = (server) => {
    
    server.on('connection', (socket) => {
        socket.on('message', (msg) => {
            const data = JSON.parse(msg);
            switch(data.type){
                case 'REQ_ONLINE': return reqOnline(server, socket, data.data)
            }
        })
    })

    const reqOnline = (socket, data) => {
        online.push(data);
        server.clients.forEach(sock => {
            if(sock == socket){
                const packet = { 
                    type: 'RES_ONLINE', 
                    data: online
                }
                const msg = JSON.stringify(packet)
                socket.send(msg)
            }else{
                const packet = { 
                    type: 'RES_ONLINE_JOINED', 
                    data
                }
                const msg = JSON.stringify(packet)
                socket.send(msg)
            }
        });
    }
}
