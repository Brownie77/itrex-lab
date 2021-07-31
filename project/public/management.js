let currentName = '';

$('#next-patient').click(() => {
  let name = $('#placeholder').text();
  name = name.toUpperCase();
  const queue = JSON.parse(localStorage.getItem('queue'));
  if (queue[0] === name) {
    queue.shift();
    if (queue[0]) {
      $('#placeholder').contents()[0].data = queue[0];
    } else {
      $('#placeholder').contents()[0].data = '<empty>';
    }
    localStorage.setItem('queue', JSON.stringify(queue));
  }
});

$('#resolution-add-btn').click(() => {
  const str = $('#resolution-text').val();
  $('#resolution-text').val('');
  let name = $('#placeholder').text();
  name = name.toUpperCase();
  if (localStorage.getItem('resolutions')) {
    const resolutions = new Map(JSON.parse(localStorage.getItem('resolutions')));
    if (str.length && resolutions.has(name)) {
      resolutions.set(name, str);
    }
    localStorage.setItem('resolutions', JSON.stringify(Array.from(resolutions.entries())));
  }
});

$('#search-resolution-btn').click(() => {
  let name = $('#name').val();
  name = name.toUpperCase();
  currentName = name;
  if (name) {
    const $display = $('#resolution-found');
    if (localStorage.getItem('resolutions')) {
      const resolutions = new Map(JSON.parse(localStorage.getItem('resolutions')));
      if (resolutions.has(name)) {
        const userResolution = resolutions.get(name);
        if (userResolution) {
          $display.val(userResolution);
        } else {
          $display.val('Empty resolution');
        }
      } else {
        $display.val('No such user');
      }
    } else {
      $display.val('No such user');
    }
  }
});

$('#resolution-delete-btn').click(() => {
  if (currentName) {
    if (localStorage.getItem('resolutions')) {
      const resolutions = new Map(JSON.parse(localStorage.getItem('resolutions')));
      resolutions.set(currentName, null);
      localStorage.setItem('resolutions', JSON.stringify(Array.from(resolutions.entries())));
      currentName = '';
      $('#resolution-found').val('');
      $('#name').val('');
    }
  }
});

$('#resolution-text').keydown((event) => {
  const { keyCode } = event;
  if (keyCode === 13) {
    event.preventDefault();
    $('#resolution-add-btn').trigger('click');
  }
});

$('#name').keydown((event) => {
  const { keyCode } = event;
  if (keyCode === 13) {
    event.preventDefault();
    $('#search-resolution-btn').trigger('click');
  }
});
