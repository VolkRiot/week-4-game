
function Character(name, hp, attack, counter) {
  this.name = name;
  this.hp = hp;
  this.baseAttack = attack;
  this.attackPower = attack;
  this.counter = counter;
  // this.imgpath = "assets/images/" + imgpath;
}

Character.prototype.fight = function(defender){

  defender.hp -= this.attackPower;
  this.hp -= defender.attackPower;
  this.attackPower += this.baseAttack;

  // TODO: Change the HP possibly through a more creative means
  $(".player-enemies-container .text-center:last-child").attr('data-hp', defender.hp).text('HP:' + defender.hp);
  $(".player-character-container .text-center:last-child").attr('data-hp', this.hp).text('HP:' + this.hp);

  if(defender.hp < 1){
    $(".player-enemies-container").empty();
    opponent = null;
    enemyLock = false;
  }

  if(this.hp < 1){
    // Player loss logic
  }


};

var playerMain;
var opponent;
const $instructionsParag = $("#instructions");
var enemyLock = false;
var charArray = [new Character("First", 180, 25, 45), new Character("Second", 180, 10, 45), new Character("Third", 180, 20, 45), new Character("Fourth", 180, 10, 45)];

function buildGame(obj) {
  $(".player-enemies-container").empty();
  $(".player-character-container").empty();
  generateChars(obj);
}


function generateChars(objList) {

  for(var i = 0; i < objList.length; i++){

    const charItem =  $("<li class='character'>");
    charItem.attr("id", i+1);


    // TODO: Rewrite not as a loop just the main params
    for (var item in objList[i]){
      charItem.attr("data-" + item.toString(), objList[i][item]);
    }

    charItem.append($("<p class='text-center'>").text(objList[i].name));

    // TODO: Add image with .img-responsive

    charItem.append($("<p class='text-center'>").text("HP:" + objList[i].hp));
    $("#characters-list").append(charItem);
  }
}

$(document).ready(function(){

  buildGame(charArray);

  $(".character").on("click", function(){
    var $playerChar = $(this);

    $($playerChar).attr("class", "player-character");
    $(".player-character-container").append($playerChar);
    playerMain = charArray[parseInt($playerChar.attr('id')) - 1];

    // TODO: Enemies Logic
    $(".character").off().attr("class", "enemies enemy-characters");
    $instructionsParag.text("Choose your opponent wisely");
  });

  $("#characters-list").on('click', ".enemies", function(){

      if(!enemyLock){
        $(".player-enemies-container").append($(this));
        opponent = charArray[parseInt($(this).attr('id')) - 1];
        enemyLock = true;
        $("#attack-button").css("display", "block")
      }
  });

  $("#attack-button").on('click', function(){

    if(opponent){
      playerMain.fight(opponent);
    }

    // Update the characters views

  });

});