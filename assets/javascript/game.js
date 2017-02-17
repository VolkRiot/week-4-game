
function Character(name, hp, attack, counter) {
  this.name = name;
  this.hp = hp;
  this.attack = attack;
  this.counter = counter;
  // this.imgpath = "assets/images/" + imgpath;
}

// var charArray = [new Character("First", 180, 25, 45), new Character("Second", 180, 25, 45), new Character("Third", 180, 25, 45)];

$(document).ready(function(){

  var charArray = [new Character("First", 180, 25, 45), new Character("Second", 180, 25, 45), new Character("Third", 180, 25, 45)];

  for(var i = 0; i < charArray.length; i++){
    var charItem =  $("<li>");
    charItem.attr("class", "character");
    charItem.attr("data-name", charArray[i].name);
    charItem.attr("data-hp", charArray[i].hp);
    charItem.attr("data-attack", charArray[i].attack);
    charItem.attr("data-counter", charArray[i].counter);
    charItem.text(charArray[i].name);

    $("#characters-list").append(charItem);
  }



});