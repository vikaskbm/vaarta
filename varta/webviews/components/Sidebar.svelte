<script lang="ts">
    import Search from "./Search.svelte";
    import Friends from "./Friends.svelte";
    import Chat from "./Chat.svelte";
    let loading = false;
    let user = "Vikas";
    let page = "chat";
</script>

{#if loading } 
    <div>Loading...</div>
{:else if user}
    
{#if page!=='contact'}
    {#if page!=='chat'}
        <div style="display: flex;">
            <button disabled style="background:transparent">Hello, {user} </button>
        </div>
        <br>
    {/if}

    {#if page==='home'}
        <button>Search Button</button>
        <br>
        <Friends/>

    {:else if page==='search'}
        <Search/>

    {:else}
        <Chat />
        <div>Chat one person here</div>
    {/if}

    <button style="position:relative;
    margin-top:auto; margin-bottom: 0%;">
        Contact Us
    </button>

{:else}
    <!-- Contact Component -->
{/if}
        


{:else}
    <button>Back</button>

    <button style="position:relative;
        margin-top: 5rem">Login</button>
    <button style="position:relative;
        margin-bottom: 1rem">Signup</button>
{/if}