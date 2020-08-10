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
                    if(sNavId.childNodes[1] != undefined){
                        sNavId.removeChild(sNavId.childNodes[2]);
                    }
                    sideNav.appendChild(sideL);
                    sideNav.appendChild(sideR); 
                    sNavId.appendChild(sideNav);
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
                changePage();
            });
            document.addEventListener("DOMContentLoaded",function(){
                var header = $('#helloBlind').text().split("")
                var typer = document.querySelector("#hello-text");
                for(let i = 0; i<header.length; i++){
                    setTimeout(function(){
                        typer.innerHTML += header[i];
                    }, i * 300);
                }
            })
            document.getElementById("selectli0").addEventListener("click",function(){
                addContent(0);
            });
            document.getElementById("selectli1").addEventListener("click",function(){
                addContent(1);
            });
            document.getElementById("selectli2").addEventListener("click",function(){
                addContent(2);
            });
            $(document).ready(function(){
                $(window).scroll(function () {
                    var scrollValue = $(document).scrollTop();
                    // if(scrollValue>100){
                    //     $(".box").remove("#mibox");
                    // };
                    if(scrollValue<300){
                        $("#arrowDown").attr("src","img/arrow-down.png");
                        $("#hos").attr("href","#footer");  
                    }else{
                        $("#arrowDown").attr("src","img/arrow-up.png");
                        $("#hos").attr("href","#mibox");
                    }
                });
            })
            $(document).ready(function($){
                    $(".move").click(function(event){
                        event.preventDefault(); 
                        $('html,body').animate({scrollTop:$(this.hash).offset().top}, 700);
                    });
                });
            $(function(){
                $("html, body").animate({ scrollTop: 0 }, "slow"); 
                });