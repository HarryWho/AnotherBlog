function DoAjax(action, data, cb) {

  $.ajax({
    url: action,
    type: 'POST',
    data: data,
    success: function(response, textStatus, jqXHR) {
      return cb(response);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      alert("Error");
    }
  });
}