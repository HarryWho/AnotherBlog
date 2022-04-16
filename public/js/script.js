function DoAjax(action, data, ct, cb) {

  $.ajax({
    url: action,
    type: 'POST',
    data: data,
    contentType: ct,
    success: function(response, textStatus, jqXHR) {

      return cb(response);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      alert("Error");
    }
  });
}

function DoMulti(action, data, ct, cb) {
  alert(action)
  $.ajax({
    url: action,
    data: data,
    cache: false,
    contentType: false,
    processData: false,
    method: 'POST',
    type: 'POST', // For jQuery < 1.9
    success: function(data) {
      alert(data);
    }
  });
}