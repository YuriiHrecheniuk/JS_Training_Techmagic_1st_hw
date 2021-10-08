const MY_AGE = 18;

const enqueueForm = document.getElementById('enqueue-form');
const inputField = enqueueForm.querySelector('#input-field');

const dequeueBtn = document.getElementById('dequeue-btn');

const queueView = document.getElementById('queue-view');

const message = document.getElementById('message');

let localQueue;

if (!localStorage.getItem('queue')) {
  localStorage.setItem('queue', '')
  localQueue = [];

  message.hidden = false;
  dequeueBtn.disabled = true;
} else {
  localQueue = localStorage.getItem('queue').split(' ');

  for (let item of localQueue) {
    enqueue(item);
  }
}

enqueueForm.addEventListener('submit', event => {
  event.preventDefault();

  if (localQueue.length <= MY_AGE) {
    const contents = inputField.value;

    enqueue(contents);
    localQueue.push(contents);

    message.hidden = true;
    inputField.value = '';
    dequeueBtn.disabled = false;
  } else {
    alert('Maximum items equals to 18 (I`m 18) :)')
  }
});

dequeueBtn.addEventListener('click', dequeue);
dequeueBtn.addEventListener('click', () => {
  if (!queueView.firstChild)
    message.hidden = false;
})

// when user leaves the page we save our queue in local storage
window.addEventListener('unload', () => {
  localStorage.setItem('queue', localQueue.join(' '));
})

function enqueue(contents) {
  if (contents) {
    queueView.appendChild(queueItem(contents));
  }
}

function dequeue() {
  if (queueView.firstChild)
    queueView.removeChild(queueView.firstChild);
  if (!queueView.firstChild)
    dequeueBtn.disabled = true;

  localQueue.shift();
}

function queueItem(contents) {
  const queueItem = document.createElement('div');

  queueItem.className = 'queue-item';
  queueItem.innerText = contents;

  return queueItem;
}