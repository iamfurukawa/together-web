import type Peer from "peerjs";
import MediaDeviceType from "../../shared/media-devices/media-device-type";
import PeerService from "../peer-service/peer.service";

class VideoService {

    peer: Peer;

    constructor() {
        this.peer = PeerService.peer;
    }

    enableWebCam() {
        PeerService.mediaDeviceActive = MediaDeviceType.ALL_ENABLED;
    }

    async startVideoCall(uuid: string) {
        this.enableWebCam();
        let streamOtherPeer;
        navigator.mediaDevices.getUserMedia(PeerService.mediaDeviceActive)
            .then(stream => {
                this.peer.call(uuid, stream)
                streamOtherPeer = stream;
            })
        return streamOtherPeer;
    }
}

export default new VideoService();