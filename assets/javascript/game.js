
function Character(name, hp, attack, counter, imgFile, audioFile) {
  this.name = name;
  this.hp = hp;
  this.baseAttack = attack;
  this.attackPower = attack;
  this.counter = counter;
  this.imgpath = "assets/images/characters/" + imgFile;
  this.speak = new Audio("assets/sounds/" + audioFile);

  this.$me;
}

Character.prototype.fight = function(defender){

  defender.hp -= this.attackPower;

  if(defender.hp < 1){
    opponent.$me.effect("explode", "slow");
    $(".player-enemies-container").empty();
    opponent = null;
    enemyLock = false;
    $("#player-actions-readout").text("You defeated " + defender.name);
    $("#enemy-actions-readout").empty();
  }else{
    this.hp -= defender.counter;
  }

  // TODO: Change the HP possibly through a more creative means
  $(".player-enemies-container .text-center:last-child").attr('data-hp', defender.hp).text('HP:' + defender.hp);
  $(".player-character-container .text-center:last-child").attr('data-hp', this.hp).text('HP:' + this.hp);
  $("#player-actions-readout").text("You attacked " + defender.name + " for " + this.attackPower + " damage.");
  $("#enemy-actions-readout").text(defender.name + " attacked you back for " + defender.counter + " damage.");

  this.attackPower += this.baseAttack;

  if(this.hp < 1){
    $("#attack-button").css("display", "none");
    $("#player-actions-readout").text("You were defeated by " + defender.name + ". Game Over!");
    $("#enemy-actions-readout").empty();
    $("#restart-button").css("display", "block")
  }
};

var playerMain;
var opponent;
const $instructionsParag = $("#instructions");
var enemyLock = false;
var charLock = false;
var charArray = [new Character("Darth Vader", 250, 40, 55, "vader.jpg", "vader.mp3"), new Character("Boba Fett", 200, 30, 25, "boba.jpg", "boba.mp3"), new Character("Luke Skywalker", 180, 10, 25, "luke.jpg", "luke.mp3"), new Character("Darth Sidious", 300, 25, 65, "palpatine.jpg", "emperor.mp3"), new Character("Han Solo", 150, 30, 45, "han.jpg", "han.mp3") , new Character("Ahsoka Tano", 140, 55, 45, "ashoka.jpg", "ashoka.mp3")];

function hardReset() {
  charLock = false;
  enemyLock = false;
  $(".player-enemies-container").empty();
  $(".player-character-container").empty();
  $("#characters-list").empty();
  $("#attack-button").css("display", "none");
  $("#restart-button").css("display", "none");
  $instructionsParag.text("Choose a player character below");
}

function buildGame(obj) {
  hardReset();
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

  $("#characters-list").on("click",".character", function(){

    if(!charLock){

      var $playerChar = $(this);
      $($playerChar).attr("class", "player-character");
      $(".player-character-container").append($playerChar);
      playerMain = charArray[parseInt($playerChar.attr('id')) - 1];
      $(".character").attr("class", "character enemies enemy-characters");
      $instructionsParag.text("Choose your opponent wisely");
      charLock = true;
      playerMain.speak.play();

    }else if(!enemyLock){

      $(".player-enemies-container").append($(this));
      $(this).css('border', '2px solid red');
      $(this).css('background-color', 'black');
      opponent = charArray[parseInt($(this).attr('id')) - 1];
      enemyLock = true;
      $("#attack-button").css("display", "block");
      opponent.speak.play();
    }
  });

  $("#attack-button").on('click', function(){

    if(opponent) {
      playerMain.fight(opponent);
      playerMain.$me.effect("shake", "slow");
      opponent.$me.effect("pulsate", "slow");
      opponent.$me.effect("shake", "slow");
      playerMain.$me.effect("pulsate", "slow");
    }

    if( $('#characters-list').is(':empty')){

      //TODO: Win logic goes here so go nuts I suppose...
      $("#attack-button").css("display", "none");
      $("#restart-button").css("display", "block");
    }

  });

  $("#restart-button").on('click', function(){
    charArray  = [new Character("Darth Vader", 250, 40, 55, "vader.jpg", "vader.mp3"), new Character("Boba Fett", 200, 30, 25, "boba.jpg", "boba.mp3"), new Character("Luke Skywalker", 180, 10, 25, "luke.jpg", "luke.mp3"), new Character("Darth Sidious", 300, 25, 65, "palpatine.jpg", "emperor.mp3"), new Character("Han Solo", 150, 30, 45, "han.jpg", "han.mp3") , new Character("Ahsoka Tano", 140, 55, 45, "ashoka.jpg", "ashoka.mp3")];
    buildGame(charArray);
  });

});