function crasher(a) {
  delete a.bla
}

const a = {
  bla: 'bla',
}

// начало блока изменений
crasher({ ...a })
// конец блока изменений

console.log(a)
