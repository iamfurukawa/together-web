<script lang="ts">
    import TestPage from "./lib/pages/test-page.svelte";
  import VideoPage from "./lib/pages/video-page.svelte";
  import PeerService from "./lib/services/peer-service/peer.service";
  //import ShareScreenPage from "./lib/pages/share-screen-page.svelte";
  //import TextPage from "./lib/pages/text-page.svelte";

  let to = "";
</script>

<h2>My uuid is {PeerService.uuid}</h2>

<div class="sendform">
  <h3>Send to:</h3>
  <input bind:value={to} />
</div>

<TestPage uuid={to} />

<style lang="scss">
  .sendform {
    display: flex;
    flex-direction: row;
    align-items: center;

    height: 20px;

    h3 {
      margin-right: 10px;
    }
  }
</style>
