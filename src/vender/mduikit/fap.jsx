/*!
 * React Material Design: FAP( Floating Action Panel )
 * 
 * @version : 0.0.1.1231
 * @update  : 2018/04/19
 * @homepage: https://github.com/kenshin/mduikit
 * @license : MIT https://github.com/kenshin/mduikit/blob/master/LICENSE
 * @author  : Kenshin Wang <kenshin@ksria.com>
 * 
 * @copyright 2017
 */

console.log( "==== simpread component: Floating Action Panel ====" )
import { storage } from 'storage';
const cssinjs = () => {
    const spec_color = 'rgba(244, 67, 54, 1)',
          normal_color= 'rgba(245, 82, 70, .8)',
          focus_color = 'rgba(243, 52, 38, .9)',
          styles      = {

              root : {
                display: '-webkit-box',
                WebkitBoxAlign: 'center',
                WebkitBoxOrient: 'vertical',
                WebkitBoxDirection: 'reverse',
                position: 'fixed',

                bottom: '45px',
                right: '24px',

                width: 'auto',
                height: 'auto',
              },

              origin : {
                display: 'block',
                position: 'relative',

                margin: '0 0 15px',
                padding: 0,

                width: '40px',
                height: '40px',
                lineHeight: '40px',

                color: '#fff',
                backgroundColor: normal_color,

                borderRadius: '50%',

                cursor: 'pointer',
                boxShadow: '0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2)',
              },

              large : {
                width: '56px',
                height: '56px',
                lineHeight: '56px',
                zIndex: 2,
              },

              spec: {},
              normal: {},

              spec_item : {
                backgroundColor: spec_color,
                transform: 'rotate(0deg)',
              },

              spec_focus : {
                  backgroundColor: focus_color,
                  transition: 'all 450ms 0ms',
                  transform: 'rotate(45deg)',
              },

              normal_focus : {
                  transition: 'all 450ms 0ms',
                  boxShadow: '0 5px 11px 0 rgba(0,0,0,0.18), 0 4px 15px 0 rgba(0,0,0,0.15)',
              },

              spec_icon: {},
              normal_icon: {},

              icon : {
                  display: 'inline-block',
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
              },

              panel_bg :{
                display: 'none',
                position: 'fixed',

                top: 0,
                left: 0,

                width: '100%',
                height: '100%',
              },

          };
    return styles;
};

const cssinjs_panel = () => {

    const styles = {
          activeColor: 'rgba(0, 137, 123, .8)',
          root : {
              display: '-webkit-flex',
              flexDirection: 'column',

              position: 'absolute',
              right: '30px',
              top: '50px',

              
              width: '278px',
              height: '560px',
              margin: 0,
              padding: '24px',

              color: 'rgba(0, 0, 0, 0.870588)',
              backgroundColor: 'rgb(255, 255, 255)',

              borderRadius: '3px',

              boxSizing: 'border-box',
              boxShadow: '0 0 2px rgba(0,0,0,0.12), 0 2px 2px rgba(0,0,0,0.26)',

              opacity: 0,
              visibility: 'hidden',
              transition: 'opacity 300ms ease',
              cursor: 'default',
              textAlign: 'initial',
              zIndex: 2147483647,
              fontFamily: 'initial',
          },

          panel_tabs: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',

            fontSize: '14px',

            borderBottom: '2px solid #E0E0E0',
          },

          panel_tab: {
            position: 'relative',
            padding: '0px 24px 5px 24px',
            width: '100%',

            cursor: 'pointer',
          },

          panel_tab_label: {
            display: '-webkit-box',
            flexShrink: 1,

            WebkitLineClamp: 1,
            '-webkit-box-orient': 'vertical',

            overflow: 'hidden',
            textOverflow: 'ellipsis',
          },

          panel_border: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,

            marginBottom: '-2px',

            fontWeight: 500,
            color: '#3273dc',

            borderBottom: '2px solid ',

            transform: 'scaleX(0)',
            transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
          },

          panel_border_active: {
            transform: 'scaleX(1)',
          },

          groups: {
            display: 'block',
            width: '100%',
            // overflowX: 'hidden',
            // overflowY: 'auto',
          },

          group: {
            display: 'none',
          },

          group_active: {
            display: 'block',
            opacity: 1,
          },
    }
    return styles;
}

