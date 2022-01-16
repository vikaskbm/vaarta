<script lang="ts">
    import { onMount } from 'svelte';
	import { beforeUpdate, afterUpdate } from 'svelte';
    import { io } from 'socket.io-client'
    import axios from "axios";
    
    import Message from './Message.svelte';
    
    import type { User } from "../types";
	import { conversation } from './stores';
	import { friend } from './stores';
    
    export let user: User;
    export let accessToken: string = '';
    
    let messages: any=[];

    let value = ``;
    let conversation_value: any;
    let friend_value: User | null;
	let div: any;
    let autoscroll: any;
    let newMessage: any = null;
    let socket: any = null;

    beforeUpdate(() => {
        autoscroll = div && (div.offsetHeight + div.scrollTop) > (div.scrollHeight - 20);
    });

    afterUpdate(() => {
        if (autoscroll) div.scrollTo(0, div.scrollHeight);
    });

    const setNewMessages = (newMessage: any) => {
        messages = [...messages, newMessage]
    }
    onMount(async () => {
        conversation.subscribe((value:any) => {
            conversation_value = value;
        });

        friend.subscribe((value:any) => {
            friend_value = value;
        });

        if(conversation_value === null) {
            const res = await axios.get(`${apiBaseUrl}/api/conversations/getconv`, {
                params: {
                    senderId: user?._id,
                    receiverId: friend_value?._id,
                }
            }).then(res => {
                conversation_value = res.data
            }).catch(err => {
                const res = axios.post(`${apiBaseUrl}/api/conversations/`, {
                    senderId: user?._id,
                    receiverId: friend_value?._id,
                }).then(res => {
                    conversation_value = res.data
                }).catch(err => {
                    console.log(err)
                })
            })
        }
        
        // Helper fucntion to retrieve all the messages from a conversation and 
        // save it to a local variable i.e. messages
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
        socket.emit("addUser", user._id)
        $: newMessage && conversation_value?.members.includes(newMessage.sender) && setNewMessages(newMessage)
    });

    async function sendMessage(text:string) {
        if(value.length <= 0) {
            return;
        }
        
        const receiverId = conversation_value?.members.find((member: any) => member !== user._id)

        socket.emit("sendMessage", {
            senderId: user._id,
            text: text,
            receiverId: receiverId
        })

        try {
            const res = await axios.post(`${apiBaseUrl}/api/messages/`, {
                text: text,
                conversationId: conversation_value?._id,
                sender: user?._id,
            });
            messages = [...messages, res.data]

        } catch (err) {
            console.log(err);
        }

        value = ''
    }

</script>
 
<style>
    
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
        
        max-height:400px;
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
   
<main>
    <header>
        <div class="conversationBox">
            {#if conversation_value?.type==='room' }
                <span class="conversationImgGrp">{ conversation_value?.name[0].toUpperCase()}</span>
                <span class="conversationName">{ conversation_value?.name } - { conversation_value?.uuid }</span>
            {:else}
                <img
                class="conversationImg"
                src={ friend_value?.avatar }
                alt=""
                />
                <span class="conversationName">Chat with {friend_value?.name}</span>
            {/if}
        </div>
    </header>
    
    {#if conversation_value }
       <div class="chatBoxTop" bind:this={div}>
           {#each messages as msg}
                <Message message={msg} user={user} />
           {/each}
       </div>
       <div class="chatBoxBottom">
           <textarea class="chatMessageInput"
               placeholder="share code?..."
               bind:value={value} />

           <button 
               class="chatSubmitButton"
               on:click={() => sendMessage(value)}
               >
                   Send
           </button>
       </div>
    { :else }
       <span class="noConversationText">
           Send a message to {friend_value?.name}.
       </span>
    {/if}
</main>