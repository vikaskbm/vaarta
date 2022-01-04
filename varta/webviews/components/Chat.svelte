<script lang="ts">
    import { onMount } from 'svelte';

    import type { User } from "../types";

	import { page } from './stores.js';
	import { conversation } from './stores.js';
	import { friendList } from './stores.js';
    

    export let user: User;
    export let accessToken: string = '';
    
    let messages: [];
    let friend: User | null = {
        _id:"tempid",
        githubId: "asdas",
        name: "Vikas Bishnoi", 
        username:"vikaskbm", 
        avatar: 'https://avatars.githubusercontent.com/u/43449508?v=4'
    };

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
            console.log(payload)
            messages = payload
        }

        const conversationId = conversation?._id;
        getMessages(conversationId);
    });
</script>1
 
<style>
    header {
        width: 100%;
        height: 80px;
    }
    header > *{
        display:inline-block;
    }
    
    header img:first-child{
        border-radius:50%;
        margin-top: 5%;
        max-width: 50px;
        height: 50px;
    }
 
    header img:last-child{
        width:24px;
        /* margin-top:8px; */
    }
    header div{
        margin-left:10px;
        margin-right:10px;
    }
    header h2{
        font-size:16px;
        margin-bottom:15px;
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
        padding:20px;
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
    <img src="{friend?.avatar}" alt="">
    <div>
        <h2>Chat with {friend?.name}</h2>
        <!-- <h5>{conversation.length} messages</h5> -->
    </div>

    <button on:click={() => console.log(conversation_value)}>
        VIKAS
    </button>
</header>

<main>

    <!-- <ul id="chat"> -->
        <!-- {#each conversation as message}
            <li class={message.author === friend?.username ? "you" : "me"}>
                <div class="entete">
                    <span class="status {message.author === friend?.username ? "green" : "blue"}"></span>
                    <h2>{message.name}</h2>
                    <h3>{message.time}, {message.date}</h3>
                </div>
                <div class="message">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                </div>
            </li>
        {/each} -->

     <!-- </ul> -->
</main>

<footer>
    <textarea placeholder="Type your message"></textarea>
    <!-- <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_picture.png" alt=""> -->
    <!-- <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_file.png" alt=""> -->
    <a href="/">Send</a>
</footer>