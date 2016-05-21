$('.editButton').on('click', editButton)

function editButton (event) {
  var id = event.target.id
  var attr = $('#value' + id).attr('disabled')

  if (typeof attr !== typeof undefined && attr !== false) {
    $('#value' + id).removeAttr('disabled').focus()
    $('#' + id).text('Change')
  } else {
    var value = $('#value' + id).val()
    var text = $('#text' + id).attr('value')
    var userId = $('#userId').val()
    var data = {
      userId : userId,
      language: text,
      amount: value
    }
    postLanguage(data)
    $('#value' + id).attr('disabled', true)
    $('#' + id).text('Edit')
  }
}

function postLanguage (value) {
  $.post('/editLanguage', {data: value})
    .done(function(data) {
      console.log(data)
    })
}
