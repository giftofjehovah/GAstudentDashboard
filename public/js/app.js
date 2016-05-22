$('.editButton').on('click', editButton)
$('#topicButton').on('click', topicButton)

function topicButton (event) {
  var topicLanguage = $('#topicLanguages').val()
  var topicText = $('#topicText').val()
  var userId = $('#userId').val()
  var data = {
    userId: userId,
    topicText: topicText,
    topicLanguage: topicLanguage,
    grasp: false
  }
  addTopicNotGrasp(data)
}

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
    .done(function (data) {
      location.reload()
    })
}

function addTopicNotGrasp (value) {
  $.post('/topicNotGrasp', {data: value})
  .done(function (data) {
    location.reload()
  })
}
