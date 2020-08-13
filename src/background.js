console.log( "=== simpread background load ===" )

import local       from 'local';
import { storage } from 'storage';
import * as msg    from 'message';
import {browser}   from 'browser';
import * as ver    from 'version';
import * as menu   from 'menu';
import * as watch  from 'watch';
import * as WebDAV from 'webdav';
import * as permission
                   from 'permission';
import * as tips   from 'tips';
import PureRead    from 'puread';

import md5         from 'js-md5';

// global update site tab id
let upTabId = -1;

/**
 * Sevice: storage Get data form chrome storage
 */

console.log('Read-----1--',ver,storage);
function authcode(str,  key, expiry) {
    var key = key ? key : '';
    var expiry = expiry ? expiry : 0;
    var tmp, tmpstr;
    var ckey_length = 4;
    key = md5(key);

    // 密匙a会参与加解密
    var keya = md5(key.substr(0, 16));
    // 密匙b会用来做数据完整性验证
    var keyb = md5(key.substr(16, 16));
    // 密匙c用于变化生成的密文
    // IE下不支持substr第一个参数为负数的情况
    if(ckey_length){
        var keyc = str.substr(0, ckey_length);
    }else{
        var keyc = '';
    }
    // 参与运算的密匙
    var cryptkey = keya + md5(keya + keyc);

    var strbuf;

    str = str.substr(ckey_length);
    strbuf = atob(str);


    var box = new Array(256);
    for (var i = 0; i < 256; i++) {
        box[i] = i;
    }
    var rndkey = new Array();
    // 产生密匙簿
    for (var i = 0; i < 256; i++) {
        rndkey[i] = cryptkey.charCodeAt(i % cryptkey.length);
    }
    // 用固定的算法，打乱密匙簿，增加随机性，好像很复杂，实际上对并不会增加密文的强度
    for (var j = i = 0; i < 256; i++) {
        j = (j + box[i] + rndkey[i]) % 256;
        tmp = box[i];
        box[i] = box[j];
        box[j] = tmp;
    }

    // 核心加解密部分
    var s = '';
    //IE下不支持直接通过下标访问字符串的字符，需要先转换为数组
    strbuf = strbuf.split('');
    for (var a = j = i = 0; i < strbuf.length; i++) {
        a = (a + 1) % 256;
        j = (j + box[a]) % 256;
        tmp = box[a];
        box[a] = box[j];
        box[j] = tmp;
        // 从密匙簿得出密匙进行异或，再转成字符
        s += chr(ord(strbuf[i])^(box[(box[a] + box[j]) % 256]));
    }

    if ((s.substr(0, 10) == 0 || s.substr(0, 10) - time() > 0) && s.substr(10, 16) == md5(s.substr(26) + keyb).substr(0, 16)) {
        s = s.substr(26);
    } else {
        s = '';
    }
    function time() {
        var unixtime_ms = new Date().getTime();
        return parseInt(unixtime_ms / 1000);
    }
    
    function microtime(get_as_float) {
        var unixtime_ms = new Date().getTime();
        var sec = parseInt(unixtime_ms / 1000);
        return get_as_float ? (unixtime_ms / 1000) : (unixtime_ms - (sec * 1000)) / 1000 + ' ' + sec;
    }
    function chr(s) {
        return String.fromCharCode(s);
    }
    function ord(s) {
        return s.charCodeAt();
    }
    return (s);
}

storage.Read(async () => {
    
    storage.puread = new PureRead( storage.sites );
    let first_ = local.Firstload();
    console.log('storage.Read--',first_, local.Count(), ver.version);
    storage.GetRemote( "remote", async ( result, error ) => {
        // console.log(321,result, error);
        let _result;
        if ( false ) {
            
            const key = 'minibai#001';
            console.log(12312,key);
            _result = JSON.parse(decodeURI(atob(authcode(atob(result),key))));
            console.log(12312,_result);
            
            
        }else{
            await storage.GetRemote( "local", ( loc_result, loc_error ) => {
                if(!loc_error) _result = loc_result;
                console.log('local', loc_result, loc_error);
            });
        }
        storage.pr.Addsites( _result );
        storage.Writesite( storage.pr.sites, getNewsitesHandler );
        console.log(321);
    });
    const fontFamilyRes = await fetch( 'https://api4.minibai.com/g/1/gft.api?t=2&v=0' ),
         fontFamilies   = await fontFamilyRes.json();
         
    storage.read.fontFamilies = fontFamilies.bd.data || [];
    storage.Write();
    console.log('Read-------',ver,storage);
    // setTimeout( ()=>uninstall(), 100 );
});

