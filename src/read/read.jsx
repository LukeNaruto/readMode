console.log( "=== simpread read load ===" )

import ProgressBar        from 'schedule';
import * as spec          from 'special';
import ReadCtlbar         from 'readctlbar';
import * as toc           from 'toc';
import * as setting       from 'setting';
import * as se            from 'siteeditor';
import * as kbd           from 'keyboard';
import * as fb            from 'feedback';
import {Txt2HtmlAppend2Dom} from 'util';
import { storage, Clone } from 'storage';
import th                 from 'theme';
import * as ss            from 'stylesheet';
import {browser}          from 'browser';
import * as msg           from 'message';
import * as highlight     from 'highlight';
import * as run           from 'runtime';
import * as tips          from 'tips';

import * as tooltip       from 'tooltip';
import * as waves         from 'waves';
import 'font_css';


const rdcls   = "simpread-read-root",
      bgtmpl  = `<div class="${rdcls}"></div>`,
      rdclsjq = "." + rdcls,
      $root   = $( "html" ),
      theme   = "simpread-theme-root";

// load count,.0: call Readability. 1: call highlight 2: all failed
let   load_count = 0;

class SrRead extends React.Component{
    constructor(props){
        super();
    }
    componentDidMount(){
        const {wrapper} = this.props;
        setTimeout(()=>{
            $('sr-rd-content > *').addClass('readDOM');
            $('sr-rd-content').eq(load_count).find('img').each((i,el)=>{
                !el.parentNode.classList.contains('sr-rd-content-center') && $(el).wrap("<div class='sr-rd-content-center'></div>")
            })
            
        });
    }
    render(){
        const {wrapper} = this.props;
        //dangerouslySetInnerHTML={{__html: wrapper.include }} 无法渲染/<!--.*?-->/g,pureread正则有问题
        // wrapper.include = wrapper.include.replace(/<!--.*?-->/g, '');
        const Article = <sr-rd-content dangerouslySetInnerHTML={{__html: wrapper.include }}></sr-rd-content>;
        return(
            <sr-read >
                <sr-rd-title class="readDOM">{ wrapper.title }</sr-rd-title>
                <sr-rd-hostname  class="readDOM">{location.hostname}</sr-rd-hostname>
                { Article }
                
            </sr-read>
        )
    } 
}
class ImgShowBox extends React.Component {
    imgWidth = 0;
    imgHeight = 0;
    constructor(props){
        super();
        const {srcImgs, idx} = props;
        this.state = {
            src: srcImgs[idx],
            idx,
            percent: 100,
            x: 0,
            y: 0
        }
        console.log(this.props,props);
        
        this.len = props.srcImgs.length;
    }
    close(){
        ReactDOM.unmountComponentAtNode( $('#imgShowBox')[0] );
    }
    switchImg(dir){
        const {srcImgs} = this.props;
        this.imgWidth = this.imgHeight = 0;
        this.setState((preState) => {
            let idx = preState.idx + (dir ? 1 : -1);
            idx = idx >= this.len ? 0 : idx;
            idx = idx < 0 ? this.len - 1 : idx;
            return {
                ...preState,
                idx,
                src: srcImgs[idx],
                x: 0,
                y: 0,
                percent: 100,
            }
        });
    }
    download(status){
        const {state: { src, idx }, props: { srcImgs }} = this;
        browser.runtime.sendMessage(msg.Add(msg.MESSAGE_ACTION.image_download, 
            { status, srcImgs, idx }), 
            function (res) {

            }
        )
    }
    zoomImg = (ratioDelta) => {
        let percent = Number((this.state.percent * ratioDelta).toFixed(0));
        if (percent <= 5) {
            percent = Number((5 * ratioDelta).toFixed(0));
        }
        if (percent > 95 && percent < 105) {
            percent = 100;
        } else if (percent >= 1000) {
            percent = 1000;
        } else if (percent < 5) {
            percent = 5;
        }
        this.setState((preState)=>{
            return {
                ...preState,
                percent
            }
        });
    }
    scaleImg(e){
        let _delta = e.originalEvent.wheelDelta;
        this.zoomImg(_delta > 0 ? 1.1 : .9)
        console.log(this.scale, e.originalEvent.wheelDelta, this.refs.curImg)
    }
    componentDidMount(){
        const _this = this;
        $('#imgShowBox').on('mousewheel', this.scaleImg.bind(this));
        $(this.refs.curImg).on('mousedown', function(d_e){
            const {x: curX, y: curY, percent} = _this.state;
            const paintW = this.width  * percent / 100, 
                  paintH = this.height * percent / 100;

            const maxX = (document.documentElement.clientWidth  + paintW) / 2,
                  maxY = (document.documentElement.clientHeight + paintH) / 2;
            $('.img-show-box').on('mousemove', function(m_e){
                let x = curX + m_e.pageX - d_e.pageX, 
                    y = curY + m_e.pageY - d_e.pageY;
                x = maxX - 20 < Math.abs(x) ? (maxX - 20) * (x > 0 ? 1 : -1) : x;
                y = maxY - 20 < Math.abs(y) ? (maxY - 20) * (y > 0 ? 1 : -1) : y;

                _this.refs.curImg.style.cursor = 'pointer';
                _this.setState((preState)=>{
                    return {
                        ...preState,
                        x: x,
                        y: y,
                    }
                });
            });
            $('.img-show-box').on('mouseup mouseout',function (e){
                _this.refs.curImg.style.cursor = 'default';
                $(this).unbind('mouseup mouseout mousemove');
            });
        });
        this.refs.closeEl.addEventListener('click',(e)=>{
            if($(e.target).hasClass('show-box') || $(e.target).hasClass('img-show-box')){
                this.close();
            }
        });
        
    }
    componentWillUnmount(){
        $('#imgShowBox').unbind('mousewheel', this.scaleImg.bind(this));
        $(this.refs.curImg).unbind();
    }
    render(){
        // todo
        const {state:{src,idx, percent,x,y},len} = this;
        const Btns = <div>
            <div onClick={()=>this.close()} className="btn-close btn-circle"><i className="iconfont icon-yuedumoshi_guanbi"></i></div>
                <div onClick={()=>this.switchImg(0)} className={`btn-pre btn-circle ${len <= 1 && 'disable'}`}>
                    <i className="iconfont icon-yuedumoshi_youxuanzhuan"></i>
                </div>
                <div onClick={()=>this.switchImg(1)} className={`btn-next btn-circle ${len <= 1 && 'disable'}`}>
                    <i className="iconfont icon-yuedumoshi_zuoxuanzhuan"></i>
                </div>
        </div>;
        const btnGroups = <ul className="btn-groups">
            <li onClick={()=>this.download(0)}><i className="iconfont icon-yuedumoshi_dantuxiazai"></i></li>
            <li onClick={()=>this.download(1)} title="在使用批量下载时，请在浏览器设置中关闭“下载前询问每个文件的保存位置，否则会弹出多个下载窗口”"><i className="iconfont icon-yuedumoshi_duotuxiazai"></i></li>
            <li><a href="https://bbs.minibai.com/" title="反馈" target="_blank"><i className="iconfont icon-yuedumoshi_fankui"></i></a> </li>
            <li>{`${ idx + 1 }  |  ${len}`}</li>
        </ul>;
        const Img = <img ref="curImg" draggable="false" src={src} alt="image" style={{transform: `translate(${x}px, ${y}px) scale(${percent / 100})`}} />;
        if(!this.imgWidth && !this.imgHeight){
            const images = new Image();
            images.src = src;
            this.imgWidth = images.width;
            this.imgHeight = images.height;
        } 
        return (
            <div ref="closeEl" className="img-show-box">
                <p className="sub-des">图片大小：{this.imgWidth} <i className="iconfont icon-yuedumoshi_guanbi"></i>  {this.imgHeight}</p>
                <div className="show-box">{Img}</div>
                {Btns}
                {btnGroups}
            </div>
        )
    }
}

