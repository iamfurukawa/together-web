<script lang="ts">
    import ScreenShareService from "../services/screen-share-service/screen-share.service";

    export let uuid: string;
</script>

<button on:click={() => ScreenShareService.share(uuid)}>ShareScreen</button>
<div id="sharescreen-content"></div>

<style lang="scss">
    button {
        margin-top: 20px;
    }

    #sharescreen-content {
        width: 500px;
        height: 500px;
    }
</style>
