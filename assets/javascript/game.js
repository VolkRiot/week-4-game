
function Character(name, hp, attack, counter, imgpath) {
  this.name = name;
  this.hp = hp;
  this.baseAttack = attack;
  this.attackPower = attack;
  this.counter = counter;
  this.imgpath = "assets/images/characters/" + imgpath;
  this.$me;
}

Character.prototype.fight = function(defender){

  defender.hp -= this.attackPower;
  this.hp -= defender.counter;
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
    $("#attack-button").css("display", "none");
  }

};

var playerMain;
var opponent;
const $instructionsParag = $("#instructions");
var enemyLock = false;
var charArray = [new Character("Darth Vader", 180, 45, 25, "vader.jpg"), new Character("Boba Fett", 180, 30, 25, "boba.jpg"), new Character("Luke Skywalker", 180, 10, 45, "luke.jpg"), new Character("Darth Sidious", 180, 10, 45, "palpatine.jpg"), new Character("Han Solo", 180, 10, 45, "han.jpg") , new Character("Ahsoka Tano", 180, 20, 45, "ashoka.jpg")];

function buildGame(obj) {
  $(".player-enemies-container").empty();
  $(".player-character-container").empty();
  generateChars(obj);
}

function generateChars(objList) {

  for(var i = 0; i < objList.length; i++){

    var charItem =  $("<li class='character'>");

    charItem.attr("id", i+1);
    charItem.attr("data-name", objList[i].name);
    charItem.attr("data-hp", objList[i].hp);
    charItem.attr("data-attack", objList[i].attackPower);

    charItem.append($("<p class='text-center'>").text(objList[i].name));
    charItem.append($("<img class='img-responsive'>").attr("src", objList[i].imgpath).attr("alt", objList[i].name));
    charItem.append($("<p class='text-center'>").text("HP:" + objList[i].hp));

    objList[i].$me = charItem;

    $("#characters-list").append(objList[i].$me);
  }
}

$(document).ready(function(){

  buildGame(charArray);

  $(".character").on("click", function(){
    var $playerChar = $(this);

    $($playerChar).attr("class", "player-character");
    $(".player-character-container").append($playerChar);
    playerMain = charArray[parseInt($playerChar.attr('id')) - 1];

    $(".character").off().attr("class", "enemies enemy-characters");
    $instructionsParag.text("Choose your opponent wisely");
  });

  $("#characters-list").on('click', ".enemies", function(){

      if(!enemyLock){
        $(".player-enemies-container").append($(this));
        $(this).css('border', '2px solid red');
        $(this).css('background-color', 'black');
        opponent = charArray[parseInt($(this).attr('id')) - 1];
        enemyLock = true;
        $("#attack-button").css("display", "block")
      }
  });

  $("#attack-button").on('click', function(){
    
    if(opponent){
      playerMain.fight(opponent);
    }

    $("#player-actions-readout").text("You attacked " + opponent.name + " for " + playerMain.attackPower + " damage.");
    $("#enemy-actions-readout").text(opponent.name + " attacked you back for " + opponent.counter + " damage.");

  });

});