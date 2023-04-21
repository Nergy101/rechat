<script lang='ts'>
  import { invalidateAll, goto } from '$app/navigation';
  import { applyAction, deserialize } from '$app/forms';
	import type { ActionData, PageData } from './$types';
	import type { ActionResult } from '@sveltejs/kit';
	import { username } from '$lib/client/stores/store'

  import Textfield from '@smui/textfield';
  import HelperText from '@smui/textfield/helper-text';

  export let data: PageData;
  export let form: ActionData;
 
  let roomName = '';
  let name = $username || '';

  function setUser(e: any) {
    const _username = e.target.value;
    username.set(_username)
  }

  async function handleSubmit(event: any) {
    const data = new FormData();

    data.append('roomName', roomName)

    const response = await fetch('?/addRoom', {
      method: 'POST',
      body: data,	
    });

    const result: ActionResult = deserialize(await response.text());

    if (result.type === 'success') {
      // re-run all `load` functions, following the successful update
      await invalidateAll();
    }

    applyAction(result);
  }
</script>

<div class="bg-gray-800 h-screen">

  <h1 class="text-3xl font-bold w-full flex justify-center bg-gray-900 pb-2 text-white">
      Rooms
  </h1>
    <!-- style="display: flex; justify-content: center; align-items: center; flex-direction: column;" -->
  <div class="flex flex-wrap flex-col content-center justify-center pt-3" >
      <form method="POST" on:submit|preventDefault={handleSubmit} >
        <div class="flex flex-col">
          {#if form?.missing}<p class="text-red-600 font-bold">The name field is required</p>{/if}
          <Textfield type="text" name="roomName" variant="filled" bind:value={roomName} label="Room name" invalid={!roomName}>
          </Textfield>

          <div class="mt-3 w-full flex justify-center">
            <button class="pl-3 px-3 py-1 bg-primary-500 hover:bg-primary-600 rounded hover:shadow">Add Room</button>
          </div>
        </div>
      </form>

      {#if form?.name}
        <p>Successfully added: {form?.name}</p>
      {/if}
  </div>

  <div class="mt-5">
    <div class="flex flex-wrap flex-col content-center justify-center pt-3">
      <div class="flex">
        <Textfield type="text" name="name" variant="filled" 
          on:input={(e) => setUser(e)}  bind:value={name}  
          label="Nickname" invalid={!name}>
        </Textfield>
      </div>
    </div>

    <div class="flex flex-col items-center mt-10">    
      {#each data.rooms as room, index}
      <div class="p-3 m-1 bg-gray-600 rounded-lg w-1/2 flex justify-center">
          <a href="/rooms/{room.id}" class="text-primary-500 visited:text-primary-700">
        {new Date(room.timestamp??0).toLocaleDateString("nl-NL", {
          minute: "2-digit",
          hour: "2-digit"
      })} - {room.name}
        </a>
      </div>
    {/each}
    </div>
  </div>
</div>