
document.getElementById("big-heart").onclick = function(){
    const m = document.getElementById("missu");
    m.classList.add("show");
    setTimeout(()=>m.classList.remove("show"),2500);
};
