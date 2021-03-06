console.log( "===== simpread option read mode load =====" )

import th             from 'theme';
import * as ss        from 'stylesheet';
import * as conf      from 'config';

import * as msg    from 'message';
import { storage } from 'storage';
import * as watch from 'watch';

import TextField      from 'textfield';
import SelectField    from 'selectfield';
import Slider         from 'slider';
import AC             from 'ac';
import Switch    from 'switch';

import ThemeSel       from 'themesel';
import Shortcuts      from 'shortcuts';
import { fontfamily } from '../service/config';

const getName = ( value, items ) => {
    for ( const item of items ) {
        if ( value == "" ) return item.name;
        else if ( item.value == value ) return item.name;
    }
};
let fontFamilies = [];

export default class ReadOpt extends React.Component {
    parse( value ) {
        const news = parseInt( value );
        return isNaN(news) ? 0 : news;
    }

    changeBgColor( theme ) {
        this.props.option.theme = theme;
        th.Change( this.props.option.theme );
        this.props.onChange && this.props.onChange( `theme_${theme}` );
        console.log( "this.props.option.theme = ", this.props.option.theme )
    }

    changeShortcuts( shortcuts ) {
        this.props.option.shortcuts = shortcuts;
        this.props.onChange && this.props.onChange( `shortcuts_${shortcuts}` );
        console.log( "this.props.option.shortcuts = ", this.props.option.shortcuts )
    }

    changeFontfamily( name, value ) {
        value.trim() == "" && ( value = "default" );
        console.log(98765,storage);
        
        fontFamilies.forEach( obj => {
            return obj.name == name && ( value = obj.value );
        })
        ss.FontFamily( value );
        this.props.option.fontfamily = value;
        this.props.onChange && this.props.onChange( `fontfamily_${value}` );
        console.log( "this.props.option.fontfamily = ", value, name )
    }

    changeFontsize( value ) {
        this.props.option.fontsize = value;
        ss.FontSize( this.props.option.fontsize );
        this.props.onChange && this.props.onChange( `fontsize_${this.props.option.fontsize}` );
        console.log( "this.props.option.fontsize = ", this.props.option.fontsize )
    }

    changeLayout( value ) {
        this.props.option.layout = value + "px";;
        ss.Layout( this.props.option.layout );
        this.props.onChange && this.props.onChange( `layout_${this.props.option.layout}` );
        console.log( "this.props.option.layout = ", this.props.option.layout )
    }

    changeStyle( value, type ) {
        let news = value
        if ( value == 0 ) {
            news = "";
        } else news = type != "lineHeight" ? value + "px" : value;
        this.props.option.custom.art[type] = news;
        ss.Custom( "art", this.props.option.custom.art );
        this.props.onChange && this.props.onChange( `custom_${this.props.option.custom.art[type]}`, type );
        console.log( "this.props.option.custom.art", this.props.option.custom.art[type] )
    }
    changeWhiteList(v){
        const {hostname} = window.location;
        const idx = this.state.whitelist.indexOf(hostname);
        if(~idx) this.state.whitelist.splice(idx,1);
        if(v) this.state.whitelist.unshift(hostname);

        this.props.onChange && this.props.onChange( `whitelist_${this.state.whitelist}` );

        console.log(v,idx,hostname,this.state.whitelist);
        /* storage.Write( ()=> {
            watch.SendMessage( "option", true );
            console.log(11,storage);
            console.log(11,this.props.option.whitelist);
            
        }); */
    }
    changePreload(v){
        storage.read.preload = v;
        storage.Write(()=>{
            console.log(storage);
            
            this.setState(pre=>({
                ...pre,
                preload: storage.read.preload
            }));
        })
    }
    
