<script lang="ts">
    let loading = false;
    let user = false;
    let page = '';
</script>

{#if loading } 
    <div>loading...</div>
{:else if user}
    {#if page==='chat'}
        <!-- <Todos user={user} {accessToken}/> -->
        <button>
            go to contact
        </button>
    {:else}
        <div>Contact me here: asdsasagsd</div>
        <button>
            go back
        </button>
    {/if}
    <button>logout</button>
{:else}
    <button>Login</button>
    <button>Signup</button>
{/if}