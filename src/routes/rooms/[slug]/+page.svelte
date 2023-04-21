<script lang="ts">
    export const ssr = false;

    /** @type {import('./$types').PageData} */
    export let data: any;

    import { onMount, afterUpdate } from "svelte";
    import { username } from '$lib/client/stores/store';
    import { io } from "$lib/client/websockets/realtime";
	import { browser } from "$app/environment";

    let message = '';
    let userLocale = 'nl-NL'

    if (browser) {
        userLocale =
            window.navigator.languages && window.navigator.languages.length
                ? window.navigator.languages[0]
                : window.navigator.language;
    }

    onMount(() => {
        io.on("message", message => {
            data.messages = [...data.messages, message]
        })
    })

    afterUpdate(() => {
        window.scrollTo(0, document.body.scrollHeight)
    })

    function sendMessage() {
        io.emit("message", JSON.stringify({
            username: $username, 
            roomId: data.roomId, 
            message: message 
        })) 

        message = ''
    }

    function getDate(timestamp: number) {
        return new Date(timestamp).toLocaleDateString(userLocale, {
            minute: "2-digit",
            hour: "2-digit"
        })
    }
  </script>

<div class="flex flex-col min-h-screen bg-gray-900 chats" id="chats">
    <div class="flex flex-row">
        <div class="flex justify-center self-center">
            <a href="/rooms">Back</a>
        </div>
        <div class="flex flex-row justify-center w-full">
            <h1 class="ml-5 text-3xl font-bold text-info-500">
                {data.roomName}
            </h1>
            <span class="ml-3 text-xs text-white self-center">({data.roomId})</span>
        </div>
    </div>
    <div class="bg-gray-800 flex flex-col h-full">
        {#each data.messages as message}
            {#if message.senderName == $username}
                <div class="self-start ml-2 p-3 max-w-xl">
                    <div class="flex flex-col bg-primary-400 rounded p-2">
                        <span class="text-xs font-bold text-primary-800">
                            {message.senderName} ({getDate(message.timestamp)})
                        </span>
                        <span class="text-sm text-start break-words">
                          {message.message}
                        </span>
                    </div>
                </div>
                {:else}
                <div class="self-end mr-2 p-3 ml-10 max-w-xl">
                    <div class="flex flex-col bg-secondary-400 rounded p-2">
                        <span class="text-xs font-bold text-secondary-800">
                            {message.senderName} ({getDate(message.timestamp)})
                        </span>
                        <span class="text-sm text-end break-words">
                          {message.message}
                        </span>
                    </div>
                </div>
            {/if}
        {/each}
    </div>
{#if $username !== ''}
    <div class="flex bg-black rounded-t w-full p-3 flex-nowrap chat">
        <form action="#" on:submit|preventDefault={sendMessage} class="flex w-full">
            <input type="test" class="hidden" value={$username} name="senderName">
            <input type="text" name="message" bind:value={message}
            class="bg-gray-800 rounded w-full mr-3 text-white placeholder:text-gray 
            placeholder:pl-3 input:pl-3" 
            placeholder="Type here ...">
            <button type="submit" class="self-end rounded text-black bg-primary-300 pl-3 p-3">Send</button>
        </form>
    </div>
{/if}
</div>


<style lang="scss">
.chat {
//   position: fixed;
//   bottom: 0;
}

.chats {
    // margin-bottom: 5em;
}
</style>