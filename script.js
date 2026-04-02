const chatBox = document.querySelector("#chatBox");
const userInput = document.querySelector("#userInput");
const sendBtn = document.querySelector("#sendBtn");
let res = true;

userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" & res === true) {
        sendBtn.click();
        res = false;
    }
});

sendBtn.addEventListener("click", () => {
    if (res === true) sendMsg();
    res = false;
});

async function sendMsg() {
    let input = userInput.value.trim();
    if (input === "") return;

    addMsg(input, "user");
    userInput.value = "";

    setTimeout(()=>{
        botMsg("Error connecting to Server.", "bot");
        res = true;
    },500);
        
}

function addMsg(text, type) {
    let msg = document.createElement("div");
    msg.classList.add("message", type);
    msg.innerText = text;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function botMsg(text, type) {
    let botMsg = document.createElement("div");
    botMsg.classList.add("message", type);
    chatBox.appendChild(botMsg);

    for (let char of text) {
        botMsg.textContent += char;
        await sleep(20);
    }
}

