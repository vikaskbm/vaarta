<script lang="ts">
    import Conversation from "./Conversation.svelte";
    import { onMount } from 'svelte';
    import type { User } from "../types";

    export let accessToken: string;
    export let user: User;
    
    let conversationList: Array<{members: [], type:String, name: string} | null> = [];

    onMount(async () => {
        window.addEventListener("message", async (event) => {
            const message = event.data;
            switch (message.type) {
                case "new-conversation":
                    break;
            }
        });
        const response = await fetch(`${apiBaseUrl}/api/conversations/${user._id}`, {
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
        });
        const payload = await response.json();
        conversationList = payload;
    });
</script>

  
  
<style>
ul{
    width:104%;
    padding-left:0;
    padding: none;
    list-style-type:none;
    overflow-y:scroll;
    height:400px;
}
li:hover{
    background-color:#5e616a;
}

/* .status{
    width:8px;
    height:8px;
    border-radius:50%;
    display:inline-block;
} */
</style>
  
<ul>
    {#each conversationList as conv}
        <li>
            <Conversation {conv} currentUser={user} {accessToken}/>
        </li>
    {/each}
</ul>
  
  
  
  
  
  <!-- <ul>
    {#each conversations as conversation (conversation.username)}
        <li class:complete={conversation.username}>
            {conversation.name}
        </li>
    {/each} 
  </ul>
   -->