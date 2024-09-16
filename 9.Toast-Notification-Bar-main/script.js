let toastBox = document.getElementById("toastBox");
let successMsg = "<i class='fa-regular fa-thumbs-up'></i> Successfully submitted";
let errorMsg = "<i class='fa-solid fa-bug'></i> Please fix the error";
let invalidMsg = "<i class='fa-solid fa-triangle-exclamation'></i> Invalid input, check again";
    let toast = document.createElement("div");
    toast.classList.add("toast");
    toast.innerHTML = msg;
    toastBox.appendChild(toast);

    if (msg.includes("error")) {
        toast.classList.add("error");
    } 
    if (msg.includes("Invalid")) {
        toast.classList.add("invalid");
    } 

    setTimeout(function(){
        toast.remove();
    },6000);
}