class Panel extends React.Component {

    static defaultProps = {
        items      : [],
        autoHeight : false,
        activeColor: undefined,
    };

    static propTypes = {
        item       : PropTypes.array,
        autoHeight : PropTypes.bool,
        activeColor: PropTypes.string,

        onOpen     : PropTypes.func,
        onClose    : PropTypes.func,
    };

    style = cssinjs_panel()

    onTabChange( event ) {
        const style   = { ...this.style };
        let   $target = $( event.target ),
              active  = $target.attr( "active" ),
              idx     = $target.attr( "idx" ),
              tag     = event.target.tagName.toLowerCase();
        while ( tag  != "panel-tab" ) {
            $target   = $target.parent();
            active    = $target.attr( "active" );
            idx       = $target.attr( "idx" );
            tag       = $target[0].tagName.toLowerCase();
        }
        if ( active == "false" ) {
            const $others = $( "panel-tab[active=true]" );
            $target.attr( "active", true );
            $target.find( "panel-border" ).css({ ...style.panel_border, ...style.panel_border_active });

            $others.attr( "active", false );
            $others.find( "panel-border" ).css({ ...style.panel_border });

            $( `panel-group[idx=${idx}]`  ).attr( "active", true ).css({ ...style.group, ...style.group_active });
            $( `panel-group[idx!=${idx}]` ).attr( "active", false ).css({ ...style.group });
        }
    }

    autoHeight() {
        let maxHeight = 0;
        $( "panel-groups" ).children().map( ( idx, item ) => {
            if ( maxHeight == 0 ) {
                maxHeight = $(item).height();
            } else if ( $(item).height() > maxHeight ) {
                maxHeight = $(item).height();
            }
        });
        $( "panel-groups" ).height( maxHeight );
    }

    offsetHeight() {
        const $target = $( this.refs.panel ),
              offset  = $target.position().top,
              $groups = $target.find( "panel-groups" ),
              height  = $groups.height();
        if ( offset < 0 ) {
            $groups.height( height + offset - 32 ).css({ "padding-right": "20px" });
        }
    }

    componentDidMount() {
        $( this.refs.panel ).css( "opacity", 1 ).css( "visibility", "visible" );
        this.props.autoHeight == false && this.autoHeight();
        this.offsetHeight();
        this.props.onOpen();
    }

    componentWillUnmount() {
        this.props.onClose();
    }

    render() {
        const style = { ...this.style };

        style.panel_border.borderBottom = style.panel_border.borderBottom + ( this.props.activeColor ? this.props.activeColor : style.activeColor );
        
        
        const active_border = { ...style.panel_border, ...style.panel_border_active },
              active_group  = { ...style.group, ...style.group_active },
              events        = this.props.tabAutoSel ? { onMouseEnter: evt => this.onTabChange(evt) } : { onClick: evt => this.onTabChange(evt) },
              /* tabs          = this.props.items.map( ( item, idx ) => {
                return <panel-tab 
                            style={ style.panel_tab } 
                            active={ idx == 0 ? "true" : "false" } 
                            idx={ idx } 
                            { ...events } >
                            <span style={ style.panel_tab_label }>{item}</span>
                            <panel-border 
                                style={ idx == 0 ? active_border : { ...style.panel_border } }>
                                </panel-border>
                        </panel-tab>;
             }), */
            /*  tabs          = <panel-tab 
                                style={ style.panel_tab } 
                                active={ "true" } 
                                { ...events } >
                                <span style={ style.panel_tab_label }>{this.props.items}</span>
                                <panel-border 
                                    style={ active_border }>
                                    </panel-border>
                            </panel-tab>, */
             /* groups         = this.props.children.map( ( child, idx ) => {
                return <panel-group 
                            style={ idx == 0 ? active_group : { ...style.group } } 
                            active={ idx == 0 ? "true" : "false" } 
                            idx={ idx }
                        >{child}</panel-group>;
             }); */
             groups         = <panel-group 
                                style={ active_group } 
                                active={ "true" } 
                            >{this.props.children}</panel-group>

        return (
            <panel ref="panel" style={ style.root } title="">
                {/* <panel-tabs style={ style.panel_tabs }>
                    { tabs }
                </panel-tabs> */}
                <panel-groups style={ style.groups }>
                    { groups }
                </panel-groups>
            </panel>
        )
    }
}

