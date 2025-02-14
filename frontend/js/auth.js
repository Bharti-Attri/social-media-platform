import {failedMessage,successMessage} from './alert.js'
const loginUser = async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username,password })
    });
    
    const data = await response.json();
    if (response.ok) {
        localStorage.setItem('token', data.token);
        successMessage(data.message);
        setTimeout(()=>{
            window.location.href = 'index.html';
        },2000)
    } else {
        failedMessage(data.message);
    }
};

const registerUser = async () => {
    const username = document.getElementById('name')?.value;
    const password = document.getElementById('passwd')?.value;

    const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    
    if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        successMessage(data.message);
        setTimeout(()=>{
            window.location.href = 'profile.html';
        },2000)
    } else {
        failedMessage(data.message);
    }
};


const signupBtn  = document.querySelector(".signup");
const signinBtn  = document.querySelector(".signin");
signupBtn.addEventListener('click',registerUser)
signinBtn.addEventListener('click',loginUser)

