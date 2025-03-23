const forms = document.querySelectorAll(".needs-validation");
forms.forEach((form) => {
    form.addEventListener("submit", (event) => {
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
            console.log("Some fields are required");
        }
        form.classList.add("was-validated")
    });
})    

setTimeout(()=>{
    let flash=document.querySelector("#flash")
    if(flash){
        flash.style.display="none";
    }
},5000)