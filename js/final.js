 $(document).ready(function(){
 /**====================== Store The Cards Start==============================**/ 
var cardType =["diamonds","hearts","spades","clubs"]    
var cards = []; //all Cards array
// Generate 40 crads::each card is object contain its value and img-source
for(var i=1;i<=10;i++) 
{
    for(var j=0;j<4;j++)
    {
        var card={value: i,source: "images/cards/" + i +"_of_"+  cardType[j]+".png"}
        cards.push(card); 
    }
}
// Generate 12 crads (4 jack ==== 4 king ===== 4 Queen)
var family =["jack","king","queen"]
for(var i=0;i<family.length;i++)
{
    for(var j=0;j<cardType.length;j++)
    {
        var cardF={
            value:family[i],
            source: "images/cards/" + family[i]+"_of_"+cardType[j]+".png"}
        cards.push(cardF)
    }
} 
/**====================== End of Store The Cards ==============================**/ 
/**====================Start Btn Invoke ============================**/   
$("#Start").one("click",function(){
    tableFunc(); 
    deckCards("#player" , "player")
    deckCards("#computer" , "computer")
});
/*===========Glopal variables================*/
var score=0;
var flag=false;
/**====================== All function call ======================**/
cards = shuffle(cards); // shuffle the cards array
playingFunc() // Player function invoke Invoke
/*=============== All  functions Implementation==================*/
// 1- shuffle function Implementation
function shuffle(array) {
    var currentIndex = array.length;
    var temporaryValue;
    var randomIndex;
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex --;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
    }
    return array;
  }

// 2- autoDeck function Implementation
function autoDeck(){
    setTimeout(function(){
    if($("#computer img").length==0){
        deckCards("#player" , "player")
        deckCards("#computer" , "computer",)
    }
},2000)
}  
// 3- player turn function Implementation 
function playingFunc(){
    $("#player").on("click","img",function(e){ 
            gameRules($(this))
            computerTrun() 
    });
}
// 4-  computer Turn function Implementation 
function computerTrun(){
    $("#player").off("click","img",playingFunc())
    for(var i=0;i<$('#computer img').length;i++)
        {
            var randomTurn = Math.floor(Math.random()*$('#computer img').length)
        }
        // To show the card before the deal
        setTimeout(function(){
        $('#computer img').eq(randomTurn).attr('src',$('#computer img').eq(randomTurn).attr('back'))
        },2000)
        setTimeout(function(){
        gameRules($('#computer img').eq(randomTurn))
        autoDeck()
        $("#player").on("click","img",playingFunc())
    },4000)
}
// 5- Game Rules function Implementation
function gameRules(pass){
    var sum3noReturn = sum3no(pass) // sum of 3 numbers
    var sum2noReturn = sum2no(pass) // sum of 2 numbers
    var pickedCard = pass.attr("value");
    // cheak if the card jack or komy
    if( (pickedCard== 'jack' || pass.attr("src")=="images/cards/7_of_diamonds.png") && $("#table > img").length !=0)
        {
            var cardsCount = $("#table > img").length;
            score+=cardsCount;
            $("#table > img").remove();
            pass.remove();
            flag= true;
        }
        else
        {
            flag= false;
        }
   
        // cheak if the card equals any card in the table or not
        for(var i =0; i<$("#table > img").length;i++){
        var targetCard = $("#table > img").eq(i).attr("value");
            if(pickedCard != targetCard )
            { 
                flag=false; // keep the flage false when the condition is true
            }
            else 
            {     
                 // if the player card == any card on the table increment the score +1 (for the card)
                flag=true; // and make the flag is true
                break;
            } 
    }
    if(flag == false  )
    {   
        if(sum2noReturn == true || sum3noReturn== true)
        {
            pass.remove(); 
            score+=1  
        }
        else{
                if(pass.attr("src")=="images/cards/facedown.png")
                {
                    var img= $("<img>").attr("src",pass.attr('back')) 
                }
                else{
                // in this case no cards in the table equals the the player card 
                var img= $("<img>").attr("src",pass.attr("src"))
                } // creat new img element and put source
                img.attr("value",pass.attr("value")); // put img value
                $("#table").append(img) // append the img
                pass.remove(); // remove from player
                score+=0;
            
        }
    }
    else{
        //======================= Basra================//
        // in this case we have at least one card on the table equals the player card
        score+=1
        if($("#table > img").length==1 ) // cheak if the table have only one card //==== Basra ====//
        {
            score+=10;
            pass.remove();
            $("#table > img").remove();
        }
        else
        { // in this case the table have more than one card -- one of them equals the player card //===Normal case====//
            for(var i =0; i<$("#table > img").length;i++)
            { 
                var targetCard = $("#table > img").eq(i).attr("value");
                if((pickedCard == targetCard) && (targetCard != 'jack' || pass.attr("src")=="images/cards/7_of_diamonds.png"))
                {
                    $("#table > img").eq(i).remove(); 
                    score+=1;
                }
                continue; 
            }
            pass.remove();
        }  
        }
        var playerScoreNo = $(".player_Score p span").text()
        var compScoreNo = $(".computer_Score p span").text()
        if($(pass).hasClass("computer"))
        {
            $(".computer_Score p span").html(score-playerScoreNo) // update the computer score
        }
        else
        {
            $(".player_Score p span").html(score-compScoreNo) // update the player score
        }
}
// 6- sum of 2 numbers function Implementation
function sum2no(pass){
    var foundSum = false;
    var pickedCard = pass.attr("value");
    for(var i=0;i<$("#table > img").length;i++)
    {
        for(var x=i+1;x<$("#table > img").length;x++)
        {
            var num1= parseInt($("#table > img").eq(i).attr("value"))
            var num2=  parseInt($("#table > img").eq(x).attr("value"))
            var sum =num1 + num2
            if(sum == pickedCard)
            {
            $("#table > img").eq(x).remove()
            $("#table > img").eq(i).remove()
            pass.remove()
            if($("#table > img").length == 0){score+=12;}
            else{score+=2;}
            x=i; 
            foundSum = true;   
            }
        }
    }
    return foundSum;
}
// 7- sum of 3 numbers function Implementation
function sum3no(pass)
{
    var foundSum2 = false
    var pickedCard = pass.attr("value");
    for(var i=0;i<$("#table > img").length;i++)
        {
        for(var k=i+1;k<$("#table > img").length;k++)
            {
                var num1_2= parseInt($("#table > img").eq(i).attr("value"))
                var num2_2= parseInt($("#table > img").eq(k).attr("value"))
                var num3_2= parseInt($("#table > img").eq(k+1).attr("value"))
                var sum2 =num1_2 + num2_2 +num3_2
                    if(sum2 ==pickedCard )
                    {
                        $("#table > img").eq(k+1).remove()
                        $("#table > img").eq(k).remove()
                        $("#table > img").eq(i).remove()
                        if($("#table > img").length == 0){score+=13;}
                        else{score+=3;}
                        k=0; 
                        foundSum2= true;
                    }
            }
        }
    return foundSum2;
}
// 8- deck four cards on the table for one time and ignore the jack 
function tableFunc(){
    for(var i=0;i<4;i++)
    {   // check if the table containe jack and replace it with onther card "not jack"
        if(cards[i].value == "jack")
        {
            do{
                var randomCardJ =Math.floor(Math.random()*cards.length);
                cards.splice(cards[i],1,cards[randomCardJ])
                cards.splice(randomCardJ,1) 
            }
            while(cards[randomCardJ].value == "jack")
            var img = $('<img>');
            img.attr("src", cards[randomCardJ].source);
            img.attr("value", cards[randomCardJ].value );
            $('#table').append(img);
        }
        else // deal 4 cards in the table  
        {
            var img = $('<img>');
            img.attr("src",cards[i].source);
            img.attr("value", cards[i].value );
            $('#table').append(img);
            cards.splice(i,1)
        } 
    }
} 
// 9- deck four cards on the player area or computer area independ on the parmeters name
function deckCards(deckPlace , className){ 
    for(var i=0;i<4;i++)
    {
        var randomCardP =Math.floor(Math.random()*cards.length);
        var img = $('<img>');
        if(deckPlace == '#computer')
        {
            img.attr('src','images/cards/facedown.png' );
            img.attr('back',cards[randomCardP].source)
        }
        else
        {
        img.attr('src',cards[randomCardP].source);
        }
        img.attr('value', cards[randomCardP].value );
        img.attr('class', className );
        $(deckPlace).append(img);
        cards.splice(randomCardP,1)
        $("#deck img").eq(randomCardP).remove()
    } 
    theWinner()   
}
function theWinner(){
    if(cards.length==0)
    {
        $('.grid').css({'display':'none'})
        if(parseInt($(".player_Score p span").text()) > parseInt($(".computer_Score p span").text()))
        {
            $('.celeberate').css({'display':'inline-block'})
            var p = $('<h2>').html("Congratulation")
            $('.celeberate').append(p)

        }
        else if( parseInt($(".computer_Score p span").text()) >  parseInt($(".player_Score p span").text()) )
        {
            var p = $('<h2>').html('Game Over')
            $('.celeberate').append(p)
        }
        else
        {
            var p = $('<p>').html('Both of you are winners')
        }
    }
}

});
