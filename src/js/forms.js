/**
 * @name form
 * @function handle form validation
 */

$(document).ready(function(){
  var toastHTML = '<span>Message Sent</span><button onclick="M.Toast.dismissAll()" class="btn-icon waves-effect toast-action"><i class="material-icons">close</i></button>';
  $.validate({
    form: "#contact_form",
    onSuccess: function(form) {
      M.toast({html: toastHTML});
      return false;
    }
  });

  $.validate({
    form: "#login_form"
  });

  $.validate({
    form: "#register_form",
    modules : "security"
  });
});
