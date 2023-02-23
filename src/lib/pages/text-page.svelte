<script lang="ts">
  import TextService from "../services/text-service/text.service";

  let text = "";
  let received = "";

  const sendMessage = () => {
    if (text !== "") TextService.sendMessage(text, uuid);
  };

  export let uuid: string;
</script>

<div class="content">
  <input bind:value={text} />
  <h2>Received: {received}</h2>
  <button on:click={sendMessage}>send text</button>
</div>

<style lang="scss">
  .content {
    margin-top: 20px;
    padding: 10px;
    border-style: solid;
  }
</style>
