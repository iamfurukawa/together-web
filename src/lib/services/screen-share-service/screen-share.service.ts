import type Peer from "peerjs";
import peerService from "../peer-service/peer.service";
import MediaDeviceType from "../../shared/media-devices/media-device-type";

class ScreenShareService {
    peer: Peer;

    constructor() {
        this.peer = peerService.peer;
        this.waitingForNewMessages();
    }

    async share(uuid: string) {
        console.log(`ShareScreen with ${uuid}`);
        const conn = this.peer.connect(uuid);

        const mediaStream = await navigator.mediaDevices?.getUserMedia(MediaDeviceType.ONLY_VIDEO)
        const call = this.peer.call(conn.peer, mediaStream);

        call.on('stream', stream => {
            call.answer(stream); // responda à chamada com o stream de tela
        });
    }

    async waitingForNewMessages() {
        const mediaStream = await navigator.mediaDevices?.getUserMedia(MediaDeviceType.ONLY_VIDEO)
        this.peer.on('connection', (conn) => {
            // Quando uma conexão é estabelecida, solicite a conexão de vídeo do outro usuário
            const call = this.peer.call(conn.peer, mediaStream);

            // Inicie a transmissão de tela do usuário atual
            navigator.mediaDevices.getDisplayMedia(MediaDeviceType.ONLY_VIDEO)
                .then((stream) => {
                    call.answer(stream); // responda à chamada com o stream de tela
                });
        });

    }
}

export default new ScreenShareService();