
function Character(name, hp, attack, counter, imgFile, audioFile, weaponsArray) {
  this.name = name;
  this.hp = hp;
  this.baseAttack = attack;
  this.attackPower = attack;
  this.counter = counter;
  this.imgpath = "assets/"+ gameAssets.gameTheme +"/images/characters/" + imgFile;
  this.taunt = new Audio("assets/"+ gameAssets.gameTheme +"/sounds/" + audioFile);
  this.weaponEffect = function () {
    return new Audio("assets/"+ gameAssets.gameTheme +"/sounds/" + weaponsArray[Math.floor(Math.random() * weaponsArray.length)].toString());
  };
  this.$me;
}

Character.prototype.fight = function(defender){

  defender.hp -= this.attackPower;

  if(defender.hp < 1){
    opponent.$me.effect("explode", "slow");
    opponent = null;
    gameAssets.enemyLock = false;
    gameAssets.$playerReadout.text("You defeated " + defender.name);
    gameAssets.$enemyReadout.empty();
  }else{
    this.hp -= defender.counter;
  }

  $(".player-enemies-container .text-center:last-child").attr('data-hp', defender.hp).text('HP:' + defender.hp);
  $(".player-character-container .text-center:last-child").attr('data-hp', this.hp).text('HP:' + this.hp);
  gameAssets.$playerReadout.text("You attacked " + defender.name + " for " + this.attackPower + " damage.");
  gameAssets.$enemyReadout.text(defender.name + " attacked you back for " + defender.counter + " damage.");

  this.attackPower += this.baseAttack;

  if(this.hp < 1){
    gameAssets.$attackButton.css("display", "none");
    gameAssets.$playerReadout.text("You were defeated by " + defender.name + ". Game Over!");
    gameAssets.$enemyReadout.empty();
    gameAssets.$restartButton.css("display", "block");
    this.$me.effect("puff", "slow");
  }
};

function GameBoard(theme, backgroundsArray, weaponEffectObj) {
  this.gameTheme = theme;
  this.backgrounds = backgroundsArray;
  this.weaponEffects = weaponEffectObj;
  this.enemyLock = false;
  this.playerLock = false;
  this.$instructionsParag = $("#instructions");
  this.$charList = $("#characters-list");
  this.$enemiesContainer = $(".player-enemies-container");
  this.$playerContainer = $(".player-character-container");
  this.$attackButton = $("#attack-button");
  this.$restartButton = $("#restart-button");
  this.$playerReadout = $("#player-actions-readout");
  this.$enemyReadout = $("#enemy-actions-readout");
}

var playerMain;
var opponent;

// GameBoard("file-name-directory", "list-background-imgs", "Obj{Regular: Combat Sound Effects(i.e. common weapons), Special: Combat Sound Effects(i.e. lightsaber)}")
var gameAssets = new GameBoard("starWars",
    ["deathstar.jpg", "falcon.jpg", "walker.jpg"],
    {"regular":["blaster1.mp3", "blaster2.mp3", "blaster3.mp3"], "special":["saber1.mp3", "saber2.mp3", "saber3.mp3", "saber4.mp3", "saber5.mp3"]});

var charArray = [new Character("Darth Vader", 250, 40, 55, "vader.jpg", "vader.mp3", gameAssets.weaponEffects["special"]),
  new Character("Boba Fett", 200, 30, 25, "boba.jpg", "boba.mp3", gameAssets.weaponEffects["regular"]),
  new Character("Luke Skywalker", 180, 10, 25, "luke.jpg", "luke.mp3", gameAssets.weaponEffects["special"]),
  new Character("Darth Sidious", 300, 25, 65, "palpatine.jpg", "emperor.mp3", gameAssets.weaponEffects["special"]),
  new Character("Han Solo", 200, 35, 45, "han.jpg", "han.mp3", gameAssets.weaponEffects["regular"]),
  new Character("Ahsoka Tano", 215, 45, 45, "ashoka.jpg", "ashoka.mp3", gameAssets.weaponEffects["special"])];

