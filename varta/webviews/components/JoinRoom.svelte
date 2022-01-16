<script lang="ts">
    import axios from "axios";
    
    import type { User } from "../types";
	import { page } from './stores.js';
	import { conversation } from './stores';
    
    export let user: User;
    export let accessToken: string = '';
    
    let roomID: string = "";
    let errMsg: string = "";

    const createRoom = async() => {
        if(errMsg === "") {
            const res = await axios.post(`${apiBaseUrl}/api/conversations/room/join`, {
                    userId: user._id,
                    name: roomID
                });

            console.log(res)
            page.update((input) => "chat")
            conversation.update(() => res.data)
            roomID = ''
        } else {
            const err = [];
        }
    }

    const validateFn = async() => {
        if(roomID.length === 8 && !isNaN(Number(roomID))) {
            errMsg='';
            return;
        } else {
            if(roomID.length !== 8) errMsg='length'
            if(isNaN(Number(roomID))) errMsg='nan'
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
        bind:value={roomID}
        on:input={validateFn}>
    <button type="submit" on:click={createRoom} style="margin-bottom: 10px;">
        Create Room
    </button>
    {#if errMsg === 'nan'}
        <p style="color: red;">Room ID must only contain digits</p>
    {/if}

    {#if errMsg === 'length'}
        <p style="color: red;">Room ID must be 8 digits long</p>
    {/if}
</div>