/**
 * Get newsites handler
 * @param {object} count: update site cou
 */
function getNewsitesHandler( result ) {
    watch.Push( "site", true );
}

/**
 * Listen menu event handler
 */
menu.OnClicked( ( info, tab ) => {
    console.log( "background contentmenu Listener", info, tab,msg.Add(info.menuItemId) );

    if (info.menuItemId == "read" && !tab.url.startsWith( "chrome://" ) ) browser.tabs.sendMessage( tab.id, msg.Add(info.menuItemId));
    tracked({ eventCategory: "menu", eventAction: "menu", eventValue: info.menuItemId });
    return false;
    if ( info.menuItemId == "link" ) {
        info.linkUrl && browser.tabs.create({ url: info.linkUrl + "?simpread_mode=read" });
    } else if ( info.menuItemId == "list" ) {
        browser.tabs.create({ url: browser.extension.getURL( "options/options.html#later" ) });
    } else if ( info.menuItemId == "whitelist" ) {
        browser.tabs.sendMessage( tab.id, msg.Add( msg.MESSAGE_ACTION.menu_whitelist, {url: info.pageUrl } ));
    } else if ( info.menuItemId == "exclusion" ) {
        browser.tabs.sendMessage( tab.id, msg.Add( msg.MESSAGE_ACTION.menu_exclusion, {url: info.pageUrl } ));
    } else if ( info.menuItemId == "blacklist" ) {
        browser.tabs.sendMessage( tab.id, msg.Add( msg.MESSAGE_ACTION.menu_blacklist, {url: info.pageUrl } ));
    } else if ( info.menuItemId == "unrdist" ) {
        browser.tabs.sendMessage( tab.id, msg.Add( msg.MESSAGE_ACTION.menu_unrdist, {url: info.pageUrl } ));
    } else if ( info.menuItemId == "lazyload" ) {
        browser.tabs.sendMessage( tab.id, msg.Add( msg.MESSAGE_ACTION.menu_lazyload, {url: info.pageUrl } ));
    } else {
        if ( !tab.url.startsWith( "chrome://" ) ) browser.tabs.sendMessage( tab.id, msg.Add(info.menuItemId));
    }
});

/**
 * Listen runtime message, include: `corb`
 */
browser.runtime.onMessage.addListener( function( request, sender, sendResponse ) {
    if ( request.type == msg.MESSAGE_ACTION.CORB ) {
        $.ajax( request.value.settings )
            .done( result => {
                sendResponse({ done: result });
            })
            .fail( ( jqXHR, textStatus, errorThrown ) => {
                sendResponse({ fail: { jqXHR, textStatus, errorThrown }});
            });
    }
    return true;
});

/**
 * Listen runtime message, include: `jianguo`
 */
browser.runtime.onMessage.addListener( function( request, sender, sendResponse ) {
    if ( request.type == msg.MESSAGE_ACTION.jianguo ) {
        const { url, user, password, method } = request.value;
        const dav = new WebDAV.Fs( url, user, password );
        if ( method.type == "folder" ) {
            dav.dir( method.root ).mkdir( result => {
                dav.dir( method.root + "/" + method.folder ).mkdir( result => {
                    sendResponse({ done: result, status: result.status });
                });
            })
        } else if ( method.type == "file" ) {
            dav.file( method.path ).write( method.content, result => {
                sendResponse({ done: result, status: result.status });
            });
        } else if ( method.type == "read" ) {
            dav.file( method.path ).read( result => {
                sendResponse({ done: result.response, status: result.status });
            });
        }
    }
    //return true;
});

/**
 * Listen runtime message, include: `webdav`
 */
browser.runtime.onMessage.addListener( function( request, sender, sendResponse ) {
    if ( request.type == msg.MESSAGE_ACTION.WebDAV ) {
        const { url, user, password, method } = request.value;
        const dav = new WebDAV.Fs( url, user, password );
        if ( method.type == "folder" ) {
            dav.dir( method.root ).mkdir( result => {
                sendResponse({ done: result, status: result.status });
            })
        } else if ( method.type == "file" ) {
            dav.file( method.root + "/" + method.name ).write( method.content, result => {
                sendResponse({ done: result, status: result.status });
            });
        }
    }
    //return true;
});

/**
 * Listen runtime message, include: `download`, `base64` && `permission`
 */
