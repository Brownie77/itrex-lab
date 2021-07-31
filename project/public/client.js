$('#add-to-queue-btn').click(() => {
  let name = $('#name').val();
  name = name.toUpperCase();
  $('#name').val('');
  if (localStorage.getItem('queue')) {
    if (!localStorage.getItem('resolutions')) {
      localStorage.setItem('resolutions', JSON.stringify([]));
    }
  } else {
    localStorage.setItem('queue', JSON.stringify([]));
  }
  if (name) {
    const queue = JSON.parse(localStorage.getItem('queue'));
    if (!queue.includes(name)) {
      const resolutions = new Map(JSON.parse(localStorage.getItem('resolutions')));
      resolutions.set(name, null);
      queue.push(name);
      $('#placeholder').contents()[0].data = queue[0];
      localStorage.setItem('queue', JSON.stringify(queue));
      localStorage.setItem('resolutions', JSON.stringify(Array.from(resolutions.entries())));
    }
  }
});

$('#name').keydown((event) => {
  const { keyCode } = event;
  if (keyCode === 13) {
    $('#add-to-queue-btn').trigger('click');
  }
});

$('#search-name').keydown((event) => {
  const { keyCode } = event;
  if (keyCode === 13) {
    event.preventDefault();
    $('#search').trigger('click');
  }
});

$('#search').click(() => {
  let name = $('#search-name').val();
  const $display = $('#resolution-found');
  name = name.toUpperCase();
  $('#search-name').val('');
  if (name) {
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
