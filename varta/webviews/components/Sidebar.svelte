<script lang="ts">
    import Search from "./Search.svelte";
    import Friends from "./Friends.svelte";
    import Chat from "./Chat.svelte";
    let loading = false;
    let user = true;
    let page = "chat";
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
    {#if page==='home'}
        <button on:click={() => {
            page="search";
        }}>Search Button</button>
        <hr>
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
            user=false;
        }}>Logout</button>
    </div>
{:else}
    <button class="login-btn">Login</button>
    <button>Signup</button>
{/if}


{#if !loading && page!=='contact'}
    <div style="position: absolute; margin-left: 27%; bottom:0; margin-bottom:10px">
        <button on:click={() => {
            page="contact";
            user=true;
        }}>Contact Us</button>
    </div>
{/if}