/**
 * Button react stateless component
 * 
 * @param {object} react props, include:
 *   - id          : [PropTypes.string] identify
 *   - type        : [PropTypes.string] type, include: sepc, anchor, normal
 *   - style       : [PropTypes.object] <a> style
 *   - name        : [PropTypes.string] name
 *   - color       : [PropTypes.string] background color
 *   - icon        : [PropTypes.object] { style, path }
 *   - tooltip     : [PropTypes.object] tooltip 
 *   - waves       : [PropTypes.string] waves 
 *   - onClick     : [PropTypes.func]   click event handler
 *   - onMouseOver : [PropTypes.func]   mouse over event handler
 *   - onMouseOut  : [PropTypes.func]   mouse out event handler
 */
const Button = ( props ) => {
    props.icon.style.backgroundImage = `url(${props.icon.path})`;
    if ( props.color ) {
        props.style.backgroundColor = props.color;
    } else {
        props.color = props.style.backgroundColor;
    }
    const tooltip =  props.type == "anchor" ? "" : ( props.tooltip.text ? props.tooltip.text : props[ props.tooltip.target ] );
    return (
        <a style={ props.style } className={  props.waves }
           data-tooltip={ tooltip } data-tooltip-position={ props.tooltip.position } data-tooltip-delay={ props.tooltip.delay } >
            <i 
                id={ props.id }
                type={ props.type }
                name={ props.name }
                color={ props.color }
                style={ props.icon.style }
                onClick={ evt=>props.onClick(evt) }
                onMouseOver={ evt=> props.onMouseOver(evt) }
                onMouseOut={ evt=> props.onMouseOut(evt) }
            ></i>
        </a>
    )
};

class AudioBox extends React.Component{
    constructor(props){
        super();
        this.state = {
            playA: props.playA,
        }
    }
    audioUnShackeTimer = null;
    len = 0;
    oIdx = 0;
    fence = 2;
    playFn(type){
        
        console.log('clearTimeout--');
        
        clearTimeout(this.audioUnShackeTimer);
        this.audioUnShackeTimer = setTimeout(()=>{
            this.props.audioSocket(type, type === 'play' ? !this.state.playA : undefined);
        },200);
        
    }
    lineRepaint(val){
        const {len, oIdx, fence, props:{options:{pointer, step}}} = this;
        const maxWidth = $(this.refs.line).width();
        const count = (val - pointer) / step;
        const itemWidth = (maxWidth - fence) / len;
        const width = itemWidth * Math.abs(count) + fence;
        const left = (oIdx + (count >= 0 ? 0 : count )) * itemWidth;
        $(this.refs.lineBg).css({width,left}).removeClass('toLeft');
        if(count < 0){
            $(this.refs.lineBg).addClass('toLeft');
        }
        
        $(this.refs.range).attr('title',val + 'X').val(val);
    }
    onChange(ev){
        console.log(ev.target.value,$(this.refs.range));
        this.setValue(ev.target.value)
    }
    setValue(val){
        this.lineRepaint(val);
        this.props.onChange && this.props.onChange( val );
    }
    componentWillMount(){
        const {min, max, step, pointer} = this.props.options;
        this.oIdx = (pointer - min) / step;
        this.len = (max - min) / step;
        console.log(storage.read);
    }
    setPlayA(){
        const {audio} = this.props;
        this.setState({
            playA: !audio.paused,
        },() => {
            this.props.onChangePlaying(this.state.playA);
        });
    }
    componentDidMount() {
        const {value,audio} = this.props;
        this.lineRepaint(value);
        audio.removeEventListener('play',this.setPlayA.bind(this));
        audio.removeEventListener('pause',this.setPlayA.bind(this));
        audio.addEventListener('play',this.setPlayA.bind(this));
        audio.addEventListener('pause',this.setPlayA.bind(this));
        this.setState({
            playA: !audio.paused,
        }); 
    }
    render(){
        const {state: {playA}, props:{desc,options:{min, max, step}}, len, fence} = this;
        return (
            <div className="audio-box">
                
                <span onClick={()=>{$('panel-bg').click();}} className="close iconfont icon-closepx"></span>
                <div className="play-settings">
                    <span onClick={()=>{this.playFn('pre')}} className="pre-audio"><i className="iconfont icon-voice-set-backoff-16px"></i></span>
                    <span onClick={()=>{this.playFn('play')}} className="middle-audio"><i className={`iconfont ${playA ? 'icon-voice-suspend-20px' : 'icon-voice-play-20px'}`}></i></span>
                    <span onClick={()=>{this.playFn('next')}} className="next-audio"><i className="iconfont icon-voice-set-forward-16px"></i></span>
                </div>
                <play-rate>
                    <play-label>{desc}</play-label>
                    <play-goup>
                        <input ref="range" onChange={ evt=> this.onChange(evt) } min={min} max={max} step={step} type="range" />
                        <line ref="line">
                            {
                                Array(len).fill('').map((v,i)=>(
                                    <line-item style={{width: `calc((100% - ${fence}px * ${len + 1}) / ${len})`, marginLeft: `${fence}px`}}></line-item>
                                ))
                            }
                            <line-bg ref="lineBg" />
                        </line>
                        {
                            Array(len + 1).fill('').map((v,i)=>(
                                <title-item onClick={()=>this.setValue(step * (i + 2))} title={`${step * (i + 2)}X`} style={{position: 'absolute',left: `calc( 38px * ${i})`,width: '18px', top: 0,height: '100%',cursor: 'pointer' }}></title-item>
                            ))
                        }
                    </play-goup>
                </play-rate>
            </div>
        )
    }
}
class ProgressBar extends React.Component{
    onChange(ev){
        console.log('onChange--',ev.target.value);
        this.setValue(ev.target.value)
        this.props.audioSocket('play',  false);
    }
    onMouseUp(ev){
        this.props.onTimeChange && this.props.onTimeChange( ev.target.value );
        this.props.audioSocket('play', true);
    }
    setValue(val){
        console.log('setValue--1',val);
        val = +(+val).toFixed(2);
        if(isNaN(val)) return;
        const width = val + '%';
        console.log('setValue--2',val,width);
        $('.audio-progressBar').css({width});
        $(this.refs.progress_range).attr('title',val + '%').val(val);
    }
    
