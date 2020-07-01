
import {browser}      from 'browser';
import * as msg       from 'message';


document.querySelector("#feedback").onclick = function(e){
  browser.tabs.create({ url: 'https://bbs.minibai.com' });
  e.preventDefault();
}
console.log(213,msg.Add( msg.MESSAGE_ACTION.icon_code));

browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.icon_code), (res) => {
  console.log(res);
  const { iconCode } = res;
  const dom = document.querySelector("#siteCheck");
  if(~iconCode){
    dom.innerText = '进入阅读模式';
    dom.onclick = ()=>{
      chrome.tabs.query( { "active": true }, tabs => { 
        const tab = tabs[0];
        chrome.tabs.sendMessage( tab.id, {type: 'browser_click'});
      });
    }
  }else{
    dom.innerText = '不支持该站点';
  }
});