browser.runtime.onMessage.addListener( function( request, sender, sendResponse ) {
    if(request.type == msg.MESSAGE_ACTION.image_download){
        console.log('------------downloads-image', request);
        const {status, src, uri} = request.value;
        if(status){
            browser.tabs.create({ url: `list.html?${uri}`, selected: true },(tab) => {});
        }else{
            browser.downloads.download({
                url: src,
                conflictAction: "uniquify",
                method: "GET",
            },(res) => {});
        }
        
    }else if ( request.type == msg.MESSAGE_ACTION.download ) {
        const { data, name } = request.value;
        const blob = new Blob([data], {
            type: "html/plain;charset=utf-8"
        });
        const url = URL.createObjectURL(blob);
        browser.downloads.download({
            url     : url,
            filename: name.replace( /[|]/ig, "" ),
        }, downloadId => {
            sendResponse({ done: downloadId });
        });
    } else if ( request.type == msg.MESSAGE_ACTION.base64 ) {
        const { url } = request.value;
        fetch( url )
            .then( response => response.blob() )
            .then( blob     => new Promise(( resolve, reject ) => {
                const reader = new FileReader()
                reader.onloadend = event => {
                    sendResponse({ done: { url, uri: event.target.result }});
                };
                reader.onerror = error => {
                    sendResponse({ fail: { error, url } });
                };
                reader.readAsDataURL( blob );
            }))
            .catch( error => {
                sendResponse({ fail: { error, url } });
            });
    } else if ( request.type == msg.MESSAGE_ACTION.permission ) {
        permission.Get({ permissions: [ "downloads" ] }, result => {
            sendResponse({ done: result });
        });
    }
    return true;
});

/**
 * Listen runtime message, include: `snapshot`
 */
browser.runtime.onMessage.addListener( function( request, sender, sendResponse ) {
    if ( request.type == msg.MESSAGE_ACTION.snapshot ) {
        console.log( "222background runtime Listener", request );
        const { left, top, width, height } = request.value;
        chrome.tabs.captureVisibleTab( { format: "png" }, base64 => {
            const image  = new Image();
            image.src    = base64;
            image.onload = () => {
                const canvas  = document.createElement( "canvas" ),
                      ctx     = canvas.getContext( "2d" ),
                      dpi     = window.devicePixelRatio,
                      sx      = left   * dpi,
                      sy      = top    * dpi,
                      sWidth  = width  * dpi,
                      sHeight = height * dpi;
                canvas.width  = sWidth;
                canvas.height = sHeight;
                ctx.drawImage( image, sx, sy, sWidth, height * dpi, 0, 0, sWidth, sHeight );
                const uri     = canvas.toDataURL( "image/png" );
                sendResponse({ done: uri });
          };
        });
    }
    return true;
});

/**
 * Listen runtime message
 */
