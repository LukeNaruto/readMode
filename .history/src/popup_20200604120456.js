
import {browser}      from 'browser';
import * as msg       from 'message';

let list = [], 
    tab = {},
    auto = false;

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

$('input:radio[value="mode1"]').attr('checked','true');

browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.icon_code), (res) => {
  const { iconCode } = res;
  // const innerText = ~iconCode ? '进入阅读模式' : '不支持该站点';
  ~iconCode ? $("#siteCheck").on('click', ()=>{
    browserClick();
  }).text('进入阅读模式') : null;
});

browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.get_read_mode), res => {
  auto = res.auto;
  list = res.whitelist;
  initRender();
});

function setList(value) {
  const idx = list.indexOf(value)
  const li = renderLi(value);
  $('#inputSite').val('');
  if (~idx) {
    list.splice(idx, 1);
    $('#whiteList li').eq(idx).remove();
  }
  list.unshift(value);
  $('#whiteList').prepend(li);
  writeReadMode();
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
  const mode = auto ? 'mode2' : 'mode1';
  $(`input:radio[value="${mode}"]`).attr('checked', true);
  $('.mode').on('click',function(){
    $('.mode').removeClass('active');
    $(this).addClass('active');
    auto = $(this).index() === 0;
    writeReadMode(auto);
  });
}

function writeReadMode(auto) {
  const whitelist = list;
  browser.runtime.sendMessage(msg.Add(msg.MESSAGE_ACTION.set_read_mode, { whitelist, auto }));
}

function renderLi(site) {
  const site_ = site.startsWith('http') ? site : 'http://' + site;
  const img = $(`<img src="chrome://favicon/${site_}" />`)
  const span = $('<span>').text('删除');
  const li = $('<li>').append(img).append(site).append(span)
            .on('click', 'span' , function(e){
              const idx = $(this).parent().index();
              $(this).parent().remove();
              list.splice(idx,1);
              writeReadMode();
            });
  return li;
}