    componentWillMount(){
        
    }
    componentDidMount() {
        const {audio } = this.props;
        audio && audio.addEventListener('timeupdate',()=>{
            
            const width = audio.currentTime / audio.duration * 100;
            console.log('timeupdate--1',width,audio.currentTime,audio.duration  );
            if(!isNaN(width))this.setValue(width);
        })
    }
    render(){
        return(
            <div className="audio-progressBar-box">
                <input ref="progress_range" onMouseUp={ evt=>this.onMouseUp(evt)} onChange={ evt=> this.onChange(evt) } type="range" min="0" max="100" step=".1" />
                <div className="audio-progressBar"></div>
            </div>
        );
    }
}

export default class Fap extends React.Component {

    static defaultProps = {
        items       : [],
        autoHeight  : false,
        activeColor : undefined,
        autoHide    : true,
        tabAutoSel  : true,

        waves       : undefined,
    };
    static propTypes = {
        item        : PropTypes.array,   // panel props
        autoHeight  : PropTypes.bool,    // panel props
        activeColor : PropTypes.string,  // panel props
        autoHide    : PropTypes.bool,    // panel props
        tabAutoSel  : PropTypes.bool,    // panel props

        waves       : PropTypes.string,

        onOpen      : PropTypes.func,
        onClose     : PropTypes.func,
        onAction    : PropTypes.func,
    }
    constructor(){
        super();
        this.state = {
            active: '',
            count: 0,
            timeRange: 0,
        }
    }

    _btn_group = {
        voice:{
            title: '朗读页面',
            icon: 'voice',
            c: 'icon-menu-voice-18px',
            click: ()=>{
                this.setState((preState)=>({
                    ...preState,
                    active: 'voice'
                }),()=>{
                    this.audioRender();
                });
            }
        },
        print:{
            title: '打印',
            icon: 'print',
            c: 'icon-menu-Printing-18px',
            click: ()=>{
                window.print();
            }
        },/* 
        F11:{
            title: '全屏',
            icon: 'F11',
            c: 'icon-menu-Full-screen-18px',
            click: ()=>{
                document.documentElement.requestFullscreen();
            }
        }, */
        setting:{
            title: '阅读模式样式设置',
            icon: 'setting',
            c: 'icon-menu-set-18px',
            click: (event)=>{
                this.setState((preState)=>({
                    ...preState,
                    active: 'setting'
                }),()=>{
                    this.panelRender();
                });
            }
        },
        close:{
            title: '退出阅读模式',
            icon: 'close',
            c: 'icon-menu-close-18px',
            click: (event)=>{
                console.log(this.audio);
                this.audio.pause();
                this.audio = null;

                if ( this.props.onAction ) this.props.onAction( event, 'exit' );
            }
        }
    };
    style = cssinjs()

