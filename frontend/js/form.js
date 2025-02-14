import {validatePassword,validateUser,enable,disable,confirmPassword} from './validation.js'
const signInBtn = document.getElementById('signInBtn');
const signUpBtn = document.getElementById('signUpBtn');
const signInForm = document.getElementById('signInForm');
const signUpForm = document.getElementById('signUpForm');
signInBtn.addEventListener('click', () => {
    signInBtn.classList.add('active');
    signUpBtn.classList.remove('active');
    signInForm.classList.add('active');
    signUpForm.classList.remove('active');
    signUpForm.querySelectorAll('input').forEach(input=>{input.value=""});
    const messageBox = document.getElementById('message-box');
    messageBox.style.display='none';
});

signUpBtn.addEventListener('click', () => {
    signUpBtn.classList.add('active');
    signInBtn.classList.remove('active');
    signUpForm.classList.add('active');
    signInForm.classList.remove('active');
    signInForm.querySelectorAll('input').forEach(input=>{input.value=""});
    const messageBox = document.getElementById('message-box');
    messageBox.style.display='none';

});
const validate = (form) => {
    const passwordField = form.querySelector('input[type="password"]');
    const passwordError = form.querySelector('.password-error');
    const confPassword = form.querySelector('#confirmPass');
    const confPasswordError = form.querySelector('.conf-password-error');
    const user = form.querySelector('input[type="text"]');
    const userError = form.querySelector('.user-error');
    const btn = form.querySelector('button');
    let fields = [user, passwordField] ;
    if(confPassword) fields = [passwordField, confPassword, user];
    fields.forEach(field => {
        field.addEventListener('input', async() => {
            const isValidPassword = validatePassword(passwordField, passwordError);
            const isValidUser = validateUser(user, userError)
            let isValid = isValidUser && isValidPassword;
            if (confPassword) {
                const isConfirmed = confirmPassword(passwordField.value, confPassword.value, confPasswordError)
                isValid = isConfirmed && isValidPassword && isValidUser
            }
            (isValid) ? enable(btn): disable(btn);
        });
    })
}
document.addEventListener('DOMContentLoaded',()=>{
    const signInForm = document.getElementById('signInForm');
    const signUpForm = document.getElementById('signUpForm');
    validate(signInForm);
    validate(signUpForm);
})