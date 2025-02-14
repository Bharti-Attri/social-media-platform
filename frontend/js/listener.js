import { fetchComments } from "./fetchData.js";
const addListener = () => {
    const likeButtons = document.querySelectorAll('.like-btn');
    const commentButtons = document.querySelectorAll('.send-comment');
    const showCommentButtons = document.querySelectorAll('.show-comment');
    const followButtons = document.querySelectorAll('.follow-btn');
    const followerDiv = document.querySelector(".followers");
    const followers = followerDiv?.firstElementChild;
    const viewProfileButtons = document.querySelectorAll('.profile-info');
    const addButtons = document.querySelectorAll('#add-post');
    addButtons?.forEach(button => {
        button.addEventListener('click', () => {
            if (!window.location.pathname.includes('profile.html')) {
                window.location.href = '/profile.html?show-card=true';
            }
            else {
                const createPostCard = document.querySelector('#createPostCard');
                createPostCard.style.display = 'block';
            }
        });
    });

    likeButtons?.forEach(button => {
        button.addEventListener('click', async () => {
            const postId = button.getAttribute('data-postid')
            const likeCount = button.nextElementSibling;
            let likes = parseInt(likeCount.textContent) || 0;
            if (button.classList.contains('liked')) {
                await fetch('/api/actions/unlike', {
                    method: "POST",
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ postId })
                });

                likes -= 1;
                button.classList.remove('liked');
            } else {
                await fetch('/api/actions/like', {
                    method: "POST",
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ postId })
                });

                likes += 1;
                button.classList.add('liked');
            }
            likeCount.textContent = `${likes} Likes`;
        });
    });
    followButtons?.forEach(button => {
        button.addEventListener('click', async () => {
            const userId = button.getAttribute('data-userid')
            const allFollowButtons = document.querySelectorAll(`button[data-userId="${userId}"]`)
            if (button.classList.contains('followed')) {
                await fetch('/api/actions/unfollow', {
                    method: "POST",
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userId })
                });
                if (followers)
                    followers.innerHTML = `${parseInt(followers.innerHTML) - 1}`
                allFollowButtons.forEach(btn=>{
                    btn.textContent = "Follow";
                    btn.classList.remove('followed');
                })
            } else {
                await fetch('/api/actions/follow', {
                    method: "POST",
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userId })
                });
                if (followers)
                    followers.innerHTML = `${parseInt(followers.innerHTML) + 1}`
                allFollowButtons.forEach(btn=>{
                    btn.textContent = "Unfollow";
                    btn.classList.add('followed');
                })
            }

        });

    });

    commentButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const commentInput = button.previousElementSibling;
            const postId = commentInput.getAttribute('data-postId');
            const commentsContainer = button.closest('.comment-section').nextElementSibling;
            if (commentInput.value.trim() !== '') {
                const response = await fetch('/api/comments/save', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ comment: commentInput.value, postId })
                })
                if (response.ok) {
                    fetchComments(commentsContainer, postId)
                    commentInput.value = '';
                }

            }
        });
    });
    showCommentButtons?.forEach(button => {
        button.addEventListener('click', () => {
            const postId = button.getAttribute('data-postId');
            const commentDiv = button.closest('.post-actions').parentElement.lastElementChild;

            if (commentDiv.style.display === 'none') {
                button.querySelector('img').src = "assets/svg/up-arrow.svg";
                commentDiv.style.display = 'block';
                if (commentDiv.querySelectorAll(".comment-card").length === 0) {
                    fetchComments(commentDiv, postId)
                }
                const viewProfileButtons = document.querySelectorAll('.profile-info');
                viewProfileButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        const userId = button.getAttribute('data-userid')
                        if (userId) window.location.href = `/profile?userid=${userId}`;
                    })
                })
            }
            else {
                commentDiv.style.display = 'none'
                button.querySelector('img').src = "assets/svg/down-arrow.svg";

            }
        });
    });
    viewProfileButtons?.forEach(button => {
        button.addEventListener('click', () => {
            const userId = button.getAttribute('data-userid')
            if (userId) window.location.href = `/profile?userId=${userId}`;
        })
    })

}
export { addListener }