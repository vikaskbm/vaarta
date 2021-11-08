<script lang="ts">
    // let convo: Array<{text: string, user: number}> = [];
    // todos = [{"hello", true, 1}, {"abc", true, 2}]
    let friends = [1, 2, 3, 4, 5];
</script>
 


<main>
    <header>
        <div>
            <h2>Chat with Vikas Bishnoi</h2>
            <h3>vikaskbm</h3>
        </div>
    </header>
    <ul id="chat">
        <li class="you">
            <div class="entete">
                <span class="status green"></span>
                <h2>Vikas</h2>
                <h3>10:12AM, Today</h3>
            </div>
            <div class="triangle"></div>
            <div class="message">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
            </div>
        </li>
        <li class="me">
            <div class="entete">
                <h3>10:12AM, Today</h3>
                <h2>Vikas</h2>
                <span class="status blue"></span>
            </div>
            <div class="triangle"></div>
            <div class="message">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
            </div>
        </li>
    </ul>



    <footer>
        <textarea placeholder="Type your message"></textarea>
        <a href="#">Send</a>
    </footer>
</main>