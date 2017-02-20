
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
  $("#player-actions-readout").text("You attacked " + defender.name + " for " + this.attackPower + " damage.");
  $("#enemy-actions-readout").text(defender.name + " attacked you back for " + defender.counter + " damage.");


  if(defender.hp < 1){
    $(".player-enemies-container").empty();
    opponent = null;
    enemyLock = false;
    $("#player-actions-readout").text("You defeated " + defender.name);
    $("#enemy-actions-readout").empty();
  }

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
var charArray = [new Character("Darth Vader", 180, 45, 25, "vader.jpg"), new Character("Boba Fett", 180, 30, 25, "boba.jpg"), new Character("Luke Skywalker", 180, 10, 45, "luke.jpg"), new Character("Darth Sidious", 180, 10, 45, "palpatine.jpg"), new Character("Han Solo", 180, 10, 45, "han.jpg") , new Character("Ahsoka Tano", 180, 20, 45, "ashoka.jpg")];

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

    }else if(!enemyLock){

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

  });

  $("#restart-button").on('click', function(){
    charArray  = [new Character("Darth Vader", 180, 45, 25, "vader.jpg"), new Character("Boba Fett", 180, 30, 25, "boba.jpg"), new Character("Luke Skywalker", 180, 10, 45, "luke.jpg"), new Character("Darth Sidious", 180, 10, 45, "palpatine.jpg"), new Character("Han Solo", 180, 10, 45, "han.jpg") , new Character("Ahsoka Tano", 180, 20, 45, "ashoka.jpg")];
    buildGame(charArray);
  });

});