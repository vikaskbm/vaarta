<script lang="ts">
    import type { User } from "../types";
    import { onMount } from 'svelte';
    
    import { page } from './stores.js';
	import { conversation } from './stores.js';
	import { friend } from './stores.js';

    export let currentUser: User;
    export let conv: {members: [], type:String, name: string} | null = {members:[], type:"", name:""};
    export let accessToken: string;
    
    let user: User;

    onMount(async () => { 
        const getUser = async(friendId: any) => {
            const res = await fetch(`${apiBaseUrl}/api/users?userId=${friendId}`, {
                headers: { 
                    authorization: `Bearer ${accessToken}`,
                },
            });
            
            const payload = await res.json();
            user = payload
        }

        if(conv?.type === 'room') {
            user.name = conv?.name;
            user.avatar = 'room'
        } else {
            console.log(conv)
            const friendId = conv?.members.find((m) => m !== currentUser._id)
            console.log(friendId)
            getUser(friendId);
        }
    });
</script>
  
<style>

.conversation {
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  margin-top: 10px;
}

.conversationImg {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
  
}

.conversationImgGrp {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
  font-size: 50px;
  color: #fff;
  text-align: center;
}

.conversationName {
  font-weight: 500;
}

</style>

<div class="conversation" on:click={() => {
    page.update((input) => "chat")
    conversation.update(() => conv)
    friend.update(() => user)
}}>
    {#if conv?.type === 'room'}
        <span class="conversationImgGrp">{conv?.name[0].toUpperCase()}</span>
        <span class="conversationName">{ conv?.name }</span>
        {:else}
        <img
            class="conversationImg"
            src={ user?.avatar }
            alt=""
        />
        <span class="conversationName">{ user?.name }</span>
    {/if}
    
</div>