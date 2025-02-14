function failedMessage(message) {
    const messageBox = document.getElementById('message-box');
    const messageDiv = document.getElementById('message');
    const messageIcon = document.getElementById('message-icon');
    messageDiv.textContent = "";
    messageBox.style.display="flex";
    messageBox.style.top="0px";
    messageDiv.textContent = message;
    messageBox.classList.remove("success");
    messageBox.classList.add("failed");
    messageIcon.textContent = "!";
}
function successMessage(message) {
    const messageBox = document.getElementById('message-box');
    const messageDiv = document.getElementById('message');
    const messageIcon = document.getElementById('message-icon');
    messageDiv.textContent = "";
    messageBox.style.display="flex";
    messageBox.style.top="0px";
    messageBox.classList.remove("failed");
    messageBox.classList.add("success");
    messageDiv.textContent = message;
    messageIcon.innerHTML = "&#10003;";
}


export {failedMessage,successMessage};