class Read extends React.Component {
    constructor(props){
        super();
        const paging = props.wrapper.paging;
        this.state = {
            htmls: props.htmls,
            locked: false,
            nextUrl: Array.isArray(paging) ? paging[1].next : '',
        }
    }
    verifyContent() {
        return true;
    }

    viewImg(){
        console.log('componentDidUpdate----222---');
        // todo
        $('#read_container_ img').unbind('click');
        setTimeout(()=>{
            console.log('componentDidUpdate-------');
            $('#read_container_ img').on('click', function(){
                const idx = $('#read_container_ img').index($(this));
                let $imgShowBox = $('#imgShowBox');
                if(!$imgShowBox.length) {
                    $imgShowBox = $('<div id="imgShowBox"></div>');
                    $('.simpread-read-root').append($imgShowBox);
                }
                const srcImgs = []
                $('#read_container_ img').each((i, img)=> {
                    srcImgs.push($(img).attr('src'))
                })
                ReactDOM.render(<ImgShowBox idx={idx} srcImgs={srcImgs} />, $imgShowBox[0]); 
            })
        },500);
    }

    componentWillMount() {
        ss.CustomFontFamily(storage.read.fontFamilies);
        $( "body" ).addClass( "simpread-hidden" );
        th.Change( this.props.read.theme );
        if ( storage.current.fap ) {
            $( "head" ).append( '<link rel="stylesheet" class="simpread-fs-style" href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/solid.min.css" />' );
            $( "head" ).append( '<link rel="stylesheet" class="simpread-fs-style" href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/brands.min.css" />' );
            $( "head" ).append( '<link rel="stylesheet" class="simpread-fs-style" href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/fontawesome.min.css" />' );
        }
    }
    componentWillUpdate (){
        this.viewImg();
    }
    async componentDidMount() {
        // if ( load_count > 0 && !this.verifyContent() ) {
        //     return;
        // }
    
        this.viewImg();
        let scrollCount = 0;
        let unshakeTimer = null;
        
        $root
            .addClass( "simpread-font" )
            .addClass( theme )
            .on('contextmenu',function(){return false;})
            .find( '.simpread-scroll' )
                .addClass( theme )
                .sreffect( { opacity: 1 }, { delay: 100 })
                .addClass( "simpread-read-root-show" )
                .on('scroll',()=>{
                    clearTimeout(unshakeTimer);
                    ss.ToTopRight();
                    const scrollTemp = $('.simpread-scroll').scrollTop();
                    unshakeTimer = setTimeout(()=>{
                        const top = scrollTemp > scrollCount ? '-54px' : '0';
                        $('sr-rd-crlbar').css({'marginTop': top});
                        if(scrollTemp) {
                            $('sr-rd-crlbar').addClass('scrolling')
                            $(this.refs.toTop).show();
                        }else{
                            $('sr-rd-crlbar').removeClass('scrolling');
                            $(this.refs.toTop).hide();
                        };
                        scrollCount = scrollTemp;
                    },100);
                    
                    this.renderPreload();
                })
                .on('click', function(){
                    $('sr-rd-crlbar').css({'marginTop': 0});
                });
        window.addEventListener('resize',()=>{
            ss.ToTopRight();
        });
        $(this.refs.toTop).on('click', function(){
            $('.simpread-scroll').animate({
                scrollTop: 0,
            },500)
        });

        this.props.read.fontfamily && ss.FontFamily( this.props.read.fontfamily );
        this.props.read.fontsize   && ss.FontSize( this.props.read.fontsize );
        this.props.read.layout     && ss.Layout( this.props.read.layout );
        this.props.read.site.css   && this.props.read.site.css.length > 0
            && ss.SiteCSS( this.props.read.site.css );
        ss.Preview( this.props.read.custom );

        storage.pr.state == "txt"             && !location.href.endsWith( ".md" ) && $( "sr-rd-content" ).css({ "word-wrap": "break-word", "white-space": "pre-wrap" });
        $( "sr-rd-desc" ).text().trim() == "" && $( "sr-rd-desc" ).addClass( "simpread-hidden" );

        excludes( $("sr-rd-content"), this.props.wrapper.exclude );
        console.log('------beauti--',$( "sr-rd-content" ).find('video'));
        
        storage.pr.Beautify( $( "sr-rd-content" ) );
        storage.pr.Format( rdcls );

        kbd.Render( $( "sr-rd-content" ));
        tooltip.Render( rdclsjq );
        // waves.Render({ root: rdclsjq });
        storage.Statistics( "read" );
        browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.track, { eventCategory: "mode", eventAction: "readmode", eventValue: "readmode" }) );

        !this.props.wrapper.avatar && this.props.read.toc 
            && toc.Render( "sr-read", $( "sr-rd-content" ), this.props.read.theme, this.props.read.toc_hide );

        this.props.wrapper.avatar && $( ".simpread-read-root" ).addClass( "simpread-multi-root" );

        loadPlugins( "read_complete" );
        setTimeout( ()=>{
            this.verifyContent();
            tips.Render( storage.option.plugins );
            tips.Help( storage.statistics );
            this.renderPreload();
        }, 50 );
        
    }

    async renderPreload() {
        let {locked, nextUrl} = this.state;
        const preload = storage.read.preload;
        const paging = this.props.wrapper.paging;
        console.log(preload,locked, !locked && paging && paging.length > 0 && preload, paging);
        
        if (!locked && paging && paging.length > 0 && preload) {
            const clientH = $('#read_container_').height() + 40;
            const scrollT = $('.simpread-scroll').scrollTop() + $(".simpread-read-root").height() * 2;
            const pageLittle = $('#read_container_').height() < $(".simpread-read-root").height();
            // console.log(scrollT > clientH , pageLittle);
            if (scrollT > clientH || pageLittle) {
                await this.setState((pre) => ({
                    ...pre,
                    locked: true,
                }));
                nextUrl && $.ajax({
                    url: nextUrl,
                    beforeSend:()=>{},
                    success:(res)=>{
                        const nextContent = Txt2HtmlAppend2Dom(res, storage.current.site);
                        console.log('---Txt2HtmlAppend2Dom-----------',nextContent,this.state.htmls);
                        this.setState((pre) => ({
                            ...pre,
                            htmls: [...pre.htmls, nextContent],
                            locked: false,
                            nextUrl: nextContent.next,
                        }),()=>{
                            load_count++;
                            console.log(this.state.htmls);
                        });
                        // storage.pr.Beautify( $( "sr-rd-content" ) );
                    },
                });
            }
        }
        // console.log('locked', locked);
    }

    componentWillUnmount() {
        run.Event( "read_end" );
        loadPlugins( "read_end" );
        ss.FontSize( "" );
        $root.removeClass( theme )
             .removeClass( "simpread-font" );
        $root.attr("style") && $root.attr( "style", $root.attr("style").replace( "font-size: 62.5%!important", "" ));
        ss.SiteCSS();
        $( "body" ).removeClass( "simpread-hidden" );
        $( rdclsjq ).remove();
        tooltip.Exit( rdclsjq );
    }

    /**
     * Controlbar action event
     * @param {string} type, include: exit, setting, save, scroll, option
     * @param {string} value 
     * @param {string} custom value, storage.current.custom.art.xxx 
     */
    onAction( type, value, custom ) {
        switch ( type ) {
            case "exit":
                this.exit();
                break;
            case "setting":
                setting.Render( ()=>setTimeout( ()=>se.Render(), 500 ));
                break;
            case "siteeditor":
                $( "panel-bg" ).length > 0 && $( "panel-bg" )[0].click();
                setTimeout( ()=>se.Render(), 500 );
                break;
            case "fontfamily":
            case "fontsize":
            case "layout":
            case "theme":
            case "shortcuts":
            case "custom":
                
                type != "custom" ? storage.current[type]=value : storage.current.custom.art[custom]=value;
                storage.Setcur( storage.current.mode );
                break;
                
            case "whitelist":
                console.log("whitelist--",value, storage.current.whitelist);
                
                storage.current.whitelist = value ? value.split(',') : [];
                storage.Setcur( storage.current.mode );
                break;
            case "remove":
                $( "panel-bg" ).length > 0 && $( "panel-bg" ).trigger( "click" );
                new Notify().Render({ content: "移动鼠标选择不想显示的内容，可多次选择，使用 ESC 退出。", delay: 5000 });
                highlight.Multi( dom => {
                    const path = storage.pr.Utils().dom2Xpath( dom ),
                          site = { ...storage.pr.current.site };
                    site.exclude.push( `[[\`${path}\`]]` );
                    if ( storage.pr.state == "temp" ) {
                        const include = storage.pr.Utils().dom2Xpath( storage.pr.dom );
                        site.include  = `[[\`${include}\`]]`;
                        site.name     = site.name.replace( "tempread::", "" );
                    }
                    storage.pr.Updatesite( 'local', storage.current.url, [ site.url, storage.pr.Cleansite(site) ]);
                    storage.Writesite( storage.pr.sites, () => {
                        storage.pr.current.site.name    = site.name;
                        storage.pr.current.site.include = site.include;
                    });
                    $(dom).remove();
                });
                break;
            case "highlight":
                new Notify().Render( `移动鼠标选择高亮区域，以便生成阅读模式，此模式将会在页面刷新后失效，详细说明请看 <a href="http://ksria.com/simpread/docs/#/重新高亮" target="_blank">重新高亮</a>` );
                this.exit();
                Highlight().done( dom => {
                    const rerender = element => {
                        storage.pr.TempMode( "read", element );
                        Render();
                    };
                    storage.current.highlight ? 
                        highlight.Control( dom ).done( newDom => {
                            rerender( newDom );
                        }) : rerender( dom );
                });
                break;
            /*
            case "scroll":
                $( "sr-read" ).velocity( "scroll", { offset: $( "body" ).scrollTop() + value });
                break;
            */
        }
    }

   // exit read mode
    exit() {
        Exit();
    }
    render() {
        
        return (
            <div className="simpread-scroll">
                <div id="read_container_" style={{width: '100%', position: 'relative'}}>
                    <ReadCtlbar show={ this.props.read.controlbar } 
                                multi={ this.props.wrapper.avatar ? true : false }
                                type={ this.props.wrapper.name }
                                site={{ title: this.props.wrapper.title, url: window.location.href }} 
                                custom={ this.props.read.custom } onAction={ (t,v,c)=>this.onAction( t,v,c ) }/>
                    {
                        this.state.htmls.map(html => (
                            <SrRead wrapper={html} />
                        ))
                    }
                    <span className="toTop" ref="toTop" id="toTop"><i className="iconfont icon-yuedumoshi_fanhuidingbu"></i></span>
                </div>
            </div>
            
            
        )
    }

}


