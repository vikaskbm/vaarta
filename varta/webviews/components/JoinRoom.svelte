<script lang="ts">
    import axios from "axios";
    
    import type { User } from "../types";
	import { page } from './stores.js';
	import { conversation } from './stores';
    
    export let user: User;
    export let accessToken: string = '';
    
    let roomID: string = "";
    let errMsg: string = "";

    const joinRoom = async() => {
        if(errMsg === "") {
            await axios.post(`${apiBaseUrl}/api/conversations/room/join`, {
                    userId: user._id,
                    roomID: roomID
            }).then(res => {
                page.update((input) => "chat")
                conversation.update(() => res.data)
                roomID = ''
            }).catch(err => {
                console.log(err)
            })

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
        class="roomIDtext" 
        placeholder="Enter room name"
        bind:value={roomID}
        on:input={validateFn}>
    <button type="submit" on:click={joinRoom} style="margin-top:10px">
        Join
    </button>
    {#if errMsg === 'nan'}
        <p style="color: red;">Room ID must only contain digits</p>
    {/if}

    {#if errMsg === 'length'}
        <p style="color: red;">Room ID must be 8 digits long</p>
    {/if}
</div>