<script lang="ts">
    import { onMount } from 'svelte';
    import Search from "./Search.svelte";
    import ConversationList from "./ConversationList.svelte";
    import Chat from "./Chat.svelte";
    import type { User } from '../types';

    let accessToken: string = '';
    let loading = false;
    let user: User | null = null;
    let page:string = "home"; 

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
                    console.log("payload", payload)
                    console.log("user", user)
                    loading = false
            }
        })

        tsvscode.postMessage({type: "get-token", value: undefined})
    })
</script>

<style>
    .login-btn {
        position:relative;
        margin-top: 5em;
    }
</style>

{#if page!=='chat'}
    <div style="display: flex;">
        <button style="background:transparent" on:click={() => {
            page="home";
        }}>Hello, {user?.name} - {page} </button>
    </div>
    <hr>
{/if}

{#if loading } 
<div>Loading...</div>
{:else if user}
    {#if page=='home'}
        <!-- <button on:click={() => {
            page="search";
        }}>Search People...</button>
        <br> -->
        <ConversationList {user} {accessToken}/>
    {:else if page==='search'}
        <h6>Click to send request...</h6>
        <Search/>
    {:else if page==='chat'}
        <h3 style="text-align: center;">FRIEND</h3>
        <hr>
        <Chat user={user}/>
    {:else}
        <h1>This is contact component</h1>
        <!-- Contact Component -->
        <button on:click={() => {
            page="home";
        }}>Back</button>
    {/if}
    <div style="position: absolute; margin-left: 33%; bottom:0; margin-bottom:40px">
        <button on:click={() => {
            accessToken = ''
            user = null
            page="chat"
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


{#if !loading && page!=='contact'}
    <div style="position: absolute; margin-left: 27%; bottom:0; margin-bottom:10px">
        <button on:click={() => {
            page="contact";
        }}>Contact Us</button>
    </div>
{/if}