    constructor( props ) {
        super( props );
        this.state = {
            whitelist: storage.read.whitelist,
            preload: storage.read.preload
        }
    }
    componentDidMount(){
        window.addEventListener('message', (e)=>{
            console.log(e);
            if(e.data.message === msg.MESSAGE_ACTION.reload_whitelist){
                
                console.log(1,storage.read.whitelist.toString());
                storage.Read(()=>{
                    console.log(2,storage.read.whitelist.toString());
                    this.setState(pre=>({
                        ...pre,
                        whitelist: storage.read.whitelist
                    }));
                })
            }
            
        })
    }
    render() {
        const { hostname } = window.location;
        const isWhite = this.state.whitelist.includes(hostname);
        const slider_width = location.protocol.includes( "extension" ) ? "660.09px" : undefined;
        fontFamilies = ss.Fontfamily(storage.read.fontFamilies);
        return (
            <sr-opt-read>
                <sr-opt-gp>
                    <sr-opt-label>字体类型</sr-opt-label>
                    <AC value={ this.props.option.fontfamily }
                        placeholder="请输入 font-family 值"
                        items={ fontFamilies }
                        onChange={ (n,v)=>this.changeFontfamily(n,v) }
                    />
                </sr-opt-gp>
                <sr-opt-gp>
                    <sr-opt-label>字体大小</sr-opt-label>
                    <Slider min="12" max="30" icons={['icon-set-Reduce-font-20px', 'icon-set-increase-font-20px']} step="2" width={slider_width} value={ this.parse( this.props.option.fontsize == "" ? "18" : this.props.option.fontsize ) } onChange={ (v)=>this.changeFontsize(v) }/>
                </sr-opt-gp>
                <sr-opt-gp>
                    <sr-opt-label>字间距</sr-opt-label>
                    <Slider min="0" max="10" step="1" icons={['icon-set-narrow-wordspacing-20px', 'icon-set-enlarge-wordspacing-20px']} width={slider_width} value={ this.parse( this.props.option.custom.art.letterSpacing ) } onChange={ (v)=>this.changeStyle(v, "letterSpacing") }/>
                </sr-opt-gp>
                <sr-opt-gp>
                    <sr-opt-label>版面宽度</sr-opt-label>
                    <Slider min="720" max="1200" step="10" icontexts={[720, 1200]} width={slider_width} value={ this.parse( this.props.option.layout == "" ? "1000" : this.props.option.layout ) } onChange={ (v)=>this.changeLayout(v) }/>
                </sr-opt-gp>
                <sr-opt-gp>
                    <sr-opt-label>主题色</sr-opt-label>
                    <ThemeSel themes={ th.colors } names={ th.names } labels={ conf.readLabels } theme={ this.props.option.theme } changeBgColor={ val=>this.changeBgColor(val) } />
                </sr-opt-gp>
                

                <sr-opt-gp>
                    <Switch width="100%" checked={ this.state.preload }
                        thumbedColor="#fff" trackedColor="#008eff"
                        label="自动拼页"
                        onChange={ val=>this.changePreload(val) } />
                </sr-opt-gp>
                <sr-opt-gp>
                    <Switch width="100%" checked={ isWhite }
                        thumbedColor="#fff" trackedColor="#008eff"
                        label="当前网页自动开启阅读模式"
                        onChange={ val=>this.changeWhiteList(val) }
                         />
                </sr-opt-gp>
                <sr-opt-gp class="feedback">
                    <a href="https://bbs.minibai.com/" className="link" target="_blank" title="我要反馈">我要反馈 <i className="iconfont icon-pagingRight-px"></i></a>
                </sr-opt-gp>
                {/* <sr-opt-gp>
                    <Shortcuts shortcuts={ this.props.option.shortcuts } changeShortcuts={ val=>this.changeShortcuts(val) } />
                </sr-opt-gp> */}
                
                
                
                {/* <sr-opt-gp>
                    <sr-opt-label>行间距</sr-opt-label>
                    <Slider min="0" max="5" step="1" width={slider_width} value={ this.parse( this.props.option.custom.art.lineHeight ) } onChange={ (v)=>this.changeStyle(v, "lineHeight") }/>
                </sr-opt-gp>
                <sr-opt-gp>
                    <sr-opt-label>单词间距</sr-opt-label>
                    <Slider min="0" max="10" step="1" width={slider_width} value={ this.parse( this.props.option.custom.art.wordSpacing ) } onChange={ (v)=>this.changeStyle(v, "wordSpacing") }/>
                </sr-opt-gp>
                <sr-opt-gp>
                    <sr-opt-label>首行缩进</sr-opt-label>
                    <Slider min="0" max="30" step="1" width={slider_width} value={ this.parse( this.props.option.custom.art.textIndent ) } onChange={ (v)=>this.changeStyle(v, "textIndent") }/>
                </sr-opt-gp> */}
            </sr-opt-read>
        )
    }
}
