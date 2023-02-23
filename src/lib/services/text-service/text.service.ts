import type Peer from "peerjs";

import PeerService from "../peer-service/peer.service";

class TextService {
    peer: Peer;

    constructor() {
        this.peer = PeerService.peer;
        this.waitingForNewMessages();
    }

    sendMessage(message: string, to: string) {
        console.log(`Sending message: ${message} to ${to}`);

        const conn = this.peer.connect(to);
        conn.on('open', () => {
            conn.send(message);
        });
    }

    waitingForNewMessages() {
        this.peer.on('connection', (conn) => {
            conn.on('data', (data) => {
                console.log('Mensagem recebida:', data);
            });
        });
    }
}

export default new TextService();