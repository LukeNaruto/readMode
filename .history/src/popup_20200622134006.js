
import {browser}      from 'browser';
import * as msg       from 'message';

let list = [], 
    tab = {},
    auto = false,
    mode_switch = true,
    promise = [],
    canAddOther = true;

$("#feedback").on('click', function(){
  browser.tabs.create({ url: 'https://bbs.minibai.com' });
});

$('#addCurSite').on('click', function(){
  sendMessageToTab(msg.MESSAGE_ACTION.location,(res)=>{
    setList(res.hostname);
  });
});
$('body').on('click',function(event){
  console.log($('.addToList').length);
  
  if( $('.addToList').length) {
    $('.addToList').remove();
    canAddOther = false;
  };
  event.preventDefault();
})
$('#showAdd').on('click', function(event){
  $('#whiteList').scrollTop(0);
  if(!canAddOther) return;
  canAddOther = false;
  $('#whiteList').prepend(`<li class="addToList clr">
      <input id="inputSite" type="text" placeholder="请输入要添加的网址" />
      <button id="addSite" class="iconfont icon-gengduo-shuqian-wancheng-px"></button>
    </li>`).on('click',function(event){
      event.preventDefault();
    });
    
  $('#addSite').on('click',function(){
    console.log(1);
    
    canAddOther = true;
    const value = $('#inputSite').val();
    if(!value) return;
    $('.addToList').remove();
    setList(value);
  });
  $('#inputSite').on('keyup', function(event) {
    console.log(2);
    if (event.keyCode == "13") {
      $('#addSite').click();
    }
  });
  return ;
});



sendMessageToTab(msg.MESSAGE_ACTION.read_active, bool => {
  mode_switch = bool;
  browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.icon_code), (res) => {
    const { iconCode } = res;
    let text = mode_switch ? '退出模式' : '进入模式';
    ~iconCode ? $("#siteCheck").on('click', function(){
      mode_switch = !mode_switch;
      text = mode_switch ? '退出模式' : '进入模式';
      $(this).text(text).attr('title',text)
      browserClick();
    }).text(text).attr('title',text).removeClass('no-support') : null;
  });
});


browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.get_read_mode), res => {
  auto = res.auto;
  list = res.whitelist;
  switchAutoMode();
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
  console.log(auto);
  
  const mode = auto ? 1 : 2;
  $('.mode').removeClass('active').eq(mode - 1).addClass('active');
  $('.mode').on('click',function(){
    $('.mode').removeClass('active');
    $(this).addClass('active');
    auto = $(this).index() === 1;
    writeReadMode(auto);
    switchAutoMode();
  });
}

function switchAutoMode() {
  if (auto)
    $('.white-box').hide();
  else
    $('.white-box').show();
}

function writeReadMode(auto) {
  const whitelist = list;
  browser.runtime.sendMessage(msg.Add(msg.MESSAGE_ACTION.set_read_mode, { whitelist, auto }));
}

function renderLi(site) {
  const http_icon = site.startsWith('http') ? site : 'http://' + site;
  const site_ = $('<p>').text(site).attr('title', site);
  const img = $(`<img src="chrome://favicon/${http_icon}" />`)
  const span = $('<span class="iconfont icon-closepx">').attr('title', '删除');
  
  const li = $('<li class="clr normal">').append(img).append(site_).append(span)
            .on('click', 'span' , function(e){
              const idx = $(this).parent().index();
              $(this).parent().remove();
              list.splice(idx,1);
              writeReadMode();
            });
  return li;
}

function sendMessageToTab(option, cb){
  browser.tabs.query( { active: true, currentWindow: true }, tabs => {
    browser.tabs.sendMessage( tabs[0].id, msg.Add( option ), res => {
      cb && cb(res);
    })
  })
}
