<script lang="ts">
    import { onMount } from 'svelte';
    import Search from "./Search.svelte";
    import Friends from "./Friends.svelte";
    import Chat from "./Chat.svelte";

    const accessToken: string = '';
    let loading = false;
    let user: { githubId: string; name: string; username: string; avatar: string; } | null = null;
    let page = "chat"; 

    onMount(async () => {
        window.addEventListener("message", async(event) => {
            const message = event.data;
            switch(message.type) {
                case 'token':
                    const token = message.value
                    const response = await fetch(`${apiBaseUrl}/api/users/me`, {
                        headers: {
                            authorization: `Bearer ${accessToken}`
                        }
                    })
                    const data = await response.json()
                    user = data.user
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
        }}>Hello, {user} </button>
    </div>
    <hr>
{/if}

{#if loading } 
    <div>Loading...</div>
{:else if user}
    <pre>{user}</pre>
    {#if page==='home'}
        <button on:click={() => {
            page="search";
        }}>Search Friends</button>
        <br>
        <Friends/>
    {:else if page==='search'}
        <Search/>
    {:else if page==='chat'}
        <h3 style="text-align: center;">FRIEND</h3>
        <hr>
        <Chat />
    {:else}
        <h1>This is contact component</h1>
        <!-- Contact Component -->
        <button on:click={() => {
            page="home";
        }}>Back</button>
    {/if}
    <div style="position: absolute; margin-left: 33%; bottom:0; margin-bottom:40px">
        <button on:click={() => {
            page="chat";
        }}>Logout</button>
    </div>
{:else}
    <pre>{user}</pre>

    <button class="login-btn">Login</button>
    <button>Signup</button>
{/if}


{#if !loading && page!=='contact'}
    <div style="position: absolute; margin-left: 27%; bottom:0; margin-bottom:10px">
        <button on:click={() => {
            page="contact";
        }}>Contact Us</button>
    </div>
{/if}