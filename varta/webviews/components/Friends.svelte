<script lang="ts">
    // let friends = [1, 2, 3, 4, 5];
    let friends: Array<{name: string, username: string, img_url: string}> = [
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
    {#each friends as friend}
        <ul>
            <li>
                <img src="{friend.img_url}" alt="">
                <div>
                    <h2>{friend.name}</h2>
                    <h3>
                        <span class="status orange"></span>
                        {friend.username}
                    </h3>
                </div>
            </li>
        </ul>
    {/each}
  </aside>
  
  
  
  
  
  <!-- <ul>
    {#each friends as friend (friend.username)}
        <li class:complete={friend.username}>
            {friend.name}
        </li>
    {/each} 
  </ul>
   -->