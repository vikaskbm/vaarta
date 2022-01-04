<script lang="ts">
    import { onMount } from 'svelte';
    import Search from "./Search.svelte";
    import ConversationList from "./ConversationList.svelte";
    import Chat from "./Chat.svelte";
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

<div style="display: flex;">
    <button style="background:transparent" on:click={() => {
        page.update((input) => "home")
    }}> {page} </button>
</div>
<hr>

{#if loading } 
<div>Loading...</div>
{:else if user}
    {#if page_value=='home'}
        <button on:click={() => {
            page.update((input) => "search")
        }}>Search People...</button>
        <br>
        <ConversationList {user} {accessToken}/>
    {:else if page_value==='search'}
        <h6>Click to send request...</h6>
        <Search/>
    {:else if page_value==='chat'}
        <h3 style="text-align: center;">FRIEND</h3>
        <hr>
        <Chat user={user}/>
    {:else}
        <h1>This is contact component</h1>
        <!-- Contact Component -->
        <button on:click={() => {
            page.update((input) => "home")
        }}>Back</button>
    {/if}
    <div style="position: absolute; margin-left: 33%; bottom:0; margin-bottom:40px">
        <button on:click={() => {
            accessToken = ''
            user = null
            page.update((input) => "chat")
            tsvscode.postMessage({type: "logout", value: undefined})
        }}>Logout</button>
    </div>
{:else}
    <button 
        class="login-btn"
        on:click={() => {
            tsvscode.postMessage({type: "authenticate", value: undefined})
        }}>Login with Github</button>
{/if}


{#if !loading && page_value!=='contact'}
    <div style="position: absolute; margin-left: 27%; bottom:0; margin-bottom:10px">
        <button on:click={() => {
            page.update((input) => "chat")
        }}>Contact Us</button>
    </div>
{/if}