import { fetchPosts } from "./fetchData.js";
import { addListener } from "./listener.js";
document.addEventListener('DOMContentLoaded', async () => {
    const url = window.location.search;
    const params = new URLSearchParams(url);
    const postId = params.get("postId");

    const header = document.getElementById('header')
    if (header) {
        const response = await fetch('api/profile/getUserInfo', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        })
        if (!response.ok) {
            window.location.href = "login.html";
        }
        const userInfo = await response.json();
        const { user, imageUrl } = userInfo;
        header.innerHTML = `
            <div class="profile-info" data-userid="${user._id}">
                <img src="${imageUrl}" alt="Profile Pic" class="profile-pic">
                <div class="username">${user.username}</div>
            </div>
            <button type="button" id="add-post" title="Upload Post">+</button>
    `
    }
    if (postId) {
        await fetchPosts(postId);
    }
    else await fetchPosts()
    addListener()
});

