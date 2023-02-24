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
        this.uuid = `${uuid()}-ss`;
        this.peer = new Peer(this.uuid);
        console.log(`Starting peerjs with uuid: ${this.uuid}`)
        this.onError();
    }

    onError() {
        this.peer.on("error", (error) => {
            console.error(`${error.name} - ${error.message}`);
        })
    }
}

export default new PeerService();