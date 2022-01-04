<script lang="ts">
    import type { User } from "../types";
    import { onMount } from 'svelte';
    
    export let currentUser: User;
    export let conversation: {members: []} | null = null;
    export let accessToken: string;
    
    let user: User;

    onMount(async () => { 
        const friendId = conversation?.members.find((m) => m !== currentUser._id)
        console.log("me", currentUser._id)
        console.log("friend", friendId)
        const getUser = async() => {
            const res = await fetch(`${apiBaseUrl}/api/users?userId=${friendId}`, {
                headers: { 
                    authorization: `Bearer ${accessToken}`,
                },
            });

            const payload = await res.json();
            user = payload
        }
        getUser();
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

<div class="conversation">
    <img
        class="conversationImg"
        src={ user?.avatar }
        alt=""
    />
    <span class="conversationName">{ user?.name }</span>
    
</div>
    <!-- {conversation} -->