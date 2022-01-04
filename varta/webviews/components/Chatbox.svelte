<script lang="ts">
    import { onMount } from 'svelte';
    import Message from './Message.svelte';

    import type { User } from "../types";
	import { conversation } from './stores.js';
    

    export let user: User;
    export let accessToken: string = '';
    
    let messages: []=[];
    let friend: User | null = {
        _id:"tempid",
        githubId: "asdas",
        name: "Vikas Bishnoi", 
        username:"vikaskbm", 
        avatar: 'https://avatars.githubusercontent.com/u/43449508?v=4'
    };

    let value = ``;
    let conversation_value: any;

        
    // let conversation: Array<{text: string, name: string, author: string, time: string, date: string}> = [
    //     {
    //         text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.", 
    //         name: "Vikas", 
    //         author: "vikaskbm", 
    //         time: "10:30AM", 
    //         date: "Today"
    //     }, 
    //     {
    //         text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.", 
    //         name: "Sam", 
    //         author: "sambob", 
    //         time: "10:30AM", 
    //         date: "Today"
    //     }, 
    // ];
    onMount(async () => {
        conversation.subscribe((value:any) => {
            conversation_value = value;
        });

        const getMessages = async(conversationId: any) => {
            const res = await fetch(`${apiBaseUrl}/api/messages/${conversationId}`, {
                headers: { 
                    authorization: `Bearer ${accessToken}`,
                },
            });
            
            const payload = await res.json();
            messages = payload
        }

        const conversationId = conversation_value?._id;
        getMessages(conversationId);
    });
</script>
 
<style>
    
    .conversationBox {
        display: flex;
        align-items: center;
        padding: 10px;
        cursor: pointer;
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

    main{
        max-width:100%;
        padding-left:0;
        padding: none;
        list-style-type:none;
        overflow-y:scroll;
        height:330px;
    }

    .status{
        width:8px;
        height:8px;
        border-radius:50%;
        display:inline-block;
        margin-right:7px;
    }
    .green{
        background-color:#58b666;
    }
    .blue{
        background-color:#6fbced;
        margin-right:0;
        margin-left:7px;
    }

    #chat{
        width: 100%;
        padding-left:0;
        margin:0;
        list-style-type:none; 
        height:330px;
        border-top:2px solid #fff;
        border-bottom:2px solid #fff;
    }
    #chat li{
        padding:3px 0px;
    }
    #chat h2,#chat h3{
        display:inline-block;
        font-size:13px;
        font-weight:normal;
    }

    #chat .message{
        margin-top: 5px;
        padding:10px;
        color:#fff;
        line-height:20px;
        max-width:90%;
        display:inline-block;
        text-align:left;
        border-radius:5px;
    }
    #chat .me{
        text-align:right;
    }
    #chat .you .message{
        background-color:#58b666;
    }
    #chat .me .message{
        background-color:#6fbced;
    }

    footer{
        padding:10px;
    }

    footer > *{
        display:inline-block;
    }
    footer textarea{
        resize:none;
        border:none;
        display:block;
        width:100%;
        height:80px;
        border-radius:3px;
        padding:2px;
        font-size:13px;
    }
    footer textarea::placeholder{
        color:#ddd;
    }

    footer a{
        text-decoration:none;
        text-transform:uppercase;
        font-weight:bold;
        color:#6fbced;
        margin-left:85%;
        margin-top:7px;
    }
</style>

<header>
    <div class="conversationBox">
        <img
            class="conversationImg"
            src={ friend?.avatar }
            alt=""
        />
        <span class="conversationName">Chat with {friend?.name}</span>
    </div>
</header>

<main>
     {#if conversation_value }
        <div class="chatBoxTop">
            {#each messages as msg}
                <div>
                    <Message message={msg} user={user} />
                </div>
            {/each}
        </div>
        <div class="chatBoxBottom">
            <textarea class="chatMessageInput"
                placeholder="write something..."
                value={value} />

            <button class="chatSubmitButton">
                Send
            </button>
        </div>
     { :else }
        <span class="noConversationText">
            Send a message to {friend?.name}.
        </span>
     {/if}
</main>