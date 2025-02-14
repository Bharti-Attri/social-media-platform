const disable = (submitButton) => {
    submitButton.disabled = true;
    submitButton.style.backgroundColor = '#1a3a57';
}
const enable = (submitButton) => {
    submitButton.disabled = false;
    submitButton.style.backgroundColor = '#007bff';
}
function showError(error,text) {
    error.textContent = text;
    error.classList.remove('hidden');
}
function hideError(error) {
    error.textContent = '';
    error.classList.add('hidden');
}
const validateUser = (userField, userError) => {
    const userValue = userField.value.trim();
    if (userValue.length<3) {
        if (userValue.length !== 0) {
        const text = 'Username must contain atleast 3 letters!';
        showError(userError,text);
        }else hideError(userError);
        return false;
    } else {
        hideError(userError);
        return true;
    }
};


const validatePassword = (passwordField, passwordError) => {
    const passwordValue = passwordField.value.trim();
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordPattern.test(passwordValue)) {
        if (passwordValue.length !== 0) {
            const text = 'Use a strong password!';
            showError(passwordError,text);
        }
        else hideError(passwordError)
        return false;
    } else {
        hideError(passwordError);
        return true;
    }
};
const confirmPassword = (password, confirmPassword, passwordError) => {
    if (confirmPassword !== password) {
        if (confirmPassword.length !== 0) {
            const text = 'Password Do not Match!';
            showError(passwordError,text);
        }else hideError(passwordError);
        return false;
    } else {
        hideError(passwordError);
        return true;
    }
};
export { enable, disable, validatePassword, confirmPassword, validateUser };
