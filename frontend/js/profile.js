import { addListener } from "./listener.js";
const getPosts = async (userId) => {
    let response;
    if (userId) {
        response = await fetch(`/api/profile/userProfile`, {
            method:"POST",
            headers: { 
                'Authorization': `Bearer ${localStorage.getItem('token')}` ,
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({userId})
        });
    }
    else {
        response = await fetch(`/api/profile/myProfile`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
    }
    if (!(response.ok)) {
        window.location.href = 'login.html';
    }
    else {
        const { posts, user, isFollowed } = await response.json();
        const { userData } = user;
        const header = document.querySelector('.header');
        header.innerHTML = `
        <h2>Posts</h2>
        
        `
        const button = document.createElement('button')
        button.type = "button";
        button.setAttribute('data-userid', userId)
        
        if (isFollowed === undefined) {
            button.id = "add-post";
            button.title = "Upload Post";
            button.innerHTML = '+';
        }
        else {
            button.classList = `follow-btn ${(isFollowed) ? "followed" : ""}`;
            button.innerHTML = (isFollowed) ? "Unfollow" : "Follow";
        }
        header.appendChild(button);
        if (!userData.bio) {
            document.getElementById('updateProfileCard').style.display = 'block';
        }
        const profileCard = document.querySelector('.profile-card');
        profileCard.innerHTML = `
        <div class="image-wrapper">
        <img src="${(user.imageUrl) ? user.imageUrl : ""}" alt="Profile Pic" class="profile-pic">
        </div>
        <div class="profile-info">
        <h2 class="profile-name">${userData.username}</h2>
        <p class="profile-bio">${userData.bio}</p>
        <div class="profile-stats">
        <div class="followers">
        <span class="count">${userData.followers.length}</span>
        <span>Followers</span>
        </div>
        <div class="following">
                        <span class="count">${userData.following.length}</span>
                        <span>Following</span>
                        </div>
                </div>

            </div>
            `
            const postsDiv = document.querySelector('.post-container');
            if (posts.length ==0){
                postsDiv.innerHTML=`
                <div class="noPost">
                    No Post Yet !
                </div>
                `
                return 0
            }
        postsDiv.innerHTML = '';
        posts?.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = "post";
            postElement.setAttribute('data-postId', post._id)
            postElement.innerHTML = `
            <img class="post-image" src="${post.imageUrl}" data-postId="${post._id}" alt="post">
            
            `
            postsDiv.appendChild(postElement);
        })
    }
}
document.addEventListener('DOMContentLoaded', async () => {
    const url = window.location.search;
    const params = new URLSearchParams(url);
    const userId = params.get("userId");
    await getPosts((userId) ? userId : null);
    addListener();
    const postCards = document.querySelectorAll('.post');
    postCards?.forEach(card => {
        card.addEventListener('click', (e) => {
            const postId = e.target.getAttribute('data-postId');
            window.location.href = `/post.html?postId=${postId}`;
        })
    })
})
export { getPosts }