    btnClickHandler( event ) {
        const type = $( event.target ).attr( "id" );
        if ( this.props.onAction ) this.props.onAction( event, type );
    }

    btnMouseOverHandler( event ) {
        const style   = { ...this.style },
              $target = $( event.target ),
              type    = $target.attr( "type" ),
              active  = $target.attr( "active" );
        if ( type == "spec" ) {
            $target.parent().css({ ...style.spec, ...style.spec_focus });
        } else {
            this.panelRender(  );
        }
    }

    btnMouseOutHandler( event ) {
        const style   = { ...this.style },
              $target = $( event.target ),
              type    = $target.attr( "type" ),
              color   = $target.attr( "color" );
        if ( type == "spec" ) {
            $target.parent().css({ ...style.origin, ...style.large, ...style.spec_item });
        }
    }

    panelBgEventHandler( event ) {
        // todo
        if ( event.target.tagName.toLowerCase() == "panel-bg" ) {
            const $panelbg = $( this.refs.bg ),
                  style    = { ...this.style };
            if(!this.playing){
                $('.readDOM').removeClass('audioReaded');
                $('.audio-progressBar-box').removeClass('active');
            }
            
            $('sr-rd-crlbar').removeClass('unscrolling');
            ReactDOM.unmountComponentAtNode( $panelbg[0] );
            $panelbg.css({ ...style.panel_bg });
            $(this.refs[this.state.active]).removeClass('active');
            $panelbg.animate({ opacity: 0 },{
                complete: ()=> {
                    ReactDOM.unmountComponentAtNode( $panelbg[0] );
                    $panelbg.css({ ...style.panel_bg });
                }
            });
        }
    }
    audio = new Audio();
    audioUnShackeTimer = null;
    catchCount = 0;
    count = 0;
    playA = false;
    playing = false;
    audioGetText(count){
        this.playing = true;
        const {audio, catchCount, playA} = this;
        const dom = $('.readDOM')[count];
        const text = dom ? dom.innerText.trim() : '';
        if(text){
            const url = "//tts.baidu.com/text2audio?lan=zh&ie=UTF-8&text=" + encodeURI(text);
            audio.src = url;
            audio.playbackRate = storage.read.playbackRate;
            this.playA = false;
        }else{
            const type = catchCount > count ? 'pre' : 'next';
            $(dom).removeClass('readDOM');
            this.audioSwitch(type, true);
        }
    }
    async runAudio(revise){

        this.playA = revise === undefined ? !this.playA : revise;

        const {audio,count,catchCount, playA} = this;
        console.log(2, playA, count);
        if(playA){
            const distance = $('html').height() * .5;
            const dom = $('.readDOM').get(count);
            if(!dom) return;
            const offsetTop = dom.offsetTop + dom.clientHeight * .5;
            $('.simpread-scroll').scrollTop(offsetTop - distance);
            
            await setTimeout(()=>{
                
                
                audio.play().then(()=>{
                    console.log(audio.duration, audio.currentTime,count ,this.count);
                    
                    $('.readDOM').eq(count).addClass('audioReading');
                    $('.readDOM').removeClass('audioReaded');
                    $('.audio-progressBar-box').addClass('active');
                    let i = this.count;
                    for(;i >= 0;i--){
                        $('.readDOM').eq(i).addClass('audioReaded');
                    }
                }).catch(err=>{
                    const type = catchCount > count ? 'pre' : 'next';
                    console.log(321,audio.readyState, err)
                    this.audioSwitch(type);
                })
                this.catchCount = count;
            },200);
        }else{
            $('.readDOM').removeClass('audioReading');
            audio.pause();
        };
    }
    audioSwitch(type, revise){
        console.log('audioSwitch---',type);
        
        const max = $('.readDOM').length;
        let {count, audio} = this;
        // this.catchCount = count;
        if(type === 'pre'){
            count = --count >=0 ? count : 0;
        }else if(type === 'next' && !revise){
            if(++count >= max) count = max;
            console.log(audio.readyState, audio.duration,audio.networkState);
            console.log('audioSwitch--next', count, max);
        }
        
        
        $('.readDOM').removeClass('audioReading');
        audio.pause();
        
        this.count = count;
        this.playing = false;
        
        if(count === max) return;
        this.audioGetText(this.count);
        this.runAudio(revise);
    }
    audioSocket(type, revise){
        console.log('revise--',revise);
        
        switch(type){
            case 'play':
                if(!this.playing)this.audioGetText(this.count);
                this.runAudio(revise);
                break;
            default:
                this.audioSwitch(type);
                break;
        }
    }
    changeAudioRate(val){
        const {audio} = this;
        console.log('changeAudioRate--',val);
        storage.read.playbackRate = val;
        storage.Write();
        audio.playbackRate = val;
        
    }
    audioOptions = {
        min: .5,
        max: 1.75,
        step: .25,
        pointer: 1
    };
    onChangePlaying(bool){
        this.playing = bool
    }
    audioRender(){
        const $panelbg = $( this.refs.bg );
        const {audio} = this;
        if ( $panelbg.length > 0 ) {
            audio.playbackRate = storage.read.playbackRate;
            const style = { ...this.style };
            $(this.refs[this.state.active]).addClass('active');
            $panelbg.css({ ...style.panel_bg, ...{ "display": "block" , opacity: 1 }});
            $('sr-rd-crlbar').addClass('unscrolling');
            ReactDOM.render( 
                <AudioBox audio={audio} value={audio.playbackRate} desc="倍速" options={this.audioOptions} playA={this.playA} onChangePlaying={(bool)=>this.onChangePlaying(bool)} onChange={(v)=>this.changeAudioRate(v)} audioSocket={(type, revise) => this.audioSocket(type,revise)} />, $panelbg[0] );
        }
    }
    panelRender() {
        const $panelbg = $( this.refs.bg );
        if ( $panelbg.length > 0 ) {
            const style = { ...this.style };
            $(this.refs[this.state.active]).addClass('active');
            $('sr-rd-crlbar').addClass('unscrolling');
            $panelbg.css({ ...style.panel_bg, ...{ "display": "block" , opacity: 1 }});
            ReactDOM.render( 
                <Panel 
                    { ...this.props } />, $panelbg[0] );
        }
    }

