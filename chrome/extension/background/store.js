function loadStore() {
  return new Promise((resolve) => {
    chrome.storage.local.get(resolve);
  }).then((data) => {
    const parsed = JSON.parse(data.state);
    return parsed;
  });
}

function saveStore(data) {
  return new Promise((resolve) => {
    chrome.storage.local.set(
      {
        state: JSON.stringify(data)
      },
      resolve
    );
  });
}

module.exports = {
  loadStore,
  saveStore
};
