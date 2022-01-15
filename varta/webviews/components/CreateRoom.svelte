<script lang="ts">
    import { onMount } from 'svelte';
    import axios from "axios";
    
    
    import type { User } from "../types";
	import { page } from './stores.js';
	import { conversation } from './stores';
	import { friend } from './stores';
    
    export let user: User;
    export let accessToken: string = '';
    
    let roomName: string = "";

    const createRoom = async() => {
        if(roomName.length > 2) {
            const res = await axios.post(`${apiBaseUrl}/api/conversations/room/create`, {
                    userId: user._id,
                    name: roomName
                });

            console.log(res)
            page.update((input) => "chat")
            conversation.update(() => res.data)
            roomName = ''
        } else {
            const err = [];
        }
    }

</script>
 
<style>
    

</style>

<div class="search">
    <input 
        type="text" 
        class="searchTerm" 
        placeholder="Search Friends?"
        bind:value={roomName}
        >
    <button type="submit" on:click={createRoom}>
        Create Room
    </button>
</div>