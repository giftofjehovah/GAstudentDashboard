$('.editButton').on('click', editButton)
$('#topicButton').on('click', topicButton)
$('.topicButton').on('click', switchPanel)
$('.checkTopic').change(checkBoxChange)

function checkBoxChange (event) {
  var userId = $('#userId').val()
  var checkTopic = $(event.target).val()
  var currentPanel = $('#currentPanel').val()
  var data = {
    userId: userId,
    language: currentPanel,
    topic: checkTopic
  }
  toggleTopic(data)
}

function switchPanel (event) {
  var id = event.target.id
  $('.topicButton').removeClass('is-active')
  $('#'+id).addClass('is-active')
  $('.topicPanel').removeClass('showPanel').addClass('hidePanel')
  $('#panel'+id).removeClass('hidePanel').addClass('showPanel')
  $('#currentPanel').val(id)
}

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

function toggleTopic (value) {
  $.post('/toggleTopic', {data: value})
  .done(function (data) {
    console.log(data)
  })
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
