
function Character(name, hp, attack, counter) {
  this.name = name;
  this.hp = hp;
  this.attack = attack;
  this.counter = counter;
  // this.imgpath = "assets/images/" + imgpath;
}

var playerChar;
var enemies = [];

var charArray = [new Character("First", 180, 25, 45), new Character("Second", 180, 25, 45), new Character("Third", 180, 25, 45), new Character("Fourth", 180, 10, 45)];

$(document).ready(function(){

  for(var i = 0; i < charArray.length; i++){

    // Create container for Character

    var charItem =  $("<li class='character'>");
    charItem.attr("id", i+1);

    for (var item in charArray[i]){

      // TODO: Possibly could Use HasOwnPropety to verify???

      charItem.attr("data-" + item.toString(), charArray[i][item]);
    }

    // Place values in the container
    charItem.append($("<p class='text-center'>").text(charArray[i].name));

    // TODO: Add image with .img-responsive
    charItem.append($("<p class='text-center'>").text("HP:" + charArray[i].hp + " Atk:" + charArray[i].attack + " Ctr:" + charArray[i].counter));

    $("#characters-list").append(charItem);
  }

  $(".character").on("click", function(){
    playerChar = $(this);
    $(".player-character-container").append(playerChar);

    $(playerChar).attr("class", "player-character");

    //TODO: Possible better solution ?? ==> var elementPos = array.map(function(x) {return x.id; }).indexOf(idYourAreLookingFor);

    charArray.splice(parseInt(playerChar.attr('id')) - 1, 1);

    //Handle enemies

    $(".character").attr("class", "character enemy-characters");


  })



});