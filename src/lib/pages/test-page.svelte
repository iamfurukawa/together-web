<script lang="ts">
    import PeerService from "../services/peer-service/peer.service";
    export let uuid: string;
    let peer = PeerService.peer;

    let videocurrent;
    let videoEl;

    // HANDLE CONNECTTION
    peer.on("call", async (call) => {
        // open webcam
        await navigator.mediaDevices
            .getUserMedia({
                video: true,
                audio: true,
            })
            .then((stream) => {
                call.answer(stream);
                call.on("stream", renderYouwebcam);
                videocurrent.srcObject = stream;
                videocurrent.play();
            })
            .catch((err) => console.log("err msg" + err));
    });
    // RENDER YOU WEBCAM HERE
    let renderYouwebcam = (stream) => {
        console.log(stream);
        videoEl.srcObject = stream;
        videoEl.play();
    };
</script>

<div>
    <!-- BUTTON CONNECT TO FRIEND -->
    <button
        on:click={async () => {
            // OPEN YOU WEBAM
            await navigator.mediaDevices
                .getUserMedia({
                    video: true,
                    audio: true,
                })
                .then((stream) => {
                    let call = peer.call(uuid, stream);
                    videocurrent.srcObject = stream;
                    videocurrent.play();
                    call.on("stream", renderYouwebcam);
                })
                .catch((err) => console.log("have error " + err));
        }}
    >connect</button>

    <div>
        <!-- VIDEO YOU FRIEND TAG HTML -->
        <video bind:this={videoEl} width="400" height="400" autoplay>
            <track kind="captions" src="" />
        </video>
        <!-- YOU FACE CAM HERE -->
        <video bind:this={videocurrent} width="400" height="400" autoplay>
            <track kind="captions" src="" />
        </video>
    </div>
</div>
