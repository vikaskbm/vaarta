<script lang="ts">
    import Search from "./Search.svelte";
    let loading = false;
    let user = true;
    let page = "list";
</script>

{#if loading } 
    <div>Loading...</div>
{:else if user}
    {#if page==='list'}
        <Search/>
        <br>
        <br>
        <br>
        <h1>hl</h1>
        <!-- <List Friends Component/> -->
        {:else if page==='chat'}
        <!-- <Chat Component></Chat> -->
        <div>CHat one person here</div>
        {:else} 
        <div>Contact me here: asdsasagsd</div>
        <button class="bottom-btn">
            Back
        </button>
        {/if}
        
    <button style="position:relative;
    margin-top:300%;">
        Contact Us
    </button>
    <button>Logout</button>

{:else}
    <button style="position:relative;
        margin-top: 5rem">Login</button>
    <button style="position:relative;
        margin-bottom: 1rem">Signup</button>
{/if}