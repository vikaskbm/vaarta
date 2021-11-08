<script lang="ts">
    // let convo: Array<{text: string, user: number}> = [];
    // todos = [{"hello", true, 1}, {"abc", true, 2}]
    let friends = [1, 2, 3, 4, 5];
</script>
 
<style>
    header {
        width: 100%;
        height: 80px;
    }
    header > *{
        display:inline-block;
    }
    
    header img:first-child{
        border-radius:50%;
        margin-top: 5%;
    }
    header img:last-child{
        width:24px;
        /* margin-top:8px; */
    }
    header div{
        margin-left:10px;
        margin-right:10px;
    }
    header h2{
        font-size:16px;
        margin-bottom:15px;
    }
    header h3{
        font-size:14px;
        font-weight:normal;
        color:#7e818a;
    }


    main{
        max-width:100%;
        padding-left:0;
        padding: none;
        list-style-type:none;
        overflow-y:scroll;
        height:300px;
    }

    .status{
        width:8px;
        height:8px;
        border-radius:50%;
        display:inline-block;
        margin-right:7px;
    }
    .green{
        background-color:#58b666;
    }
    .blue{
        background-color:#6fbced;
        margin-right:0;
        margin-left:7px;
    }













    #chat{
        width: 100%;
        padding-left:0;
        margin:0;
        list-style-type:none; 
        height:300px;
        border-top:2px solid #fff;
        border-bottom:2px solid #fff;
    }
    #chat li{
        padding:3px 0px;
    }
    #chat h2,#chat h3{
        display:inline-block;
        font-size:13px;
        font-weight:normal;
    }

    #chat .message{
        margin-top: 5px;
        padding:10px;
        color:#fff;
        line-height:20px;
        max-width:90%;
        display:inline-block;
        text-align:left;
        border-radius:5px;
    }
    #chat .me{
        text-align:right;
    }
    #chat .you .message{
        background-color:#58b666;
    }
    #chat .me .message{
        background-color:#6fbced;
    }

    footer{
        padding:10px;
    }

    footer > *{
        display:inline-block;
    }
    footer textarea{
        resize:none;
        border:none;
        display:block;
        width:100%;
        height:80px;
        border-radius:3px;
        padding:20px;
        font-size:13px;
    }
    footer textarea::placeholder{
        color:#ddd;
    }

    footer a{
        text-decoration:none;
        text-transform:uppercase;
        font-weight:bold;
        color:#6fbced;
        margin-left:85%;
        margin-top:7px;
    }
</style>

<header>
    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg" alt="">
    <div>
        <h2>Chat with Vikas Bishnoi</h2>
        <h5>already 1000 messages</h5>
    </div>
</header>

<main>

    <ul id="chat">
        <li class="you">
            <div class="entete">
                <span class="status green"></span>
                <h2>Vikas</h2>
                <h3>10:12AM, Today</h3>
            </div>
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
            <div class="message">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
            </div>
        </li>
    </ul>
</main>

<footer>
    <textarea placeholder="Type your message"></textarea>
    <!-- <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_picture.png" alt=""> -->
    <!-- <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_file.png" alt=""> -->
    <a href="#">Send</a>
</footer>