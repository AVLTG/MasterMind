        var canvas = document.getElementById("myCanvas"); 
        canvas.height = 475
        canvas.width = 425
        var c = canvas.getContext("2d");
        
        
        var nover = true;
        var moeq = prompt("Would you like to play on easy, medium, or hard?")
        var spacing = canvas.width / 28
        var diameter = spacing - canvas.width / 2000
        var b = 1;
        var cx = canvas.width / 3 + spacing*1.1
        var cy = canvas.height / 8 + spacing
        var px = canvas.width*2/3 + spacing*9/10
        var ox = canvas.width / 3 - spacing*3
        var options = ["#ff8080" , "#8ed8fc" , "#80ff9f" , "#a8c2c2" , "#ffdf80" , "#bf80ff"]
        var pDiameter = diameter/2
        var monkey = true
        while (monkey == true){
            if (moeq == "easy" || moeq == "e" || moeq == "Easy" || moeq == "EASY" || moeq == "E"){
                var moe = 45;
                var joe = 9;
                monkey = false;
            } else if (moeq == "medium" || moeq == "m" || moeq == "Medium" || moeq == "MEDIUM" || moeq == "M" || moeq == "Med" || moeq == "med"){
                var moe = 33;
                var joe = 6;
                monkey = false;
            } else if (moeq == "hard" || moeq == "h" || moeq == "Hard" || moeq == "HARD" || moeq == "H"){
                var moe = 17;
                var joe = 2;
                monkey = false;
            }else {
                var moeq = prompt("Thats not a correct response. Would you like to play on easy, medium, or hard?")
            }
        }

        var column = 0
        var row = joe;
        var ax = canvas.width / 3 + spacing*1.1 + column*2*spacing
        var ay = canvas.height / 8 + spacing + 2.5*spacing +2*spacing*row

        for(x=1;x<moe;x++){
            var py = cy
            c.beginPath()
            c.arc(cx,cy,diameter,0,Math.PI *2,true)
            c.stroke()
            cx += spacing *2

            if (x>4){
                c.beginPath()
                c.arc(px,py,pDiameter,0,Math.PI *2,true)
                c.stroke()
                px +=spacing
            }

            if(x==4){
                cy += 2.5*spacing
                cx = canvas.width / 3 + spacing*1.1
            }
            if(x%4 == 0 && x != 4){
                while(b <= 6){
                    c.beginPath()
                    c.fillStyle = options[b - 1]
                    c.arc(ox,py,diameter,0,Math.PI *2,true)
                    c.stroke()
                    c.fill()

                    c.font = "20px Serif"
                    c.fillStyle = "black"
                    c.fillText(b, ox - 5, py+ 5)
                    py += spacing * 2 + 5
                    b++
                }
                cy += 2*spacing
                cx = canvas.width / 3 + spacing*1.1
                py = cy
                px = canvas.width*2/3 + spacing*9/10
            }     
        }
        c.beginPath()



        var answer = []

        function makeanswer(){
            for(i=0;i<4;i++){
                var x= Math.floor(Math.random() * (6))
                answer.push(options[x])
            }
            alert(answer)
        }

        canvas.addEventListener("keydown" , pressed)

        var guessed = []
        var round = 0   
        
        function pressed(e){
            if(nover == false){
                if (e.keyCode == 46){
                    location.reload;
                }
                return false;
            }
            var correctkey = false
                if (e.keyCode == 13 && guessed.length == 4){
                    correctness()
                }
                
            for(i=1;i<7;i++){
                if(guessed.length == 4){
                    
                } else if(i==e.key){
                                
                    guessed.push(options[e.key-1])
                    var colour = options[e.key-1]
                    correctkey = true
                }
            }

            if(correctkey == false){
                return false;
            }
            
            draw(colour)

        }


        function correctness(){
            var foundpos = []
            var black = 0
            var red = 0
            var guesspos = []

            for(i=0;i<4;i++){
              if(answer[i] == guessed[i]){
                black++
                foundpos.push(i)
                guesspos.push(i)
           }
        }
            
            for(i=0;i<4;i++){
                for(z=0;z<4;z++){
                    if(answer[i] == guessed[z]){
                        red++
                        var isred = true
                        if(foundpos.length > 0 ){
                            for(p=0;p<foundpos.length;p++){
                                if(foundpos[p]==i || guesspos[p] == z){ 
                                    isred = false
                                    red = red - 1
                                    break;
                                }
                            }
                        }

                        if(isred == true){
                            guesspos.push(z)
                            foundpos.push(i)
                        }
                    }    
                }
            }
            guessed = []

            drawpeg(red,black)
        
        }


        
        function draw(colour){
            
            ax = canvas.width / 3 + spacing*1.1 + column*2*spacing
            ay = canvas.height / 8 + spacing + 2.5*spacing +2*spacing*row

            c.fillStyle = colour
            c.beginPath()
            c.arc(ax,ay,diameter,0,Math.PI *2,true)
            c.fill()
            
            column++
            
            if(column == 4){
                column = 0
                row--
            }

            ax = canvas.width / 3 + spacing*1.1 + column*2*spacing
            ay = canvas.height / 8 + spacing + 2.5*spacing +2*spacing*row

        }

        function drawpeg(red,black){
            var cory = ay + 2*spacing
            var corx = canvas.width*2/3 + spacing*9/10
            
            for(i=0;i<black;i++){
                c.fillStyle = "black"
                c.beginPath()
                c.arc(corx,cory,pDiameter,0,Math.PI *2,true)
                c.fill()
                corx += spacing
            }

            for(i=0;i<red;i++){
                c.fillStyle = "#ff8080"
                c.beginPath()
                c.arc(corx,cory,pDiameter,0,Math.PI *2,true)
                c.fill()
                corx += spacing
            }

            var winx = canvas.width / 3 + spacing*1.1
            var winy = canvas.height / 8 + spacing

            if(black == 4){
                for(i=0;i<4;i++){
                    c.fillStyle = answer[i]
                    c.beginPath()
                    c.arc(winx,winy,diameter,0,Math.PI *2,true)
                    c.fill()
                    winx += 2*spacing
                    canvas.removeEventListener("keydown" , pressed)
                    setTimeout(winscreen, 1500);
                }
            }

            else if(row <= -1){
                for(i=0;i<4;i++){
                    c.fillStyle = answer[i]
                    c.beginPath()
                    c.arc(winx,winy,diameter,0,Math.PI *2,true)
                    c.fill()
                    winx += 2*spacing
                }
                c.font = "20px Serif";
                c.fillStyle = "black";
                c.textAlign = "center";
                c.fillText("You lost :(", canvas.width / 2 , canvas.height - 50)
                c.fillText("To play again, click the game button on the top", canvas.width / 2, canvas.height - 20)
                setTimeout(losescreen, 4500);
                nover = false
            }

        }

    function winscreen(){
        window.location.replace("page4.html");
        canvas.removeEventListener("keydown" , winscreen)
    }

    function losescreen(){
        window.location.replace("page6.html")
    }

    makeanswer()