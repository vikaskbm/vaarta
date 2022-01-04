<script lang="ts">
    import type { User } from "../types";
    import { onMount } from 'svelte';
    
    import { page } from './stores.js';
	import { conversation } from './stores.js';

    export let currentUser: User;
    export let conv: {members: []} | null = {members:[]};
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

        if (conv?.members && conv?.members?.length > 2) {
            user = { 
                _id: currentUser._id,
                githubId:' 1',
                name: `${"temp"}`,
                username: currentUser.username,
                avatar: './../static/group_icon.png'
            };

        } else {
            const friendId = conv?.members.find((m) => m !== currentUser._id)
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
  margin-top: 20px;
}

.conversationImg {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
}

.conversationName {
  font-weight: 500;
}

</style>

<div class="conversation" on:click={() => {
    page.update((input) => "chat")
    conversation.update(() => conv)
}}>
    <img
        class="conversationImg"
        src={ user?.avatar }
        alt=""
    />
    <span class="conversationName">{ user?.name }</span>
    
</div>