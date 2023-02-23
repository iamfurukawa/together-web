<script lang="ts">
    import PeerService from "../services/peer-service/peer.service";
    import VideoService from "../services/video-service/video.service";

    export let uuid: string;
    let videoCurrent: HTMLVideoElement;
    let videoOtherPeer: HTMLVideoElement;

    const setUpVideo = async () => {
        videoCurrent.srcObject = PeerService.stream;
        videoCurrent.play();

        const stream = await VideoService.startVideoCall(uuid);
        videoOtherPeer.srcObject = stream;
        videoOtherPeer.play
    };

    let isTurnOn: boolean;
</script>

<video id="peer" bind:this={videoOtherPeer} width="500" height="500" autoplay>
    <track kind="captions" src="" />
</video>
<video id="current" bind:this={videoCurrent} width="500" height="500" autoplay>
    <track kind="captions" src="" />
</video>

<label>
    <input type="radio" bind:group={isTurnOn} value={false} />
    Turn off video
</label>
<label>
    <input type="radio" bind:group={isTurnOn} value={true} />
    Turn on video
</label>
<button on:click={() => setUpVideo()}>Connect</button>
