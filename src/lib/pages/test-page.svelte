<script lang="ts">
    import PeerService from "../services/peer-service/peer.service";
    import MediaDeviceType from "../shared/media-devices/media-device-type";

    const peer = PeerService.peer;
    let videoOther;
    let videoMe;
    
    peer.on("call", async (call) => {
        await navigator.mediaDevices
            .getUserMedia(MediaDeviceType.ALL_ENABLED)
            .then((stream) => {
                call.answer(stream);
                videoMe.srcObject = stream;
                videoMe.play();
                call.on("stream", renderOther);
            });
    });
    
    let renderOther = (stream) => {
        videoOther.srcObject = stream;
        videoOther.play();
    };

    export let uuid: string;
</script>

<div>
    <button
        on:click={async () => {
            await navigator.mediaDevices
                .getUserMedia(MediaDeviceType.ALL_ENABLED)
                .then((stream) => {
                    let call = peer.call(uuid, stream);
                    videoMe.srcObject = stream;
                    videoMe.play();
                    call.on("stream", renderOther);
                });
        }}>connect</button
    >

    <div>
        <!-- VIDEO YOU FRIEND TAG HTML -->
        <video id="other" bind:this={videoMe} width="400" height="400" autoplay>
            <track kind="captions" src="" />
        </video>
        <!-- YOU FACE CAM HERE -->
        <video id="me" bind:this={videoOther} width="400" height="400" autoplay>
            <track kind="captions" src="" />
        </video>
    </div>
</div>
