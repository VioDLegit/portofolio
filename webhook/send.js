let interval;

function sendMessage() {
  const webhook = document.getElementById('webhook').value;
  const username = document.getElementById('username').value;
  const avatar = document.getElementById('avatar').value;
  const message = document.getElementById('message').value;

  fetch(webhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      content: message,
      username: username || undefined,
      avatar_url: avatar || undefined
    })
  })
  .then(res => {
    if (res.status === 404) {
      document.getElementById('popup').style.display = 'block';
      stopSending();
    }
  })
  .catch(() => {
    document.getElementById('popup').style.display = 'block';
    stopSending();
  });
}

function startSending() {
  document.getElementById('popup').style.display = 'none';
  const delay = parseInt(document.getElementById('delay').value);
  if (interval) clearInterval(interval);
  interval = setInterval(sendMessage, delay || 1000);
}

function stopSending() {
  if (interval) clearInterval(interval);
}
