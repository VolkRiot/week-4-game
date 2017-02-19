
function Character(name, hp, attack, counter) {
  this.name = name;
  this.hp = hp;
  this.attackPower = attack;
  this.counter = counter;
  this.defeated = false;
  // this.imgpath = "assets/images/" + imgpath;
  this.fight = function(opponent){
    var self = this;
    opponent.hp = opponent.hp - this.attackPower;

    //Some type of processing here would be beneficial/ maybe timing

  };
  this.deathCheck = function(){
    return this.hp < 1;
  }
}

var $playerChar;
var opponent;
var $instructionsParag = $("#instructions");
var enemyLock = false;
var charArray = [new Character("First", 180, 25, 45), new Character("Second", 180, 25, 45), new Character("Third", 180, 25, 45), new Character("Fourth", 180, 10, 45)];

function generateChars(objList) {

  for(var i = 0; i < objList.length; i++){

    var charItem =  $("<li class='character'>");
    charItem.attr("id", i+1);

    for (var item in objList[i]){
      charItem.attr("data-" + item.toString(), objList[i][item]);
    }

    charItem.append($("<p class='text-center'>").text(objList[i].name));

    // TODO: Add image with .img-responsive

    charItem.append($("<p class='text-center'>").text("HP:" + objList[i].hp + " Atk:" + objList[i].attackPower + " Ctr:" + objList[i].counter));
    $("#characters-list").append(charItem);
  }
}

$(document).ready(function(){

  generateChars(charArray);

  $(".character").on("click", function(){
    $playerChar = $(this);

    $($playerChar).attr("class", "player-character");
    $(".player-character-container").append($playerChar);
    charArray.splice(parseInt($playerChar.attr('id')) - 1, 1);

    // TODO: Enemies Logic
    $(".character").off().attr("class", "enemies enemy-characters");
    $instructionsParag.text("Choose your opponent wisely");
  });

  $("#characters-list").on('click', ".enemies", function(){

      if(!enemyLock){
        $(".player-enemies-container").append($(this));
        opponent = charArray[parseInt($(this).attr('id') - 1)];
        enemyLock = true;
      }

  });


});