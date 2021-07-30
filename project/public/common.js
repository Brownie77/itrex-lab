$(document).ready(() => {
  const queue = JSON.parse(localStorage.getItem('queue'));
  if (queue.length) {
    $('#placeholder').contents()[0].data = queue[0];
  }
});

$('#drop').click(() => {
  localStorage.clear();
  localStorage.setItem('queue', JSON.stringify([]));
  localStorage.setItem('resolutions', JSON.stringify([]));
  $('#placeholder').contents()[0].data = '<Stack item value>';
});
