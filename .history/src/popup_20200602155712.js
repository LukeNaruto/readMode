
import {browser}      from 'browser';
import * as msg       from 'message';

let list = [], 
    tab = {};

$("#feedback").on('click', function(e){
  browser.tabs.create({ url: 'https://bbs.minibai.com' });
  e.preventDefault();
});

$('#addSite').on('click',function(){
  const value = $('#inputSite').val(),
        idx = list.indexOf(value);
        console.log(value,idx);
  if(!value) return;
  setList(idx, value);
})
console.log(213,msg.Add( msg.MESSAGE_ACTION.icon_code));

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

function setList(idx, value) {
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
  $('#whiteList li').on('click', 'span' , function(e){
    const idx = $(this).parent().index();
    $(this).parent().remove();
    list.splice(idx,1);
  });
}

function writeWhitelist() {
  browser.runtime.sendMessage(msg.Add(msg.MESSAGE_ACTION.set_whitelist, { list }));
}

function renderLi(site) {
  const span = $('<span>').text('删除');
  const li = $('<li></li>').text(site).append(span);
  return li;
}

