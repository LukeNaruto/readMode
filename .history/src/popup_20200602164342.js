
import {browser}      from 'browser';
import * as msg       from 'message';

let list = [], 
    tab = {};

$("#feedback").on('click', function(e){
  browser.tabs.create({ url: 'https://bbs.minibai.com' });
  e.preventDefault();
});

$('#addSite').on('click',function(){
  const value = $('#inputSite').val();
  if(!value) return;
  setList(value);
})
$('#addCurSite').on('click', function(){
  browser.tabs.query( { active: true, currentWindow: true }, tabs => {
    browser.tabs.sendMessage( tabs[0].id, msg.Add( msg.MESSAGE_ACTION.location ),(res)=>{
      setList(res.hostname);
    });
  });
})


browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.icon_code), (res) => {
  const { iconCode } = res;
  const innerText = ~iconCode ? '进入阅读模式' : '不支持该站点';
  $("#siteCheck").on('click', ()=>{
    browserClick();
  }).text(innerText);
});

browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.get_whitelist), res => {
  list = res;
  initRender();
});

function setList(value) {
  const idx = list.indexOf(value)
  $('#inputSite').val('');
  if (~idx) {
    list.splice(idx, 1);
    list.unshift(value);
    const li = $('#whiteList li').eq(idx).remove();
    $('#whiteList').prepend(li);
  }
  else {
    list.push(value);
    const li = renderLi(value);
    $('#whiteList').append(li);
  }
  writeWhitelist();
}

function browserClick(){
  chrome.tabs.query( { "active": true }, tabs => { 
    tab = tabs[0];
    chrome.tabs.sendMessage( tab.id, {type: 'browser_click'});
  });
}
function initRender() {
  const sites = list.map((site, idx) => {
    return renderLi(site);
  });
  $('#whiteList').html(sites);
  
}

function writeWhitelist() {
  browser.runtime.sendMessage(msg.Add(msg.MESSAGE_ACTION.set_whitelist, { list }));
}

function renderLi(site) {
  const img = $(`<img src="chrome://favicon/${site}" />`)
  const span = $('<span>').text('删除');
  const li = $('<li>').text(site).prepend(img).append(span)
            .on('click', 'span' , function(e){
              const idx = $(this).parent().index();
              $(this).parent().remove();
              list.splice(idx,1);
              writeWhitelist();
            });
            console.dir(li)
  return li;
}

