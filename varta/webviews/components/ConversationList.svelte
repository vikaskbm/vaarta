<script lang="ts">
    import Conversation from "./Conversation.svelte";
    import { onMount } from 'svelte';
    import type { User } from "../types";

    export let accessToken: string;
    export let user: User;
    
    let conversationList: Array<{members: []}> = [];

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
h2,h3{
    margin:0;
}
li img{
    max-width: 50px;
    height: 50px;
    border-radius:50%;
    margin-left:20px;
    margin-right:8px;
}
li div{
    display:inline-block;
    vertical-align:top;
    margin-top:12px;
}
li h2{
    font-size:14px;
    color:#fff;
    font-weight:normal;
    margin-bottom:5px;
}
li h3{
    font-size:12px;
    color:#7e818a;
    font-weight:normal;
}

.status{
    width:8px;
    height:8px;
    border-radius:50%;
    display:inline-block;
}
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