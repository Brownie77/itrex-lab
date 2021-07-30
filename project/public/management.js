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
      $('#placeholder').contents()[0].data = '<Stack item value>';
    }
    localStorage.setItem('queue', JSON.stringify(queue));
  }
});

$('#resolution-add-btn').click(() => {
  const str = $('#resolution-text').val();
  $('#resolution-text').val('');
  let name = $('#placeholder').text();
  name = name.toUpperCase();
  console.log(name, str);
  if (localStorage.getItem('resolutions')) {
    const resolutions = new Map(JSON.parse(localStorage.getItem('resolutions')));
    if (str.length && resolutions.has(name)) {
      resolutions.set(name, str);
    }
    localStorage.setItem('resolutions', JSON.stringify(Array.from(resolutions.entries())));
  } else {
    localStorage.setItem('resolutions', JSON.stringify([]));
  }
});

$('#search-resolution-btn').click(() => {
  let name = $('#name').val();
  name = name.toUpperCase();
  currentName = name;
  if (name) {
    if (localStorage.getItem('resolutions')) {
      const $display = $('#resolution-found');
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
