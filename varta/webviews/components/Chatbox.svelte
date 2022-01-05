<script lang="ts">
    import { onMount } from 'svelte';
	import { beforeUpdate, afterUpdate } from 'svelte';
    import Message from './Message.svelte';
    import { io } from 'socket.io-client'
    
    import type { User } from "../types";
	import { conversation } from './stores';
    
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
	let div: any;
    let autoscroll: any;

    let socket: any = null;

    beforeUpdate(() => {
        autoscroll = div && (div.offsetHeight + div.scrollTop) > (div.scrollHeight - 20);
    });

    afterUpdate(() => {
        if (autoscroll) div.scrollTo(0, div.scrollHeight);
    });

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
        socket = io("ws://localhost:8101");
        socket.on('welcome', function(msg:any){
            console.log('Client side message: ' + msg)
        });

        console.log(socket)

    });

    async function addMessage(text:string) {
        if(value.length <= 0) {
            return;
        }

        const response = await fetch(`${apiBaseUrl}/api/messages/`, {
            method: 'POST',
            body: JSON.stringify({
                text: text,
                conversationId: conversation_value?._id,
                sender: user?._id,
            }),
            headers: {
                'content-type':'application/json',
                authorization: `Bearer ${accessToken}`,
            },
        }) 

        value = ''
    }

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
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        max-width:100%;
        padding: none;
        
        max-height:430px;
    }

    .chatBoxTop {
        height: 100%;
        flex: 1 1 auto;
		border-top: 1px solid #eee;
		overflow-y: scroll;
    }
    .chatBoxBottom {
        margin-top: 5px;
        padding-bottom: none;
        margin-bottom: none;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .chatMessageInput {
        width: 80%;
        height: 90px;
        padding: 8px;
    }

    .chatSubmitButton {
        width: 60px;
        height: 30px;
        border: none;
        margin-top: 4.5rem;
        cursor: pointer;
        background-color: teal;
        color: white;
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
        <div class="chatBoxTop" bind:this={div}>
            {#each messages as msg}
                    <Message message={msg} user={user} />
            {/each}
        </div>
        <div class="chatBoxBottom">
            <textarea class="chatMessageInput"
                placeholder="write something..."
                bind:value={value} />

            <button 
                class="chatSubmitButton"
                on:click={() => addMessage(value)}
                >
                    Send
            </button>
        </div>
     { :else }
        <span class="noConversationText">
            Send a message to {friend?.name}.
        </span>
     {/if}
</main>

