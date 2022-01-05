<script lang="ts">
    import { format } from "timeago.js";

    export let message: any;
    export let user: any;
    

</script>

<style>
    .message {
        display: flex;
        flex-direction: column;
        margin-top: 20px;
    }

    .messageTop{
        display: flex;
    }

    .messageImg {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        object-fit: cover;
        margin-right: 10px;
    }

    .messageText{
        padding: 10px;
        border-radius: 20px;
        background-color: #1877f2;
        color: white;
        max-width: 300px;
    }

    .messageBottom{
        font-size: 12px;
        margin-top: 10px;
    }

    .message.own{
        align-items: flex-end;
    }

    .message.own .messageText{
        background-color: rgb(245, 241, 241);
        color: black;
    }
</style>

<div class={message?.sender === user._id ? "message own" : "message"}>
    <div class="messageTop">
        <img
        class="messageImg"
        src={message?.sender === user._id ? user?.avatar : message?.sender?.avatar}
        alt=""
        />
        <p class="messageText">{message.text}</p>
    </div>
    <div class="messageBottom">{format(message.createdAt)}</div>
</div>