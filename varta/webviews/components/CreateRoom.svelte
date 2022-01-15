<script lang="ts">
    import { onMount } from 'svelte';
    import axios from "axios";
    
    
    import type { User } from "../types";
	import { conversation } from './stores';
	import { friend } from './stores';
    
    export let user: User;
    export let accessToken: string = '';
    
    let roomName: string = "";
    let conversation_value: any;

    const createRoom = async() => {
        if(roomName.length > 2) {
            // const res = await axios.post(`${apiBaseUrl}/api/conversation/room/create`, {
            //         userId: user._id,
            //         name: roomName,
            //         type: "room"
            //     });
            console.log(roomName)
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
    <button type="submit" on:submit={createRoom}>
        Create Room
    </button>
</div>