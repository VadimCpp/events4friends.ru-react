import ClipboardJS from 'clipboard';

let clipboard = null;

export const initClipboard = () => {
  //
  // NOTE!
  // Init clipboard instance once
  //
  clipboard = new ClipboardJS('.btn-clipboard');
  clipboard.on('success', e => {
    console.info('Action:', e.action);
    console.info('Text:', e.text);
    console.info('Trigger:', e.trigger);

    e.clearSelection();
  });
  clipboard.on('error', e => {
    console.error('Action:', e.action);
    console.error('Trigger:', e.trigger);
  });
};

export const dropClipboard = () => {
  clipboard = null;
};
