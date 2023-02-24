<script>
    import { Peer } from "peerjs";
    import MediaDeviceType from "../shared/media-devices/media-device-type";
    var peer = new Peer();
    let codeid = "";
    let youid = "";

    let videoOther;
    let videoMe;
    // GET YOU ID
    peer.on("open", (id) => youid = id);
    // HANDLE CONNECTTION
    peer.on("call", async (call) => {
        // open webcam
        await navigator.mediaDevices
            .getUserMedia(MediaDeviceType.ALL_ENABLED)
            .then((stream) => {
                call.answer(stream);
                call.on("stream", renderYouwebcam);
                videoOther.srcObject = stream;
                videoOther.play();
            });
    });
    // RENDER YOU WEBCAM HERE
    let renderYouwebcam = (stream) => {
        console.log(stream);
        videoMe.srcObject = stream;
        videoMe.play();
    };
</script>

<div>
    you id cam = {youid}
    <br />
    code : <input type="" bind:value={codeid} name="" />
    <!-- BUTTON CONNECT TO FRIEND -->
    <button
        on:click={async () => {
            // OPEN YOU WEBAM
            await navigator.mediaDevices
                .getUserMedia(MediaDeviceType.ALL_ENABLED)
                .then((stream) => {
                    let call = peer.call(codeid, stream);
                    videoOther.srcObject = stream;
                    videoOther.play();
                    call.on("stream", renderYouwebcam);
                });
        }}
    >connect</button>

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
