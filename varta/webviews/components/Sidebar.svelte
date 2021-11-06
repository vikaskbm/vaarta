<script lang="ts">
    let loading = false;
    let user = true;
    let page = "chat";
</script>

{#if loading } 
    <div>loading...</div>
{:else if user}
    {#if page==='list'}
        <!-- <Search Component> -->
        <!-- <List Friends Component/> -->
        <button>
            go to contact
        </button>
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
        margin-top:450%;">Logout</button>

{:else}
    <button style="position:relative;
        margin-top: 5rem">Login</button>
    <button style="position:relative;
        margin-bottom: 1rem">Signup</button>
{/if}