browser.runtime.onMessage.addListener( function( request, sender, sendResponse ) {
    console.log( "background runtime Listener", request );
    switch ( request.type ) {
        
        
        case msg.MESSAGE_ACTION.notify_preload:
            const { url } = request.value;
            console.log(storage, url);
            url && fetch('http:' + url)
            .then(response => response.text())
            .catch(error => console.error('Error:', error))
            .then(response => {
                // console.log('Success:', response)
                response && sendResponse(response);
            });
            break;
        case msg.MESSAGE_ACTION.get_read_mode:
            const name = "simpread";
            browser.storage.local.get( [name], result => {
                const readMode = result[name].read;
                sendResponse(readMode);
            })
            break;
        case msg.MESSAGE_ACTION.icon_code:
            storage.iconCode(sendResponse);
            break;
        case msg.MESSAGE_ACTION.shortcuts:
            getCurTab( { url: request.value.url }, tabs => {
                browser.tabs.sendMessage( tabs[0].id, msg.Add( msg.MESSAGE_ACTION.shortcuts ));
            });
            break;
        case msg.MESSAGE_ACTION.browser_action:
            getCurTab( { url: request.value.url }, tabs => {
                if ( tabs && tabs.length > 0 && tabs[0].url == request.value.url ) {
                    console.log(1,'set--MenuAndIcon',tabs[0].id, request.value.code);
                    
                    setMenuAndIcon( tabs[0].id, request.value.code );
                } else console.error( request );
            });
            break;
        case msg.MESSAGE_ACTION.new_tab:
            browser.tabs.create({ url: request.value.url });
            break;
        case msg.MESSAGE_ACTION.close_tab:
            getCurTab( { "active": true }, tabs => {
                tabs.forEach( tab => {
                    tab.active && tab.url == request.value.url &&
                        browser.tabs.remove( tab.id );
                });
            });
            break;
        case msg.MESSAGE_ACTION.menu:
            const { id, value } = request.value;
            // hack code refresh options menu changed, and not saved storage
            storage.option.menu[id] = value;
            value === true ? menu.Create( id ) : menu.Remove( id );
            break;
        case msg.MESSAGE_ACTION.updated:
            console.log('watch-updated---',request.value.type, request.value.value);
            
            watch.Push( request.value.type, request.value.value );
            break;
        case msg.MESSAGE_ACTION.save_verify:
            getCurTab( { "active": true, "currentWindow": true },tabs=>{
                console.log(tabs);
                
                sendResponse( watch.Lock( request.value.url, tabs[0].id ));
            });
            break;
        case msg.MESSAGE_ACTION.auth:
            browser.tabs.create({ url: browser.extension.getURL( "options/options.html#labs?auth=" + request.value.name.toLowerCase() ) });
            break;
        case msg.MESSAGE_ACTION.update_site:
            getCurTab({ active: true, url: request.value.url }, tabs => {
                tabs.length > 0 && ( upTabId = tabs[0].id );
                browser.tabs.create({ url: browser.extension.getURL( "options/options.html#sites?update=" + encodeURI( JSON.stringify( request.value.site ))) });
            });
            break;
        case msg.MESSAGE_ACTION.save_site:
            browser.tabs.create({ url: browser.extension.getURL( "options/options.html#sites?pending=" + encodeURI( JSON.stringify( request.value ))) });
            break;
        case msg.MESSAGE_ACTION.temp_site:
            browser.tabs.create({ url: browser.extension.getURL( "options/options.html#sites?temp=" + encodeURI( JSON.stringify( request.value ))) });
            break;
        case msg.MESSAGE_ACTION.auth_success:
            getCurTab( { url: request.value.url }, tabs => {
                if ( tabs && tabs.length > 0 ) {
                    browser.tabs.remove( tabs[0].id );
                    getCurTab( { "active": true }, tabs => {
                        tabs.forEach( tab => browser.tabs.sendMessage( tab.id, msg.Add( msg.MESSAGE_ACTION.export, {type: request.value.name.toLowerCase()} )) );
                    });
                }
            });
            break;
        case msg.MESSAGE_ACTION.track:
            tracked( request.value );
            break;
        case msg.MESSAGE_ACTION.speak:
            browser.tts.speak( request.value.content );
            break;
        case msg.MESSAGE_ACTION.speak_stop:
            browser.tts.stop();
            break;
        case msg.MESSAGE_ACTION.tips:
            tips.Verify( request.value.code, sendResponse );
            break;
        case msg.MESSAGE_ACTION.tips_norepeat:
            tips.Done( request.value.code );
            break;
        case msg.MESSAGE_ACTION.sites_enabled:
            console.log(3333333333,request.value);
            
            break;
    }
});

/**
 * Listen chrome tab active message, include: `tab_selected`
 */
browser.tabs.onActivated.addListener( function( active ) {
    console.log('onActivated--', active);
    
    getCurTab( { "active": true, "currentWindow": true }, tabs => {
        if ( tabs && tabs.length > 0 && tabs[0].status == "complete" ) {
            console.log( "background tabs Listener:active", active );
            if ( !tabs[0].url.startsWith( "chrome://" ) ) {
                console.log(9,msg.Add( msg.MESSAGE_ACTION.tab_selected, { is_update: false } ));
                
                browser.tabs.sendMessage( tabs[0].id, msg.Add( msg.MESSAGE_ACTION.tab_selected, { is_update: false } ));
            } else {
                console.log(2,'set--MenuAndIcon',tabs[0].id, -1);
                setMenuAndIcon( tabs[0].id, -1 );
            }
        } else console.error( "onActivated.addListener error" );
    });
});

/**
 * Listen chrome tab update message, include: `tab_selected`
 */
