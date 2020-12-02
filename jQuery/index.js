$('h1').addClass('big-title margin-50')
$('h1').click(function() {
  $('h1').css("color", "purple")
})
$('button').click(function() {
  $('h1').fadeToggle()
})
$('h1').on('mouseover', function() {
  $('h1').text('nghis gay')
})
$('h1').on('mouseout', function() {
  $('h1').text('Hello')
})
