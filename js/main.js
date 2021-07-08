const emailInput = document.getElementById("emailInput");
const submitBtn = document.getElementById("submitBtn");
const result = document.getElementById("result");

window.onload = function () {
    emailInput.focus()
}

async function submitEmail() {
    const email = emailInput.value;
    if (!isValid(email)) {
        result.innerHTML = "enter a valid email address";
        result.classList.add("text-danger");
        result.classList.remove("d-none", "text-success");
        return;
    }
    submitBtn.innerHTML = "SUBSCRIBING..";
    submitBtn.setAttribute("disabled", "disabled");
    const tempPass = Array(25).fill(Math.random()).join(Math.random() + "");
    const success = await createUser(email, tempPass);
    submitBtn.innerHTML = "SUBSCRIBE NOW";
    submitBtn.removeAttribute("disabled");
    if(!success) {
        result.innerHTML = "email already in use";
        result.classList.add("text-danger");
        result.classList.remove("d-none", "text-success");

    } else {
        result.innerHTML = "check you inbox for verification email";
        result.classList.add("text-success");
        result.classList.remove("d-none", "text-danger");
    }

}

function isValid(mail) {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
        return true;
    }
    return false;
}

async function createUser(email, password) {
    try {
        const newUserCredentials = await firebase.auth().createUserWithEmailAndPassword(email, password);
        await newUserCredentials.user.sendEmailVerification();
        return true;
    } catch (e) {
        return false;
    }

}