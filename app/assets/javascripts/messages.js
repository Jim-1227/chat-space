$(function() {
  function buildHTML(data) {
    if (data.image) {
      var html = `<div class="message">
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                        ${data.name}
                      </div>
                      <div class="upper-message__date">
                        ${data.created_at}
                      </div>
                    </div>
                    <div class="lower-message">
                      <p class="lower-message___content">
                        ${data.content}
                      </p>
                      <img class="lower-message__image" src="${data.image}" alt="${data.name}">
                    </div>
                  </div>`
      return html;
    } else {
      var html = `<div class="message">
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                        ${data.name}
                      </div>
                      <div class="upper-message__date">
                        ${data.created_at}
                      </div>
                    </div>
                    <div class="lower-message">
                      <p class="lower-message___content">
                        ${data.content}
                      </p>
                    </div>
                  </div>`
      return html;
    };
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
      // $('.messages').append(buildHTML(data));
      $('.messages').append(buildHTML(data));
      $('.form__message').val('');
      $('.form__submit').attr('disabled', false);
      console.log($('.message:last').position().top);
      $('.messages').delay(10).animate({ scrollTop: $('.message:last').position().top }, 1500);
    })
    .fail(function(data) {
      alert("失敗しました");
    })
  })
})