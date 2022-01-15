<script lang="ts">
    import { onMount } from 'svelte';
    import Search from "./Search.svelte";
    import ConversationList from "./ConversationList.svelte";
    import Chatbox from "./Chatbox.svelte";
    import type { User } from '../types';

	import { page } from './stores.js';
    
    let page_value: string;
    let accessToken: string = '';
    let loading = false;
    let user: User | null = null;

    onMount(async () => {
        window.addEventListener("message", async(event) => {
            const message = event.data;
            switch(message.type) {
                case 'token':
                    accessToken = message.value
                    const response = await fetch(`${apiBaseUrl}/api/users/me`, {
                        headers: {
                            authorization: `Bearer ${accessToken}`
                        }
                    })

                    const payload = await response.json()
                    user = payload.user
                    loading = false
            }
        })

        tsvscode.postMessage({type: "get-token", value: undefined})
    })

    page.subscribe(value => {
		page_value = value;
	});
</script>

<style>
    .login-btn {
        position:relative;
        margin-top: 5em;
    }
</style>

{#if loading } 
    <div>Loading...</div>
{:else if user}
    <div style="display: flex;">
        <button style="background:transparent" on:click={() => {
            page.update((input) => "home")
        }}> Home </button>
    </div>
    <hr>
    {#if page_value=='home'}
        <button on:click={() => {
            page.update((input) => "search")
        }}>Search People...</button>
        <br>
        <!-- <button on:click={() => {
            page.update((input) => "createRoom")
        }}>Create Room</button>
        <button on:click={() => {
            page.update((input) => "joinRoom")
        }}>Join</button> -->
        <ConversationList {user} {accessToken}/>
    {:else if page_value==='search'}
        <h4>Click to Converse...</h4>
        <Search {user}/>
    {:else if page_value==='chat'}
        <Chatbox {user} {accessToken}/>
    {:else}
        <h1>This is contact component</h1>
        <!-- Contact Component -->
        <button on:click={() => {
            page.update((input) => "home")
        }}>Back</button>
    {/if}
    
    <button style="bottom: 0; margin-top: 170%;" on:click={() => {
        accessToken = ''
        user = null
        page.update((input) => "chat")
        tsvscode.postMessage({type: "logout", value: undefined})
    }}>Logout</button>
{:else}
    <button 
        class="login-btn"
        on:click={() => {
            tsvscode.postMessage({type: "authenticate", value: undefined})
        }}>Login with Github</button>
{/if}



{#if !loading && page_value!=='contact'}
    <button style="bottom: 0;" on:click={() => {
        page.update((input) => "chat")
    }}>Contact Us</button>
{/if}