    onPop( type ) {
        this.props[type] && this.props[type]();
    }
    onTimeChange(val){
        const {audio} = this;
        const newTime = audio.duration * val / 100;
        console.log('onTimeChange----',audio.duration, val,newTime);
        
        audio.currentTime = newTime;
    }
    componentDidMount(){
        const {audio} = this;
        audio.onended = () => {
            const {count} = this;
            const max = $('.readDOM').length;
            if(max >= count + 2 )this.audioSwitch('next');
            this.playing = false;
            console.log('ending');
        }
        // audio.addEventListener('timeupdate',()=>{
        //     const width = audio.currentTime / audio.duration * 100;
        //     this.setState(preState => ({
        //         ...preState,
        //         timeRange: width
        //     }))
        //     console.log(123,audio.duration, audio.currentTime)
        // });
    }
    render() {
        const evt   = this.props.autoHide ? {
            onMouseOver: (e)=> this.panelBgEventHandler(e)
        } : {
            onClick    : (e)=> this.panelBgEventHandler(e)
        };

        const panelBg  = <panel-bg ref="bg"></panel-bg>;
        const tools = Object.values(this._btn_group).map(item => {
            const imgURL = chrome.extension.getURL(`assets/images/icons/${item.icon}.png`);
            return (
                <span className={`fap-tool iconfont ${item.c}`}
                        title={item.title}
                        onClick={evt=>item.click(evt)}
                        ref={item.icon}
                        ></span>
            )
        });
        const rootStyle = {
            position: 'absolute',
            top: '10px',
            right: '10px',
        };
        return (
            <fap style={rootStyle} { ...evt } >
                <ProgressBar audio={this.audio} audioSocket={(type, revise) => this.audioSocket(type,revise)} onTimeChange={this.onTimeChange} />
                {tools}
                {panelBg}
            </fap>
        )
    }

}