<script lang="ts">
	import { friend, page } from './stores.js';
	import { conversation } from './stores.js';

    import type { User } from "../types";
    import axios from 'axios';

    export let user: User;

    let searchText: string = "";
    let searchList: Array<User> | [] = [];
    
    
    const getUsers = async() => {
        if(searchText.length > 2) {
            const res = await axios.post(`${apiBaseUrl}/api/users/search`, {
                    searchText: searchText,
                });
            searchList = res.data;     
        } else {
            searchList = [];
        }
    }
</script>

<style>
    main {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        max-width:100%;
        padding: none;
        
        height:310px;
        max-height:310px;
    }
    .search {
        width: 100%;
        display: flex;
    }

    .searchTerm {
        margin: none;
        width: 80%;
        padding: 5px;
        height: 3rem;
        outline: none;
    }

    .searchButton {
        width: 20%;
        height: 3rem;
        text-align: center;
        color: #fff;
        padding: none;
        margin: none;
        cursor: pointer;
        font-size: 20px;
        outline: none;
    }
    .search-icon {
        padding:0 40% 0 10px;
        color:#fff;
        background-image:url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_search.png);
        background-repeat:no-repeat;
        background-size:100%;
    }
    input::placeholder{
        color:#fff;
    }
    ul{
        width:104%;
        padding: 0px;
        list-style-type:none;
        overflow-y:scroll;
    }
    li {
        width: 100%;
        margin: 0;
        padding: 0;
    }
    li:hover{
        background-color:#5e616a;
    }
    h2,h3{
        margin:0;
    }
    li img{
        width: 50px;
        max-width: 50px;
        height: auto;
        border-radius:50%;
        margin-left:8px;
        margin-right:20px;
    }
    li div{
        display:inline-block;
        vertical-align:top;
        margin-top:12px;
    }
    li h2{
        font-size:14px;
        color:#fff;
        font-weight:normal;
        margin-bottom:5px;
    }
    li h3{
        font-size:12px;
        color:#7e818a;
        font-weight:normal;
    }

    /* .status{
        width:8px;
        height:8px;
        border-radius:50%;
        display:inline-block;
    } */
</style>

    <header>
        <div class="search">
            <input 
                type="text" 
                class="searchTerm" 
                placeholder="Search Friends?"
                bind:value={searchText}
                on:input={getUsers}>
            <button type="submit" class="searchButton">
              <span class="search-icon"></span>
            </button>
        </div>
    </header>
    <br>
    <main>
        {#each searchList as searchItem}
        {#if searchItem._id!==user._id}
        <ul>
            <li on:click={() => {
                page.update((input) => "chat")
                conversation.update(() => null)
                friend.update(() => searchItem)
            }}>
                    <img src="{searchItem.avatar}" alt="">
                    <div>
                        <h2>{searchItem.name}</h2>
                        <h3>
                            {searchItem.username}
                        </h3>
                    </div>
                </li>
            </ul>
        {/if}
    {/each}
    </main>
            
            
            
            









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