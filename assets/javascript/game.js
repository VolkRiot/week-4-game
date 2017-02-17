
function Character(name, hp, attack, counter) {
  this.name = name;
  this.hp = hp;
  this.attack = attack;
  this.counter = counter;
  // this.imgpath = "assets/images/" + imgpath;
}

var charArray = [new Character("First", 180, 25, 45), new Character("Second", 180, 25, 45), new Character("Third", 180, 25, 45), new Character("Fourth", 180, 10, 45)];

$(document).ready(function(){

  for(var i = 0; i < charArray.length; i++){
    // Create container for Character
    var charItem =  $("<li>");

    // Create data variables for Characters
    charItem.attr("class", "character");
    charItem.attr("data-name", charArray[i].name);
    charItem.attr("data-hp", charArray[i].hp);
    charItem.attr("data-attack", charArray[i].attack);
    charItem.attr("data-counter", charArray[i].counter);

    // Place values in the container
    charItem.append($("<p class='text-center'>").text(charArray[i].name));
    // TODO: Add image with .img-responsive
    charItem.append($("<p class='text-center'>").text("HP:" + charArray[i].hp + " Atk:" + charArray[i].attack + " Ctr:" + charArray[i].counter));

    $("#characters-list").append(charItem);
  }



});