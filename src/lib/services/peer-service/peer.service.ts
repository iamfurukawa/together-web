import Peer from "peerjs";

import uuid from "../../shared/uuid/uuid";

import type { MediaDeviceInterface } from "../../shared/media-devices/media-device-type";
import MediaDeviceType from "../../shared/media-devices/media-device-type";

class PeerService {
    peer: Peer;
    uuid: string;
    public stream: MediaStream;
    mediaDeviceActive: MediaDeviceInterface;
    connections: string[] = [];

    constructor() {
        this.mediaDeviceActive = MediaDeviceType.ALL_ENABLED;
        this.uuid = uuid();
        this.peer = new Peer(this.uuid);
        console.log(`Starting peerjs with uuid: ${this.uuid}`)
        this.listener();
        this.error();
        this.call();
    }

    listener() {
        console.log("Listening for new connections...")
        this.peer.on('connection', (dataConnection) => {
            console.log('Connecting with ', dataConnection.label)
            //this.connections.push(dataConnection);
        });
    }

    error() {
        this.peer.on("error", (error) => {
            console.error(`${error.name} - ${error.message}`);
        })
    }

    connectWith(peer: { uuid: string }) {
        return this.peer.connect(peer.uuid)
    }

    call() {
        this.peer.on('call', async (call) => {
            const mediaDevices = await navigator.mediaDevices.getUserMedia(this.mediaDeviceActive);
            call.answer(mediaDevices);
            call.on("stream", stream => this.stream = stream);
        });
    }
}

export default new PeerService();