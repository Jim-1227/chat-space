$(function() {
  function buildHTML(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">
                    追加
                  </div>
                </div>`;
    return html;
  }



  $('.chat-user-add').on('keyup keypress', function() {
    var input = $(".chat-user-add").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      $('#user-search-result').empty();
      if ( (users.length !== 0) && (input !== '') ) {
        users.forEach(function(user) {
          $('#user-search-result').append(buildHTML(user));
        });
      }
      else {
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  })

  $(document).on('click', '.chat-group-user__btn--add', function() {
    console.log($(this).attr('data-user-name'));
    var selected_user_id = $(this).attr('data-user-id')
    var selected_user_name = $(this).attr('data-user-name')
    
    $(this).parent().remove();
    
    var html = `<div class='chat-group-user'>
                  <input name='group[user_ids][]' type='hidden' value='${ selected_user_id }'>
                  <p class='chat-group-user__name'>${ selected_user_name }</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    $('#group-user-list').append(html)
  })

  
})