<script lang="ts">
    let searchList: Array<{name: string, username: string, img_url: string}> = [
        {name: "Vikas Bishnoi", username:"vikaskbm", img_url: 'https://avatars.githubusercontent.com/u/43449508?v=4'}, 
    ];
    
</script>

<style>
    aside{
        width:250px;
        height:10px;
        display:inline-block;
        font-size:15px;
        vertical-align:top;
    }
    aside input{
        width:100%;
        height:50px;
        line-height:50px;
        padding:0 50% 0 20px;
        background-color:#5e616a;
        border:none;
        border-radius:3px;
        color:#fff;
        background-image:url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_search.png);
        background-repeat:no-repeat;
        background-position:98%;
        background-size:40px;
    }
    aside input::placeholder{
        color:#fff;
    }
    aside ul{
        width:104%;
        padding-left:0;
        padding: none;
        list-style-type:none;
        overflow-y:scroll;
        height:400px;
    }

    aside li:hover{
        background-color:#5e616a;
    }
    h2,h3{
        margin:0;
    }
    aside li img{
        max-width: 50px;
        height: 50px;
        border-radius:50%;
        margin-left:20px;
        margin-right:8px;
    }
    aside li div{
        display:inline-block;
        vertical-align:top;
        margin-top:12px;
    }
    aside li h2{
        font-size:14px;
        color:#fff;
        font-weight:normal;
        margin-bottom:5px;
    }
    aside li h3{
        font-size:12px;
        color:#7e818a;
        font-weight:normal;
    }

    .status{
        width:8px;
        height:8px;
        border-radius:50%;
        display:inline-block;
    }
</style>

<aside>
    <header>
        <input type="text" placeholder="search">
    </header>
    <br>
    {#each searchList as searchItem}
        <ul>
            <li>
                <img src="{searchItem.img_url}" alt="">
                <div>
                    <h2>{searchItem.name}</h2>
                    <h3>
                        <span class="status orange"></span>
                        {searchItem.username}
                    </h3>
                </div>
            </li>
        </ul>
    {/each}
</aside>














<!-- <div class="search-bar">
    <label for="term-input">Search devs:</label>
    <div style="display: flex">
        <input type="text" id="term-input">
        <button style="width: 40px;
        height: 36px;
        border: 1px solid #00B4CC;
        background: #00B4CC;
        text-align: center;
        color: #fff;
        border-radius: 0 5px 5px 0;
        cursor: pointer;
        font-size: 20px;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M11.5 7a4.499 4.499 0 11-8.998 0A4.499 4.499 0 0111.5 7zm-.82 4.74a6 6 0 111.06-1.06l3.04 3.04a.75.75 0 11-1.06 1.06l-3.04-3.04z"></path></svg></button>
    </div>
</div>
  -->