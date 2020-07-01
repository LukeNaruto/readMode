
import {browser}      from 'browser';
import * as msg       from 'message';

let list = [], 
    tab = {};

$("#feedback").on('click', function(e){
  browser.tabs.create({ url: 'https://bbs.minibai.com' });
  e.preventDefault();
});

$('#addSite').on('click',function(){
  const value = $('#inputSite').value(),
        idx = list.indexOf(value);
        console.log(value,idx);
        
  if(!value) return;
  if(~idx){
    list.splice(idx,1);
    list.unshift(value);
    // browserClick();
  }else{
    list.push(value);
    /* browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.set_whitelist,{list}),()=>{
      browserClick();
    }); */
  }
  renderList();
})
console.log(213,msg.Add( msg.MESSAGE_ACTION.icon_code));

browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.icon_code), (res) => {
  console.log(res);
  const { iconCode } = res;
  const innerText = ~iconCode ? '进入阅读模式' : '不支持该站点';
  $("#siteCheck").on('click', ()=>{
    browserClick();
  }).text(innerText);
});



browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.get_whitelist), res => {
  list = res;
  renderList();
  $('#whiteList li').on('click', 'span' , function(e){
    const idx = $(this).parent().index();
    $(this).parent().remove();
    list.splice(idx,1);
    browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.set_whitelist,{list}));
  });
});

browserClick(){
  chrome.tabs.query( { "active": true }, tabs => { 
    tab = tabs[0];
    chrome.tabs.sendMessage( tab.id, {type: 'browser_click'});
  });
}
function renderList() {
  $('#whiteList').html('');
  list.forEach((item, idx) => {
    const span = $('<span>').text('删除');
    const li = $('<li></li>').text(item).append(span);
    $('#whiteList').append(li);
  });
}