function hardReset() {
  gameAssets.playerLock = false;
  gameAssets.enemyLock = false;
  gameAssets.$enemiesContainer.empty();
  gameAssets.$playerContainer.empty();
  gameAssets.$charList.empty();
  gameAssets.$attackButton.css("display", "none");
  gameAssets.$restartButton.css("display", "none");
  gameAssets.$instructionsParag.text("Choose your player character below");
}

function buildGame(obj) {
  $("body").css("background-image", "url(assets/"+ gameAssets.gameTheme +"/images/backgrounds/" + gameAssets.backgrounds[Math.floor(Math.random() * gameAssets.backgrounds.length)] + ")");
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

    gameAssets.$charList.append(objList[i].$me);
  }
}

$(document).ready(function(){

  buildGame(charArray);
  var mainTheme = new Audio("assets/"+ gameAssets.gameTheme +"/sounds/theme.mp3");
  mainTheme.volume = 0.05;
  mainTheme.play();

  gameAssets.$charList.on("click",".character", function(){

    if(!gameAssets.playerLock){

      $(this).attr("class", "player-character");
      gameAssets.$playerContainer.append($(this));
      playerMain = charArray[parseInt($(this).attr('id')) - 1];
      $(".character").attr("class", "character enemies enemy-characters");
      gameAssets.$instructionsParag.text("Choose your opponent wisely");
      gameAssets.playerLock = true;
      playerMain.taunt.play();

    }else if(!gameAssets.enemyLock){

      gameAssets.$enemiesContainer.empty();
      gameAssets.$enemiesContainer.append($(this));
      $(this).css('border', '2px solid red');
      $(this).css('background-color', 'black');
      opponent = charArray[parseInt($(this).attr('id')) - 1];
      gameAssets.enemyLock = true;
      gameAssets.$attackButton.css("display", "block");
      opponent.taunt.play();
    }
  });

  gameAssets.$attackButton.on('click', function(){

    if(opponent) {
      playerMain.weaponEffect().play();
      playerMain.$me.effect("shake", "slow");
      opponent.$me.effect("pulsate", "slow");
      opponent.weaponEffect().play();
      opponent.$me.effect("shake", "slow");
      playerMain.$me.effect("pulsate", "slow");
      playerMain.fight(opponent);
    }

    if( gameAssets.$charList.is(':empty')){

      //Win logic -- Maybe add more to it
      gameAssets.$enemyReadout.empty();
      gameAssets.$playerReadout.text("You win! Congratulations");
      gameAssets.$attackButton.css("display", "none");
      gameAssets.$restartButton.css("display", "block");
    }
  });

  gameAssets.$restartButton.on('click', function(){

    charArray  = [new Character("Darth Vader", 250, 40, 55, "vader.jpg", "vader.mp3", gameAssets.weaponEffects["special"]),
      new Character("Boba Fett", 200, 30, 25, "boba.jpg", "boba.mp3", gameAssets.weaponEffects["regular"]),
      new Character("Luke Skywalker", 180, 10, 25, "luke.jpg", "luke.mp3", gameAssets.weaponEffects["special"]),
      new Character("Darth Sidious", 300, 25, 65, "palpatine.jpg", "emperor.mp3", gameAssets.weaponEffects["special"]),
      new Character("Han Solo", 200, 35, 45, "han.jpg", "han.mp3", gameAssets.weaponEffects["regular"]),
      new Character("Ahsoka Tano", 215, 45, 45, "ashoka.jpg", "ashoka.mp3", gameAssets.weaponEffects["special"])];

    buildGame(charArray);

  });

  $("#music-button").click(function() {
    if (mainTheme.paused == false) {
      mainTheme.pause();
    } else {
      mainTheme.play();
    }
  });

});