<script lang="ts">
    // let friends: Array<{text: string, completed: boolean, id: number}> = [];
    // todos = [{"hello", true, 1}, {"abc", true, 2}]
    let friends = [1, 2, 3, 4, 5];
</script>
 

<ul>
    <!-- {#each friends as friend (friend.id)}
        <li class:complete={friend.completed}>
            {friend.text}
        </li>
    {/each} -->
    {#each friends as friend}
        <li>
            {friend}
        </li>
    {/each}
</ul>