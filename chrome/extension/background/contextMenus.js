const { fetchMetadata } = require('./meta');
const cuid = require('cuid')

const addToCurrentList = (word) => {
  const { pageUrl, selectionText } = word;
  console.log('addToCurrentList', { pageUrl, selectionText });
  return fetchMetadata(pageUrl).then((metadata) => {
    console.log('metadata', metadata);
    const entry = {
      id: cuid(),
      metadata,
      url: pageUrl,
      text: selectionText,
      created_at: new Date(),
    };
    console.log(entry)
  });
};

chrome.contextMenus.removeAll();

chrome.contextMenus.create({
  id: 'my-babbel-notebook-extension',
  title: 'Add to current MyBabbel List',
  contexts: ['selection'], // ContextType
  onclick: addToCurrentList // A callback function
});
