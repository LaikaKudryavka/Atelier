document.addEventListener("DOMContentLoaded",function(){
    var header = $('#helloBlind').text().split("")
    var typer = document.querySelector("#hello-text");
    for(let i = 0; i<header.length; i++){
        setTimeout(function(){
            typer.innerHTML += header[i];
        }, i * 300);
    }
})