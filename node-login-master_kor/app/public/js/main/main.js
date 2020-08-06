           (function(global){
                var contentArr = [];
                let n = 0;
                let bn = 3;
                var x;
                function saveContent(){
                    var cargo = document.getElementById("content");
                    var contentId;
    
                    for(var i = 0; i < $(".content .box").length; i++){
                        var content = document.createElement("section");
                        content.className = "box";
                        content.id = "box" + i;
                        content.innerHTML = $(".content .box")[i].innerHTML;
                        contentArr.push(content);
                    }
                    var aI = $(".content > .box").length
                    while(cargo.hasChildNodes){
                        if(cargo.childNodes[0] == undefined){
                            break;
                        }
                        cargo.removeChild(cargo.childNodes[0]);
                    }
                }

                function addContent(pgNum){
                    var sNavId = document.getElementById("navbar");
                    var sideNav = document.createElement("nav");
                    var sideL = document.createElement("div");
                    var sideR = document.createElement("div");
                    var cargo = document.getElementById("content");
                    // sideNav.className = "sideNav";
                    // sideL.className = "navbarL";
                    // sideL.id = "navbarL";
                    // sideL.innerText = "◀";
                    // sideL.onclick = changePage;
                    // sideR.className = "navbarR";
                    // sideR.id = "navbarR";
                    // sideR.innerText = "▶";
                    // sideR.onclick = changePage;
                    if(sNavId.childNodes[1] != undefined){
                        sNavId.removeChild(sNavId.childNodes[2]);
                    }
                    sideNav.appendChild(sideL);
                    sideNav.appendChild(sideR);
                    sNavId.appendChild(sideNav);
                    console.log(sNavId.childNodes[2]);
                    if(cargo.hasChildNodes){
                        if(cargo.childNodes[0] != undefined){
                            cargo.removeChild(cargo.childNodes[0]);
                        }
                    };
                    cargo.appendChild(contentArr[pgNum]);
                };

                function changePage(){
                    $(document).ready(function(){ 
                        $(".sideNav").click(function(event){
                            var targetId = event.target.id;
                            if(targetId == "navbarL"){
                                n = n-1;
                            }else{
                                n = n+1;
                            }
                            if(n >= bn){
                                n = 0;
                            } else if(n < 0){
                                n = bn-1;
                            }
                            addContent(n);
                        });
                    });
                }
                global.changePage = changePage;
                global.saveContent = saveContent;
                global.addContent = addContent;
            })(window);
            document.addEventListener("DOMContentLoaded", function(){
                saveContent();
                addContent(0);
                changePage();
            });
            document.addEventListener("DOMContentLoaded",function(){
                var header = $('#helloBlind').text().split("")/*""에 내용을 입력하면 나타나며 출력됩니다. 'split("")'은 단어 하나하나를 배열로 바꿔주는 역할입니다. header에 배열로 들어갑니다.*/
                var typer = document.querySelector("#hello-text");
                for(let i = 0; i<header.length; i++){
                    setTimeout(function(){
                        typer.innerHTML += header[i];
                    }, i * 80);
                }
            })