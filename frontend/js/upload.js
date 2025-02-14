import { enable, disable } from './validation.js'
import { getPosts } from './profile.js'
import { addListener } from './listener.js'
const closeBtn = document.querySelector(".close");
const imageInputs = document.querySelectorAll('.imageInput');
const resetFields = ()=>{
    document.querySelectorAll('.textInput').forEach(input => {
        input.value = '';
    })
    document.querySelectorAll('.previewImage').forEach(image => {
        image.style.display = 'none';
    })
}
const uploadData = async (imageInput, textInput, url) => {
    const file = imageInput.files[0];
    const formData = new FormData();
    formData.append('image', file);
    formData.append('text', textInput);
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
    });
    if (response.ok) {
        resetFields();
        await getPosts();
        addListener();

    } else {
        alert('Failed upload');
    }
};
document.addEventListener("DOMContentLoaded", () => {
    const url = window.location.search;
    const params = new URLSearchParams(url);
    const showCard = params.get("show-card");
    if (showCard) {
        const createPostCard = document.querySelector('#createPostCard');
        createPostCard.style.display = 'block';
    }
    const buttons = document.querySelectorAll(".upload-btn");
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const card = button.closest('.input-card');
            const textInput = card.querySelector('.textInput').value;
            const imageInput = card.querySelector('.imageInput');
            let url;
            const id = button.getAttribute('id');
            if (id === 'createPostBtn') {
                url = '/api/posts/create'
            }
            else url = '/api/profile/updateProfile'
            uploadData(imageInput, textInput, url)
            card.style.display = 'none';
            
        });
    })
    imageInputs.forEach(imageInput => {
        imageInput.addEventListener('change', (event) => {
            const card = imageInput.closest('.input-card');
            const btn = card.querySelector(".upload-btn");

            const file = event.target.files[0];
            (file) ? enable(btn) : disable(btn);

            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const previewImage = card.querySelector('.previewImage');
                    previewImage.src = e.target.result;
                    previewImage.style.display = 'block';
                };
                reader.readAsDataURL(file);
            }
        });
        closeBtn.addEventListener('click', () => {
            const createPostCard = document.getElementById("createPostCard");
            createPostCard.style.display = 'none';
            resetFields();
        })

    })
})
