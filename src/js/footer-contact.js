// Validate form
var toastHTML = '<span>Message Sent</span><button onclick="M.Toast.dismissAll()" class="btn-icon waves-effect toast-action"><i class="material-icons">close</i></button>';
$.validate({
  form: "#contact_form",
  onSuccess: function(form) {
    M.toast({html: toastHTML});
    return false;
  }
});
