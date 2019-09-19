$(function() {
  function buildHTML(data) {
    var image_html = `<img class="lower-message__image" src="${data.image}" alt="${data.name}">`;
    image_html = (data.image == null) ? "" : image_html;
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
                    </p>`
                    + image_html +
                 `</div>
                </div>`;
    return html;
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
      $('.form__message').val('');
      $('.hidden').val('');
      $('.form__submit').attr('disabled', false);
    })
    .fail(function(data) {
      alert("失敗しました");
      location.reload();
    })
  })
})