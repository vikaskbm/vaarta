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
    .search {
        display: flex;
        flex-direction: column;
        max-width:100%;
        padding: none;
        
        height:410px;
        max-height:410px;
    }
</style>


<div class="search">
    <input 
        type="text" 
        class="searchTerm" 
        placeholder="Create room name"
        bind:value={roomName}
        >
    <button type="submit" on:click={createRoom} style="margin-top: 10px;">
        Create
    </button>
</div>