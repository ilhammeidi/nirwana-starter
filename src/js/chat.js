/**
 * @name Chat
 * @function chating with with customer support
 * @function open and close (toggle) chat pannel
 */

var $chatPanel = $('#chat_panel'),
    $closeChat = $('#close_chat'),
    $chatContainer = $('#chat-container ul'),
    $chatField = $('#chat_field'),
    $sendMessage = $('#send_message'),
    $toggleChat = $('#toggle_chat');

$toggleChat.click(function() {
  $chatPanel.toggleClass('show')
});

$closeChat.click(function() {
  $chatPanel.removeClass('show')
});

function sendChat() {
  var chatVal = $chatField.val();
  $chatContainer.append('<li class="justify-content-end"><span class="talk">' + chatVal + '</span></li>')
  $chatField.val('');

  // scroll to bottom
  var ctn = document.getElementById('chat-container')
  setTimeout(function() {
    ctn.scrollTo(0, ctn.scrollHeight)
  }, 300);
}

$sendMessage.click(function() {
  sendChat();
});

$chatField.on('keypress',function(e) {
  if(e.which == 13) {
    sendChat();
  }
});
