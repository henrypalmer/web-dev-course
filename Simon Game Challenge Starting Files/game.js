$(document).ready(function() {

var buttonColors = ['red', 'blue', 'green', 'yellow']
var gamePattern = []
var userClickedPattern = []
var level = 0

$(document).keypress(function() {nextSequence()})

$('.btn').on("click", function() {
  var userChosenColor = $(this).attr('id')
  userClickedPattern.push(userChosenColor)
  playSound(userChosenColor)
  animatePress(userChosenColor)
})
function nextSequence() {
  var randomNumber = Math.floor(Math.random()*4)
  var randomChosenColor = buttonColors[randomNumber]
  gamePattern.push(randomChosenColor)
  $('#' + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor)
  level ++
  $('h1').text("Level " + level)
}
function playSound(name) {
  var audio = new Audio('sounds/' + name + '.mp3')
  audio.play()
}
function animatePress(currentColor) {
  $('#' + currentColor).addClass("pressed")
  setTimeout(function() {$('#' + currentColor).removeClass("pressed")}, 100)
}

})
