<script lang="ts">
    import Search from "./Search.svelte";
    import List from "./List.svelte";
    let loading = false;
    let user = true;
    let page = "list";
</script>

{#if loading } 
    <div>Loading...</div>
{:else if user}
    <div style="display: flex;">
        <button disabled style="background:transparent"> {user} </button>
        <button>Back</button>
    </div>


    {#if page==='list'}
        <Search/>
        <br>
        <List/>
    {:else}
        <!-- <Chat Component></Chat> -->
        <div>Chat one person here</div>
    {/if}
        
    <button style="position:relative;
    margin-top:auto; margin-bottom: 0%;">
        Contact Us
    </button>

{:else}
    <button style="position:relative;
        margin-top: 5rem">Login</button>
    <button style="position:relative;
        margin-bottom: 1rem">Signup</button>
{/if}