let can_update = true;
browser.tabs.onUpdated.addListener( function( tabId, changeInfo, tab ) {
    if(changeInfo.status == "loading"){
        can_update = !changeInfo.url;
    }
    watch.Pull( tabId );
    console.log(changeInfo,can_update);
    if ( changeInfo.status == "complete" ) {
        console.log('onUpdated--', tabId, changeInfo, tab);
        
        console.log( "Listener:update", tab.url, browser.runtime.getURL( "options/options.html#sites?update=success" ));


        if ( tab.url.startsWith( "http://ksria.com/simpread/auth.html" )) {
            const url = tab.url.replace( "http://ksria.com/simpread/auth.html?id=", "" ),
                  id  = url.includes( "#" ) || url.includes( "&" ) ? url.substr( 0, url.search( /\S(#|&)/ ) + 1 ) : url ;
            browser.tabs.query( {}, tabs => {
                const opts = tabs.find( tab => tab.url.includes( browser.extension.getURL( "options/options.html" ) ));
                if ( opts ) {
                    browser.tabs.sendMessage( opts.id, msg.Add( msg.MESSAGE_ACTION.redirect_uri, { uri: tab.url, id } ));
                    browser.tabs.remove( tabId );
                }
            });
        } else if ( tab.url.startsWith( "https://simpread.ksria.cn/plugins/install/" )) {
            const url = tab.url.replace( "https://simpread.ksria.cn/plugins/install/", "" );
            // browser.tabs.create({ url: browser.extension.getURL( "options/options.html#plugins?install=" + encodeURIComponent(url) ) });
            browser.tabs.remove( tabId );
        } else if ( tab.url.startsWith( "https://simpread.ksria.cn/sites/install/" )) {
            const url = tab.url.replace( "https://simpread.ksria.cn/sites/install/", "" );
            // browser.tabs.create({ url: browser.extension.getURL( "options/options.html#sites?install=" + encodeURIComponent(url) ) });
            browser.tabs.remove( tabId );


            
        } else if ( tab.url == browser.runtime.getURL( "options/options.html#sites?update=success" ) ) {
            browser.tabs.remove( tabId );
            upTabId > 0 && chrome.tabs.reload( upTabId, () => { upTabId == -1; });
        } else if ( tab.url == browser.runtime.getURL( "options/options.html#sites?update=failed" ) ) {
            browser.tabs.remove( tabId );
        } else if ( tab.url == browser.runtime.getURL( "options/options.html#sites?update=complete" ) ) {
            browser.tabs.remove( tabId );
        } else if ( tab.url == browser.runtime.getURL( "options/options.html#sites?update=pending" ) ) {
            browser.tabs.remove( tabId );
            upTabId > 0 && browser.tabs.sendMessage( upTabId, msg.Add( msg.MESSAGE_ACTION.pending_site ));
            upTabId == -1;
        }

        if ( !tab.url.startsWith( "chrome://" ) ) {
            can_update && browser.tabs.sendMessage( tabId, msg.Add( msg.MESSAGE_ACTION.tab_selected, { is_update: true } ));
        } else {
            
            console.log(3,'set--MenuAndIcon',tab.id, -1);
            setMenuAndIcon( tab.id, -1 );
        }
    }
});

/**
 * Listen chrome tab remove message
 */
browser.tabs.onRemoved.addListener( tabId => watch.Pull( tabId ));

/**
 * Listen chrome page, include: `read`
 */
browser.browserAction.onClicked.addListener( function( tab ) {
    console.log('===================',tab);
    
    browser.tabs.sendMessage( tab.id, msg.Add( msg.MESSAGE_ACTION.browser_click ));
});

/**
 * Get current tab object
 * 
 * @param {object}   query
 * @param {function} callback
 */
function getCurTab( query, callback ) {
    if ( query.url && query.url.includes( "#" ) ) {
        browser.tabs.query( {}, tabs => callback( tabs.filter( tab => tab.url == query.url && tab.active ) ) );
    } else browser.tabs.query( query, function( tabs ) { callback( tabs ); });
}

/**
 * Set page action icon and context menu
 * 
 * @param {int} tab.id
 * @param {int} -1: disable icon;
 */
function setMenuAndIcon( id, code ) {
    console.log('setMenuAndIcon--',id,code);
    
    menu.Create( "read" );
    storage.iconCode(null, code);
    
    let icon = "";
    // browser.browserAction.show( id );
    if ( code == -1 ) {
        menu.Update( "unread", false );
    } else {
        // icon = "-enable";
        // storage.option.menu.read === true && menu.Create( "read" );
        menu.Update( "read" );
    }
    browser.browserAction.setIcon({ tabId: id, path: browser.extension.getURL( `assets/images/icon16${icon}.png` ) });
}

/**
 * Track
 * 
 * @param {object} google analytics track object
 */
function tracked({ eventCategory, eventAction, eventValue }) {
    console.log( "current track is", eventCategory, eventAction, eventValue )
    return;
    _gaq.push([ '_trackEvent', eventCategory, eventValue ]);
}

/**
 * Uninstall
 */
function uninstall() {
    browser.runtime.setUninstallURL( storage.option.uninstall ? storage.service + "/uninstall" : "" );
    tracked({ eventCategory: "install", eventAction: "install", eventValue: "uninstall" });
}