/**
 * Render entry
 * 
 * @param {boolean} true: call mathJaxMode(); false: @see mathJaxMode
 */
function Render( callMathjax = true ) {
    
    console.log(JSON.parse(JSON.stringify(storage)));
    loadPlugins( "read_start" );
    callMathjax && mathJaxMode();
    storage.pr.ReadMode();
    console.log(JSON.parse(JSON.stringify(storage)),storage.pr.html.include);
    if ( typeof storage.pr.html.include == "string" && storage.pr.html.include.startsWith( "<sr-rd-content-error>" ) ) {
        console.warn( '=== Adapter failed call Readability View ===' )
        storage.pr.Readability();
        storage.pr.ReadMode();
        
        console.log(4,JSON.parse(JSON.stringify(storage)));
        if(storage.pr.state.startsWith('temp')){
            storage.pr.state = 'adapter';
        }
        
        if(storage.pr.html.name.startsWith('tempread::')){
            storage.pr.html.name = storage.pr.html.name.replace('tempread::', '');
            storage.pr.html.target = 'global'
        }
        
        console.log(4,JSON.parse(JSON.stringify(storage)));
        
    } else console.warn( '=== Normal Read mode ===' )
    storage.pr.htmls = [storage.pr.html];
    console.log(JSON.parse(JSON.stringify(storage)));
    console.warn( "=== Current PuRead object is ===", storage.pr )
    console.warn( "=== Current PuRead object is ===", storage.current )
    ReactDOM.render( <Read read={ storage.current } wrapper={ storage.pr.html } htmls={storage.pr.htmls} />, getReadRoot() );
}

