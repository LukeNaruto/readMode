
/* import {browser}      from 'browser';
import * as msg       from 'message'; */


document.querySelector("#btn").onclick = function(){
  chrome.tabs.query( { "active": true }, tabs => { 
    const tab = tabs[0];
    chrome.tabs.sendMessage( tab.id, {type: 'browser_click'});
  });
}
console.log(213);

/* browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.icon_code), (res) => {
  console.log(res);
  
}); */
