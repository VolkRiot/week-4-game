
function Character(name, hp, attack, counter, imgFile, audioFile, weaponsArray) {
  this.name = name;
  this.hp = hp;
  this.baseAttack = attack;
  this.attackPower = attack;
  this.counter = counter;
  this.imgpath = "assets/starWars/images/characters/" + imgFile;
  this.speak = new Audio("assets/starWars/sounds/" + audioFile);
  this.weaponeffect = function () {
    return new Audio("assets/starWars/sounds/" + weaponsArray[Math.floor(Math.random() * weaponsArray.length)].toString());
  };
  this.$me;
}

Character.prototype.fight = function(defender){

  defender.hp -= this.attackPower;

  if(defender.hp < 1){
    opponent.$me.effect("explode", "slow");
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
    $("#restart-button").css("display", "block");
    this.$me.effect("puff", "slow");
  }
};

var playerMain;
var opponent;
const $instructionsParag = $("#instructions");
var enemyLock = false;
var charLock = false;
const backgrounds = ["deathstar.jpg", "falcon.jpg", "walker.jpg"];
const blasterWeaponEffects = ["blaster1.mp3", "blaster2.mp3", "blaster3.mp3"];
const saberWeaponEffects = ["saber1.mp3", "saber2.mp3", "saber3.mp3", "saber4.mp3", "saber5.mp3"];
var charArray = [new Character("Darth Vader", 250, 40, 55, "vader.jpg", "vader.mp3", saberWeaponEffects), new Character("Boba Fett", 200, 30, 25, "boba.jpg", "boba.mp3", blasterWeaponEffects), new Character("Luke Skywalker", 180, 10, 25, "luke.jpg", "luke.mp3", saberWeaponEffects), new Character("Darth Sidious", 300, 25, 65, "palpatine.jpg", "emperor.mp3", saberWeaponEffects), new Character("Han Solo", 200, 35, 45, "han.jpg", "han.mp3", blasterWeaponEffects), new Character("Ahsoka Tano", 215, 45, 45, "ashoka.jpg", "ashoka.mp3", saberWeaponEffects)];

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
  $("body").css("background-image", "url(assets/starWars/images/backgrounds/" + backgrounds[Math.floor(Math.random() * backgrounds.length)] + ")");
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
  var mainTheme = new Audio("assets/starWars/sounds/" + "theme.mp3");
  mainTheme.volume = 0.05;
  mainTheme.play();

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

      $(".player-enemies-container").empty();
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
      playerMain.weaponeffect().play();
      playerMain.$me.effect("shake", "slow");
      opponent.$me.effect("pulsate", "slow");
      opponent.weaponeffect().play();
      opponent.$me.effect("shake", "slow");
      playerMain.$me.effect("pulsate", "slow");
      playerMain.fight(opponent);
    }

    if( $('#characters-list').is(':empty')){

      //TODO: Win logic goes here so go nuts I suppose...
      $("#attack-button").css("display", "none");
      $("#restart-button").css("display", "block");
    }
  });

  $('#music-button').click(function() {
    if (mainTheme.paused == false) {
      mainTheme.pause();
    } else {
      mainTheme.play();
    }
  });

  $("#restart-button").on('click', function(){
    charArray  = [new Character("Darth Vader", 250, 40, 55, "vader.jpg", "vader.mp3", saberWeaponEffects), new Character("Boba Fett", 200, 30, 25, "boba.jpg", "boba.mp3", blasterWeaponEffects), new Character("Luke Skywalker", 180, 10, 25, "luke.jpg", "luke.mp3", saberWeaponEffects), new Character("Darth Sidious", 300, 25, 65, "palpatine.jpg", "emperor.mp3", saberWeaponEffects), new Character("Han Solo", 200, 35, 45, "han.jpg", "han.mp3", blasterWeaponEffects), new Character("Ahsoka Tano", 215, 45, 45, "ashoka.jpg", "ashoka.mp3", saberWeaponEffects)];
    buildGame(charArray);
  });

});