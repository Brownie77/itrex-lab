$(document).ready(() => {
  const queue = JSON.parse(localStorage.getItem('queue'));
  if (queue && queue.length) {
    $('#placeholder').contents()[0].data = queue[0];
  }
});

$('#drop').click(() => {
  localStorage.clear();
  $('#placeholder').contents()[0].data = '<empty>';
});
