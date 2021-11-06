<script lang="ts">
    // let convo: Array<{text: string, user: number}> = [];
    // todos = [{"hello", true, 1}, {"abc", true, 2}]
    let friends = [1, 2, 3, 4, 5];
</script>
 


<h1 style="text-align: center;">FRIEND</h1>
<div style="display: max-width: 800px;
    min-height: 300px;
    background-color: #fff; 
    padding-right: 15px;
    padding-left: 15px;
    margin: 20px auto;
    border-radius: 1rem;">
    <div style="  display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 350px;">
        <ul style="  overflow-y: scroll;
        max-height: 300px;">

        <li style="padding: 20px;
        border-radius: 0.75rem;
        margin: 20px 0;
        background-color: #f6f7f8;
        color: #3c3c3e;"
        >
            Bot says: oi, tudo bom?
        </li>
        </ul>
        <div style="display: flex;
        padding: 20px 0;">
        <input type="text" style="width: 100%;
        padding: 10px;
        margin: none;
        border-radius: 1rem;" placeholder="Type your message..." />
        <button 
            class="selected btn"
        type="button" style="
            margin-left: 5px;
            margin-right: 0;
            border-radius: 5px;
            border: none;
            min-width: 0;
            cursor: pointer;">Send</button>
        </div>
    </div>
</div>

<style>
	button {
		display: block;
	}

	.selected {
		background-color: #ff3e00;
		color: white;
	}
</style>