/**
 * High light current page to read mode( read only )
 */
function Highlight() {
    const dtd = $.Deferred();
    highlight.Start().done( dom => {
        dtd.resolve( dom );
    });
    return dtd;
}

/**
 * Verify simpread-read-root tag exit
 * 
 * @param  {boolean}
 * @return {boolean}
 */
function Exist( action ) {
    console.log('read-Exist',action);
    if ( $root.find( rdclsjq ).length > 0 ) {
        
        action && Exit();
        //action && setting.Render( ()=>setTimeout( ()=>se.Render(), 500 ));
        return true;
    } else {
        return false;
    }
}

/**
 * Exit
 */
function Exit() {
    $( rdclsjq ).sreffect( { opacity: 0 }, {
        delay: 100,
        complete: ( elements ) => {
            ReactDOM.unmountComponentAtNode( getReadRoot() );
        }
    }).addClass( "simpread-read-root-hide" );
}

/**
 * MathJax Mode
 */
function mathJaxMode() {
    console.warn( '=== MathJax Mode =22222==' )
    if ( storage.pr.isMathJax() && storage.pr.state == "temp" ) {
        console.warn( '=== MathJax Mode ===' )
        const dom = storage.pr.MathJaxMode();
        console.log( 'current get dom is ', dom )
        if ( typeof dom == "undefined" ) {
            // new Notify().Render( "<a href='http://ksria.com/simpread/docs/#/词法分析引擎?id=智能感知' target='_blank' >智能感知</a> 失败，请移动鼠标框选。" );
            Highlight().done( dom => {
                const rerender = element => {
                    storage.pr.TempMode( "read", element );
                    Render( false );
                };
                storage.current.highlight ? 
                    highlight.Control( dom ).done( newDom => {
                        rerender( newDom );
                    }) : rerender( dom );
            });
        } else if ( typeof dom == "string" ) {
            const html = storage.pr.GetDom( dom, "html" );
            storage.pr.Newsite( "read", html );
        } else {
            storage.pr.TempMode( "read", dom[0] );
        }
    }
}

/**
 * Get read root
 * 
 * @return {jquery} read root jquery object
 */
function getReadRoot() {
    if ( $root.find( rdclsjq ).length == 0 ) {
        $root.append( bgtmpl );
    }
    return $( rdclsjq )[0];
}

/**
 * Set exclude style
 * 
 * @param {jquery} jquery object
 * @param {array}  hidden html
 */
function excludes( $target, exclude ) {
    const tags = storage.pr.Exclude( $target );
    $target.find( tags ).remove();
}

/**
 * Load plugins from storage and exec
 * 
 * @param {string} state include: plugin.run_at
 */
function loadPlugins( state ) {
    storage.Plugins( () => {
        storage.option.plugins.forEach( id => {
            storage.plugins[id] && run.Exec( state, storage.current.site.name, storage.plugins[id] );
        });
    });
}

export { Render, Exist, Exit, Highlight };
