
import {browser}      from 'browser';
import * as msg       from 'message';


$("#feedback").on('click', function(e){
  browser.tabs.create({ url: 'https://bbs.minibai.com' });
  e.preventDefault();
})
console.log(213,msg.Add( msg.MESSAGE_ACTION.icon_code));

browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.icon_code), (res) => {
  console.log(res);
  const { iconCode } = res;
  if(~iconCode){
    $("#siteCheck").on('click', ()=>{
      chrome.tabs.query( { "active": true }, tabs => { 
        const tab = tabs[0];
        chrome.tabs.sendMessage( tab.id, {type: 'browser_click'});
      });
    })
    .text('进入阅读模式');
  }else{
    $("#siteCheck").text('不支持该站点');
  }
});

browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.get_whitelist), res => {
  // const {whitelist} = res;
  console.log(res);
  res.forEach((item, idx) => {
    const span = $('<span>').text('删除')
    const li = $('<li></li>').text(item);
    $('#whiteList').append(li);
  })
  $('span').on('click', '#whiteList', (e)=>{
    console.log(e);
    
  })
  
})
