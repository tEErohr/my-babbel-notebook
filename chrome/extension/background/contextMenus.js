const { fetchMetadata } = require('./meta');
const store = require('./store');
const cuid = require('cuid');

const addToCurrentList = (word) => {
  const { pageUrl, selectionText } = word;
  return fetchMetadata(pageUrl).then((metadata) => {
    const entry = {
      id: cuid(),
      metadata,
      url: pageUrl,
      text: selectionText,
      created_at: new Date()
    };
    console.log(entry);
    store
      .loadStore()
      .then((data) => {
        const entries = data.todos;
        entries.push(entry);
        return {
          todos: entries
        };
      })
      .then(data => store.saveStore(data));
  });
};

chrome.contextMenus.removeAll();

chrome.contextMenus.create({
  id: 'my-babbel-notebook-extension',
  title: 'Add to current MyBabbel List',
  contexts: ['selection'], // ContextType
  onclick: addToCurrentList // A callback function
});
