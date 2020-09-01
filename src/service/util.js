console.log( "=== simpread util load ===" )

/**
 * Verify html from puread/util verifyHtml()
 * 
 * @param  {string} input include html tag, e.g.:
    <div class="article fmt article__content">
 *
 * @return {array} 0: int include ( -1: fail； 0: empty html; 1: success; 2: special tag )
 *                 1: result
 */
function verifyHtml( html ) {
    if ( html == "" ) return [ 0, html ];
    else if ( specTest( html )) return [ 2, html ];
    const item = html.match( /<\S+ (class|id)=("|')?[\w-_=;:' ]+("|')?>?$|<[^/][-_a-zA-Z0-9]+>?$/ig );
    if ( item && item.length > 0 ) {
        return [ 1, item ];
    } else {
        return [ -1, undefined ];
    }
}

/**
 * Verify special action from puread/util specTest()
 * action include:
   - [[{juqery code}]] // new Function, e.g. $("xxx").xxx() return string
   - [['text']]        // remove '<text>'
   - [[/regexp/]]      // regexp e.g. $("sr-rd-content").find( "*[src='http://ifanr-cdn.b0.upaiyun.com/wp-content/uploads/2016/09/AppSo-qrcode-signature.jpg']" )
   - [[[juqery code]]] // new Function, e.g. $("xxx").find() return jquery object
   - [[`xpath`]]       // /html[1]/div[1]/sr-read[1]/sr-rd-content[1]/p[1]

 * 
 * @param  {string} verify content
 * @return {boolen} verify result
 */
function specTest( content ) {
    return /^(\[\[)[\[{`'/]{1}[ \S]+[}`'/\]]\]\]{1}($)/g.test( content );
}

/**
 * Html convert to enml
 * 
 * @param  {string} convert string
 * @param  {string} url
 * 
 * @return {string} convert string
 */
function html2enml( html, url ) {
    let $target, str;
    const bad  = [ "sup", "hr", "section", "applet", "base", "basefont", "bgsound", "blink", "body", "button", "dir", "embed", "fieldset", "form", "frame", "frameset", "head", "html", "iframe", "ilayer", "input", "isindex", "label", "layer", "legend", "link", "marquee", "menu", "meta", "noframes", "noscript", "object", "optgroup", "option", "param", "plaintext", "script", "select", "style", "textarea", "xml" ],
          good = [ "a", "abbr", "acronym", "address", "area", "b", "bdo", "big", "blockquote", "br", "caption", "center", "cite", "code", "col", "colgroup", "dd", "del", "dfn", "div", "dl", "dt", "em", "font", "h1", "h2", "h3", "h4", "h5", "h6", "hr", "i", "img", "ins", "kbd", "li", "map", "ol", "p", "pre", "q", "s", "samp", "small", "span", "strike", "strong", "sub", "sup", "table", "tbody", "td", "tfoot", "th", "thead", "title", "tr", "tt", "u", "ul", "var", "xmp"];

    $( "html" ).append( `<div id="simpread-en" style="display: none;">${html}</div>` );
    $target = $( "#simpread-en" );
    $target.find( "img" ).map( ( index, item ) => {
        $( '<simpread-img></simpread-img>' ).attr({ src: item.src, style: "max-width:100%;height:auto;" }).replaceAll( $(item) );
    });
    $target.find( bad.join( "," ) ).remove();
    // remove element all atrr
    $target.find( "*" ).map( ( index, item ) => {
        const tag = item.tagName.toLowerCase();
        if ( tag.startsWith( "sr" ) && /sr-\S[^>]+/ig.test( tag )) {
            $(item).remove();
        }
        else if ( item.attributes.length > 0 ) {
            for ( let i = item.attributes.length - 1; i >= 0; i-- ) {
                const name = item.attributes[i].name;
                if ( tag == "a" && name == "href" ) {
                    let value = item.attributes[i].value;
                    value.startsWith( "//" ) && ( item.attributes[i].value += location.protocol );
                    continue;
                } else if ( tag == "simpread-img" ) {
                    continue;
                }
                item.removeAttribute( name )
            }
        }
    });
    str = $target.html();
    $target.remove();

    try {
        const href = url.indexOf("chksm") > 0 ? "" : `，原文地址 <a href="${url}" target="_blank">${url}</a>`;
        str = `<blockquote>本文由 <a href="http://ksria.com/simpread" target="_blank">简悦 SimpRead</a> 转码${href}</blockquote><hr></hr><br></br>` + str;
        str = str.replace( /(id|class|onclick|ondblclick|accesskey|data|dynsrc|tabindex|name)="[\S ][^"]*"/ig, "" )
                //.replace( / style=[ \w="-:\/\/:#;]+/ig, "" )             // style="xxxx"
                .replace( /label=[\u4e00-\u9fa5 \w="-:\/\/:#;]+"/ig, "" )  // label="xxxx"
                .replace( / finallycleanhtml=[\u4e00-\u9fa5 \w="-:\/\/:#;]+"/ig, "" )  // finallycleanhtml="xxxx"
                //.replace( /<img[ \w="-:\/\/?!]+>/ig, "" )                // <img>
                .replace( /<simpread-img/ig, "<img" )                      // <simpread-img>  → <img>
                .replace( /<\/simpread-img>/ig, "</img>" )                 // </simpread-img> → </img>
                .replace( /data[-\w]*=[ \w=\-.:\/\/?!;+"]+"[ ]?/ig, "" )   // data="xxx" || data-xxx="xxx"
                .replace( /href="javascript:[\w()"]+/ig, "" )              // href="javascript:xxx"
                .replace( /sr-blockquote/ig, "blockquote" )                // sr-blockquote to blockquote
                .replace( /<p[ -\w*= \w=\-.:\/\/?!;+"]*>/ig, "" )          // <p> || <p > || <p xxx="xxx">
                //.replace( /<figcaption[ -\w*= \w=\-.:\/\/?!;+"]*>/ig, "" ) // <figcaption >
                //.replace( /<\/figcaption>/ig, "" )                        // </figcaption>
                .replace( /<(figcaption|figure)/ig, "<div" )               // <figcaption|figure>  → <div>
                .replace( /<\/(figcaption|figure)>/ig, "</div>" )          // </figcaption|figure> → </div>
                .replace( /<\/br>/ig, "" )                                 // </br>
                .replace( /<br>/ig, "<br></br>" )
                .replace( / >/ig, ">" )
                .replace( /<\/p>/ig, "<br></br>" );

        return str;

    } catch( error ) {
        return `<div>转换失败，原文地址 <a href="${url}" target="_blank">${url}</a></div>`
    }
}

/**
 * Markdown to ENML
 * 
 * @param {string} str
 * @return {string} format str
 */
function md2enml( result ) {
    result = result.replace( /</ig, "&lt;" ).replace( />/ig, "&gt;" );
    let str = "";
    result.split( "\n" ).forEach( item => str += `<div>${item}</div>` );
    return str;
}

/**
 * Multi to ENML
 * 
 * @param {string} str
 * @return {string} format str
 */
function multi2enml( str ) {
    return str.replace( / data-\S+">/ig, ">" )
              .replace( /sr-[\w-]+/ig, "div" )
              .replace( /dangerouslysetinnerhtml="\[object Object\]"/ig, "" );
}

/**
 * Clear Html to MD, erorr <tag>
 * 
 * @param {string} convert string
 * @param {boolen} header
 * 
 * @return {string} format string
 */
function clearMD( str, header = true ) {
    header && ( str = `> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 ${ window.location.href } \r\n\r\n ${str}` );
    str = str.replace( /<\/?(ins|font|span|div|canvas|noscript|fig\w+)[ -\w*= \w=\-.:&\/\/?!;,%+()#'"{}\u4e00-\u9fa5]*>/ig, "" )
             .replace( /sr-blockquote/ig, "blockquote" )
             .replace( /<\/?style[ -\w*= \w=\-.:&\/\/?!;,+()#"\S]*>/ig, "" )
             .replace( /(name|lable)=[\u4e00-\u9fa5 \w="-:\/\/:#;]+"/ig, "" )
             return str;
}

/**
 * Clean HTML
 * 
 * @param {string} str
 * @return {string} optimze str
 */
function clearHTML( str ) {
    const url  = location.href,
          href = url.indexOf("chksm") > 0 || url.indexOf("#") > 0 ? "" : `，原文地址 <a href="${url}" target="_blank">${url}</a>`;
    str = `<blockquote>本文由 <a href="http://ksria.com/simpread" target="_blank">简悦 SimpRead</a> 转码${href}</blockquote><hr></hr><br></br>` + str;
    str = str.replace( /(id|class|onclick|ondblclick|accesskey|data|dynsrc|tabindex|name)="[\S ][^"]*"/ig, "" )
             .replace( /&/ig, "&amp;" )
    return str;
}

/**
 * Exclusion
 * 
 * @param  {object} minimatch
 * @param  {object} simpread.read
 * @return {boolen} true: exist; false: not exist
 */
function exclusion( minimatch, data ) {
    const url = window.location.origin + window.location.pathname;
    return data.exclusion.findIndex( item => {
        item == null && ( item = "" );
        item = item.trim();
        if ( item.startsWith( "[[/" ) && item.endsWith( "/]]" ) ) {
            return location.href.replace( new RegExp( item.replace( /\[\[\/|\/\]\]/ig, "" ), "g" ), "" ) == "" ? true : false;
        } else return item.startsWith( "http" ) ? minimatch( url, item ) : item == data.site.name;
    }) != -1 ? true : false;
}

/**
 * Whitelist
 * 
 * @param  {object} minimatch
 * @param  {object} simpread.read
 * @return {boolean} 
 */
function whitelist( minimatch, data ) {
    function match_(item){
        let item_ = item;
        if(item.startsWith( "www.")){
            item_ = item.slice(4);
        }else if(item.startsWith( "https://www.")){
            item_ = item.slice(12);
        }else if(item.startsWith( "http://www.")){
            item_ = item.slice(11);
        }
        return item_;
    }
    const url = window.location.origin + window.location.pathname;
    const bool = data.whitelist.findIndex( item => {
        item == null && ( item = "" );
        item = item.trim();
        item = match_(item);
        if ( item.startsWith( "[[/" ) && item.endsWith( "/]]" ) ) {
            return location.href.replace( new RegExp( item.replace( /\[\[\/|\/\]\]/ig, "" ), "g" ), "" ) == "" ? true : false;
        } else return item.startsWith( "http" ) ? minimatch( url, item ) : (~item.indexOf(data.site.name) || ~data.site.name.indexOf(item));
    }) != -1 ? true : false;
    console.log('util.Whitelist---',url,data,bool);
    return bool;
}

/**
 * Blacklist
 * 
 * @param  {object} minimatch
 * @param  {object} simpread.read
 * @return {boolean} true: is blacklist; false: is't blacklist
 */
function blacklist( minimatch, data ) {
    return data.blacklist.findIndex( item => {
       item == null && ( item = "" );
       item = item.trim();
       if ( item.startsWith( "[[/" ) && item.endsWith( "/]]" ) ) {
           return location.href.replace( new RegExp( item.replace( /\[\[\/|\/\]\]/ig, "" ), "g" ), "" ) == "" ? true : false;
       } else return item.startsWith( "http" ) ? minimatch( location.href, item ) : location.hostname.includes( item );
    }) != -1 ? true : false;
}

/**
 * Lazyload
 * 
 * @param  {object} minimatch
 * @param  {object} simpread.read
 * @return {boolean} true: is blacklist; false: is't blacklist
 */
function lazyload( minimatch, data ) {
    return data.lazyload.findIndex( item => {
       item == null && ( item = "" );
       item = item.trim();
       if ( item.startsWith( "[[/" ) && item.endsWith( "/]]" ) ) {
           return location.href.replace( new RegExp( item.replace( /\[\[\/|\/\]\]/ig, "" ), "g" ), "" ) == "" ? true : false;
       } else return item.startsWith( "http" ) ? minimatch( location.href, item ) : location.hostname.includes( item );
    }) != -1 ? true : false;
}

/**
 * Get page info
 * 
 * @return {object} include: url, title, favicon, img, desc
 */
function getPageInfo() {
    const url     = location.href,
          title   = $( "sr-read" ).find( "sr-rd-title" ).text() || $( "head" ).find( "title" ).text() || "",
          favicon = $( `head link[rel~=icon]` ).attr( "href" ) || "",
          img     = $( `head meta[property="og:image"]` ).attr( "content" ) || $( "sr-read" ).find( "img" ).attr( "src" ) || "",
          desc    = $( "sr-read" ).find( "sr-rd-desc" ).text() || $( `head meta[property="og:description"]` ).attr( "content" ) || $( 'meta[name=description]' ).attr( 'content' ) || "";
    return { url, title: title.trim(), favicon, img, desc: desc.trim() };
}

function txt2HtmlAppend2Dom(domStr,site){
    const {include, paging, exclude, title} = site;
    let $DOM = $('<div data-a="3">').append($(domStr));
    console.log('txt2HtmlAppend2Dom---',$DOM.find('title').html(),$DOM);
    
    exclude.forEach(exclu => {
        console.log('exclude--------',exclu ,formatSelector(exclu));
        
        $DOM.find(formatSelector(exclu)).remove();
    })
    
    let includeDOM = ''; //$DOM.find(formatSelector(include)).html();//'<div>';
    $DOM.find(formatSelector(include)) && $DOM.find(formatSelector(include)).each((i,dom)=>{
        // console.log(i,dom.innerText);
        includeDOM += dom.outerHTML;
    });
    // if(typeof includeDOM )
    let n = '';
    const len_ = $.parseHTML(includeDOM).length;
    $.parseHTML(includeDOM).forEach(function (e, a) {
        if(len_ > 1){
            // n += '<div className="item-box">';
            e.childNodes.forEach((childEl,childA) => {
                n += parseHTMLDOM(childEl, childA);
            });
            // n += '</div>';
        }else{
            n += parseHTMLDOM(e, a);
        }
        
    });
    console.log(includeDOM, $.parseHTML(includeDOM)[0].innerHTML);
    console.log('---includeDOM---------',$.parseHTML(n).length,$.parseHTML(includeDOM), n);
    let newN = '';
    if($.parseHTML(n).length == 1){
        $.parseHTML(n)[0].childNodes.forEach(function (e, a) {
            newN += parseHTMLDOM(e, a);
        });
    }else{
        newN = n;
    }
    
    console.log('---n---------',$.parseHTML(n).length,$.parseHTML(n), n);

    function parseHTMLDOM(e, a){
        var i = e.tagName,
          o = e.outerText,
          s = e.outerHTML,
          t=true,
          r=false,
          n = '';

        void 0 == i ? 
            n += "<p>" + e.textContent.replace(/</gi, "&lt;").replace(/>/gi, "&gt;").replace(/^\n|\n$/gi, "").trim() + "</p>" 
            : "PRE" == i ? 
                n += s 
                : "sr-blocks" == i.toLowerCase() ?
                     n += s 
                     : ("" != o || s.includes("<img") || s.includes("<video")) 
                     && (n += t && 0 == r ? 
                        s.replace(/ (style|id|class)="[\w ;%@#!-:(),\u4e00-\u9fa5]*"/gi, "") 
                        : s);
        return n;
    }


    let nextUrl = '';
    console.log(include, includeDOM, $DOM.find(formatSelector(include)),formatSelector(include));
    
    if(paging[1].next){
        nextUrl = getSelectorStr($DOM, paging[1].next, 'attr');
    }
    
    const titleTxt = getSelectorStr($DOM, title, 'text');
    // console.log('title--------',$DOM, title, titleTxt);
    

    // console.log($DOM.find('body'), $DOM.find(formatSelector(include)));
    
    // console.log(nextUrl, titleTxt);
    return {
        include: newN,
        next: nextUrl,
        title: titleTxt,

    }
}
/**
 * 
 * @param {domStr or JqStr} str 
 * @param {attr, text} dir 
 */
function getSelectorStr($DOM, str, dir){
    str = str.trim();
    if(str.startsWith('[[')){
        const bool = /^(\[\[\{)([\S\s]*)(\}\]\])$/.test(str);


        let _text = '';
        //$('.j_chapterName .content-wrap').text()
        //or
        //$('#j_chapterPrev').attr('href')
        const h = RegExp.$2;

        console.log(h,RegExp.$2);
        if(dir === 'text'){
            const handleStr = (h).split('.text');// attr
            if(handleStr.length == 2 && bool){
                _text = $DOM.find(formatSelector(eval(handleStr[0]))).text();
            }
            console.log(RegExp.$2);
        }else if(dir === 'attr'){
            const handleStr = (h).split('.attr');// attr
            if(handleStr.length == 2 && bool){
                const attrName = handleStr[1].replace(/^\(\'|\'\)$/g,'') || '';
                // console.log(handleStr,dir);
                _text = $DOM.find(formatSelector(eval(handleStr[0]))).attr(attrName);
            }
            console.log(RegExp.$2);
        }
        return _text;
        
    } else if(str.startsWith('<')){
        str = formatSelector(str);
        
        return $DOM.find(str).text();
    }
}
//"<div class='read-content'>" => div.read-content
function formatSelector(domStr){
    console.log(domStr);
    let dom;
    if(typeof domStr == 'string' && domStr.startsWith("[[/") && domStr.endsWith("/]]")){
        domStr = domStr.replace(/^\[\[\/|\/\]\]/g, "");
        return `[${domStr}]`;
    }else if(typeof domStr == 'string' && domStr.startsWith("[[{") && domStr.endsWith("}]]")){
        domStr = domStr.replace(/^\[\[\{\$\(\'|\'\)\}\]\]/g, "");

        // dom = eval(domStr);
        console.log(dom,domStr);
        return domStr;
    }else{
        dom = $(domStr);
    }
    if(!dom[0]) return null;
    // console.log(dom.attr('class'), dom);
    
    const tag = dom[0].nodeName.toLowerCase(),
        classStr = dom.attr('class'),
        classNames = classStr ? classStr.split(' ') : [],
        idStr = dom.attr('id') || '',
        class_ = classNames.length ? '.' + classNames.join('.') : '',
        id_ = idStr ? '#' + idStr : '',
        result = tag + id_ + class_;
        console.log(result, typeof result);
        
    return result;

}

export {
    verifyHtml     as verifyHtml,
    html2enml      as HTML2ENML,
    md2enml        as MD2ENML,
    multi2enml     as MULTI2ENML,
    clearMD        as ClearMD,
    clearHTML      as ClearHTML,
    exclusion      as Exclusion,
    whitelist      as Whitelist,
    blacklist      as Blacklist,
    lazyload       as Lazyload,
    getPageInfo    as GetPageInfo,
    txt2HtmlAppend2Dom as Txt2HtmlAppend2Dom,
}