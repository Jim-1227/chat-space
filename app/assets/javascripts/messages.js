$(function() {
  function buildHTML(data) {
    var image_html = `<img class="lower-message__image" src="${data.image}" alt="${data.user_name}">`;
    image_html = (data.image == null) ? "" : image_html;
    var html = `<div class="message" data-id="${data.id}">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${data.user_name}
                    </div>
                    <div class="upper-message__date">
                      ${data.created_at}
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message___content">
                      ${data.content}
                    </p>`
                    + image_html +
                 `</div>
                </div>`;
    return html;
  }

  var reloadMessages = function() {
    last_message_id = $('.message:last').data('id');
    $.ajax({
      url: location.pathname + 'api/messages',
      type: 'get',
      dataType: 'json',
      data: { id: last_message_id }
    })
    .done(function(messages) {
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML = insertHTML + buildHTML(message);
      });
      $('.messages').append(insertHTML);
      $('.messages').delay(10).animate({
        scrollTop: $('.message:last').position().top - $('.message:first').position().top
      }, 1500);
      console.log('success');
    })
    .fail(function() {
      console.log('error');
    })
  }


  $('.new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = location.pathname;
    $.ajax({
      type: 'POST',
      url: url,
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      $('.messages').append(buildHTML(data));
      $('.messages').delay(10).animate({
        scrollTop: $('.message:last').position().top - $('.message:first').position().top
      }, 1500);
      $('.new_message')[0].reset();
      $('.form__submit').attr('disabled', false);
    })
    .fail(function(data) {
      alert("失敗しました");
      location.reload();
    })
  })
  setInterval(reloadMessages, 5000);
})