
const fetchPosts = async (postId) => {
    const response = await fetch(`/api/posts${(postId) ? '?postId=' + postId : ''}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    if(!response.ok){
        window.location.href = 'login.html';
    }
    const posts = await response.json();
    const postsDiv = document.getElementById('post-container');
    if(posts.length==0){
        return 0
    }
    postsDiv.innerHTML = '';
    posts?.forEach(post => {
        if(post==null){
            return
        }
        const { postData, imageUrl } = post;
        const postElement = document.createElement('div');
        postElement.className = "post-card";
        postElement.innerHTML = `
        <div class="post-header">
            <div class="flex profile-info" data-userid="${postData.user._id}">
                <img src="${post.userpic}" alt="Profile Pic" class="profile-pic">
                <div class="username">${postData.user.username}</div>
            </div>
            <button class="follow-btn ${(post.isFollowed)?'followed':''}" data-userid="${postData.user._id}">${(post.isFollowed) ? "Unfollow" : "Follow"}</button>
            
        </div>
        <div class="post-image">
            <img src="${imageUrl}" alt="Post Image">
        </div>
        <div class="post-caption">
            <p>${postData.caption}</p>
        </div>
        <div class="post-actions">
            <div>
                <svg data-postid="${postData._id}" class="like-btn ${(post.isLiked)?'liked':''}" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                        fill="#333333" />
                </svg>
                <span class="like-count">${postData.likes.length} Likes</span>
            </div>
            <div class="show-comment" type="button" data-postId="${postData._id}">
                <span>Comments</span>
                <img src="assets/svg/down-arrow.svg" alt="down arrow">
            </div>
        </div>
        <div class="comment-section">
            <input type="text" placeholder="Add a comment..." class="comment-input" data-postId=${postData._id}>
            <div class="send-comment">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 2L11 13" stroke="#ffffff" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" />
                    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="#ffffff" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>
        </div>        
        <div class="comments" style="display:none;">
        </div>
        </div>
        `
        postsDiv.appendChild(postElement);
        
    });
};





const fetchComments = async (commentDiv, postId) => {
    const response = await fetch(`/api/comments/getComments?postId=${postId}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    if(!response.ok){
        window.location.href = 'login.html';
    }
    const comments = await response.json();
    if(comments.length == 0){ 
        commentDiv.innerHTML = "<div>No Comments Yet</div>"
        return 0 
    }
    commentDiv.innerHTML='';
    comments.forEach(comment => {
        const { commentData } = comment;
        const commentElement = document.createElement('div');
        commentElement.className = "comment-card";
        commentElement.innerHTML = `
        <div class="comment-card">
            <div class="profile-info">
                <img src="${comment.imageUrl}" alt="Profile Pic" class="profile-pic">
                <div class="comment-username">${commentData.user.username}</div>
            </div>
            <div class="comment-text">${commentData.content}</div>
            <div class="divider"></div>
        </div>
        `
        commentDiv.appendChild(commentElement);
    })
    
}


export { fetchComments, fetchPosts }