<script lang="ts">
    // let convo: Array<{text: string, user: number}> = [];
    // todos = [{"hello", true, 1}, {"abc", true, 2}]
    let friends = [1, 2, 3, 4, 5];
</script>
 
<style>



     
    main{
        max-width:100%;
        padding-left:0;
        padding: none;
        list-style-type:none;
        overflow-y:scroll;
        height:500px;
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

    main header{
        width: 90%;
        height: 80px;
    }
    main header > *{
        display:inline-block;
    }
    main header img:first-child{
        border-radius:50%;
    }
    main header img:last-child{
        width:24px;
        /* margin-top:8px; */
    }
    main header div{
        margin-left:10px;
        margin-right:10px;
    }
    main header h2{
        font-size:16px;
        margin-bottom:5px;
    }
    main header h3{
        font-size:14px;
        font-weight:normal;
        color:#7e818a;
    }














    #chat{
        width: 90%;
        padding-left:0;
        margin:0;
        list-style-type:none;
        overflow-y:scroll;
        height:550px;
        border-top:2px solid #fff;
        border-bottom:2px solid #fff;
    }

    #chat h2,#chat h3{
        display:inline-block;
        font-size:13px;
        font-weight:normal;
    }


    #chat .message{
        padding:20px;
        color:#fff;
        line-height:25px;
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

    main footer{
        height:155px;
        padding:20px 30px 10px 20px;
    }

    main footer > *{
        display:inline-block;
    }
    main footer textarea{
        resize:none;
        border:none;
        display:block;
        width:100%;
        height:80px;
        border-radius:3px;
        padding:20px;
        font-size:13px;
        margin-bottom:13px;
    }
    main footer textarea::placeholder{
        color:#ddd;
    }

    main footer a{
        text-decoration:none;
        text-transform:uppercase;
        font-weight:bold;
        color:#6fbced;
        vertical-align:top;
        margin-left:90%;
        margin-top:5px;
    }
</style>

<main>
    <header>
        <!-- <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg" alt=""> -->
        <div>
            <h2>Chat with Vikas Bishnoi</h2>
            <h5>already 1000 messages</h5>
        </div>
    </header>
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



    <footer>
        <textarea placeholder="Type your message"></textarea>
        <!-- <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_picture.png" alt=""> -->
        <!-- <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_file.png" alt=""> -->
        <a href="#">Send</a>
    </footer>
</main>