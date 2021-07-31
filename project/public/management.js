let currentName = '';

$(document).ready(() => {
  $('#resolution-delete-btn').attr('disabled', true);
});

$('.context').click((event) => {
  const { id } = event.target;
  switch (id) {
    case 'next-patient':
      return nextPatient();
    case 'resolution-add-btn':
      return addResolution();
    case 'search-resolution-btn':
      return searchResolution();
    case 'resolution-delete-btn':
      return deleteResolution();
  }
});

function nextPatient() {
  let name = $('#placeholder').text();
  name = name.toUpperCase();
  const queue = JSON.parse(localStorage.getItem('queue'));
  if (queue && queue[0] === name) {
    queue.shift();
    if (queue[0]) {
      $('#placeholder').contents()[0].data = queue[0];
    } else {
      $('#placeholder').contents()[0].data = '<empty>';
    }
    localStorage.setItem('queue', JSON.stringify(queue));
  }
}

function addResolution() {
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
}

function searchResolution() {
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
          $('#resolution-delete-btn').attr('disabled', false);
        } else {
          $display.val('Empty resolution');
        }
      } else {
        $display.val('No such patient');
      }
    } else {
      $display.val('No such patient');
    }
  }
}

function deleteResolution() {
  if (currentName) {
    if (localStorage.getItem('resolutions')) {
      const resolutions = new Map(JSON.parse(localStorage.getItem('resolutions')));
      resolutions.set(currentName, null);
      localStorage.setItem('resolutions', JSON.stringify(Array.from(resolutions.entries())));
      currentName = '';
      $('#resolution-delete-btn').attr('disabled', true);
      $('#resolution-found').val('');
      $('#name').val('');
    }
  }
}

$('#name').keydown((event) => {
  const { keyCode } = event;
  if (keyCode === 13) {
    event.preventDefault();
    $('#search-resolution-btn').trigger('click');
  }
});
