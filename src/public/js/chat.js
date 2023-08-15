const socketClient = io();
const formInput = document.getElementById('form');
const messageInput = document.getElementById('message');
const chatInput = document.getElementById('chat');

let user;

formInput.onsubmit = (e) => {
  e.preventDefault();
  const info = {
    name: user,
    data: messageInput.value,
  };
  socketClient.emit('message', info);
  formInput.reset();
};

/* Chat */
export const chat = socketClient.on('chat', (info) => {
  const dataChat = info
    .map((obj) => {
      return `<p>Tu: ${obj.data}</p>`;
    })
    .join(' ');
  chatInput.innerHTML = dataChat;
  return dataChat;
});


socketClient.on('broadcastChat', (user) => {
  StartToastifyInstance({
    text: `${user} connected`,
    duration: 5000,
    position: 'right',
    style: {
      background: 'linear-gradient(to right, #00b09b, #96c93d)',
    },
  }).showToast();
});
