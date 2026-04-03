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
    const input = userInput.value.trim();
    if (input === "") return;

    addMsg(input, "user");
    userInput.value = "";

    const res = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify([{ role: "user", content: input }])
    });
    const data = await res.json();
    console.log(res.json());
    console.log(typeof res.json());

    botMsg(data.reply, "bot");
    res = true;


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
        await sleep(5);
    }
}

