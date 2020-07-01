/*!
 * React Material Design: AutoComplete
 * 
 * @version : 0.0.1
 * @update  : 2018/04/23
 * @homepage: https://github.com/kenshin/mduikit
 * @license : MIT https://github.com/kenshin/mduikit/blob/master/LICENSE
 * @author  : Kenshin Wang <kenshin@ksria.com>
 * 
 * @copyright 2017
 */

console.log( "==== simpread component: AutoComplete ====" )

const cssinjs = () => {

    const focus_color = '#009aff',
          border_color= '#e6e6e6',
          margin      = '8px 0 0 0',
          display     = 'block',
          medium      = '14px',
          large       = '16px',
          lineHeight  = 1.5,
          fontWeight  = 'bold',
          width       = '100%',
          styles      = {
            root: {
                display,
                position: 'relative',
                margin: 0,
                padding: 0,

                width,
                lineHeight: 1,
            },

            input: {
                backgroundColor: 'transparent',

                width,
                height: '20px',

                margin,
                padding: 0,

                fontFamily: 'sans-serif',
                fontSize: medium,

                border: 'none',
                outline: 'none',

                boxShadow: 'none',
                boxSizing: 'content-box',
                transition: 'all 0.3s',
            },

            border : {
                display,

                width,
                // margin,

                borderTop: `none ${border_color}`,
                borderLeft: `none ${border_color}`,
                borderRight: `none ${border_color}`,
                borderBottom: `1px solid ${border_color}`,
                boxSizing: 'content-box',
            },

            float : {
                display,
                position: 'absolute',

                margin,

                color: 'rgb(117, 117, 117)',

                fontSize: medium,
                fontWeight: 'initial',

                userSelect: 'none',
                pointerEvents: 'none',

                transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
                transform: 'scale(1) translate( 0px, 0px )',
                transformOrigin: 'left top 0px',
            },

            float_focus : {
                color: focus_color,

                margin: `-${margin}`,

                fontSize: medium,
                fontWeight,

                transform: 'scale(0.75) translate( 0px, -8px )',
            },

            state : {
                display,
                position: 'absolute',

                width,
                // margin: '-1px 0 0 0',

                borderTop: `none ${focus_color}`,
                borderLeft: `none ${focus_color}`,
                borderRight: `none ${focus_color}`,
                borderBottom: `2px solid ${focus_color}`,
                boxSizing: 'content-box',
                bottom: '0',
                transform: 'scaleX(0)',
                transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
            },

            state_focus : {
                transform: 'scaleX(1)',
            },

            icon: {
                display: 'block',
                position: 'absolute',

                width: '24px',
                height: '24px',

                top: '1px',
                right: 0,

                border: 'none',
                cursor: 'pointer',
            },

        };

    return styles;
};

const cssinjs_list = () => {

    const styles = {
            root : {
                display: 'block',
                position: 'absolute',

                top: '44px',
                left: 0,
                fontSize: '12px',
                margin: 0,
                padding: 0,

                width: '100%',
                maxHeight: '400px',

                color: 'rgba(51, 51, 51, .87)',
                backgroundColor: 'rgba(255, 255, 255, 1)',

                boxSizing: 'border-box',
                boxShadow: '0 6px 16px 0 rgba(0,0,0,0.1)',
                border: '1px solid #d8e1e6',
                borderRadius: '3px',

                zIndex: 2100,

                overflowY: 'auto',

                opacity: 0,
                transform: 'scaleY(0)',
                transformOrigin: 'left top 0px',
                transition : 'transform 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms, opacity 1s cubic-bezier(0.23, 1, 0.32, 1) 0ms',

                overflowX: 'hidden',
            },

            open: {
                opacity: 1,
                transform: 'scaleY(1)',
            },

            list_filed: {
                display: 'flex',
                alignItems: 'center',

                padding: '8px 24px 8px 16px',

                height: '36px',
                width: '100%',

                textAlign: 'left',

                boxSizing: 'border-box',
                transition: 'all 1s cubic-bezier(0.23, 1, 0.32, 1) 0ms',

                cursor: 'pointer',
            },

            list_filed_value: {
                display: 'inline',
                width: '100%',
            },

    }

    return styles;
};

class ListView extends React.Component {

    static defaultProps = {
        waves           : "",
        items           : [],
        active          : "",
    };

    static propTypes = {
        waves           : React.PropTypes.string,
        items           : React.PropTypes.array,
        active          : React.PropTypes.string,
        onChange        : React.PropTypes.func,
    };

    style = cssinjs_list()

    onMouseOver( event ) {
        const $target = $( event.target );
        if ( $target.is( "list-field" ) ) {
            $( "list-field[active=true]" ).css( "background-color", "transparent" ).attr( "active", false );
            $target.attr( "active", true ).css( "background-color", this.props.hoverColor );
        }
    }

    onClick( event ) {
        this.props.onChange && this.props.onChange( $( event.target ).text(), $(event.target).attr("value") );
    }

    render() {
        const style = { ...this.style };
        style.root  = this.props.items.length > 0 ? { ...style.root, ...style.open } : { ...style.root };
        const list  = this.props.items.map( ( item, idx ) => {
            let name_style = { ...style.list_filed_value };
            item.value == this.props.active && ( name_style.color = this.props.activeColor );
            item.style && item.style.root   && ( style.list_filed = { ...style.list_filed, ...item.style.root });
            item.style && item.style.text   && ( name_style       = { ...name_style, ...item.style.text });
            return (
                <list-field class={ this.props.waves } style={ style.list_filed } value={ item.value } onMouseOver={ (e)=>this.onMouseOver(e) } onClick={ (e)=>this.onClick(e) }>
                    <list-field-name style={ name_style } value={ item.value }>{ item.name }</list-field-name>
                </list-field>
            )
        });

        return (
            <list-view style={ style.root }>
                { list }
            </list-view>
        )
    }
}

/**
 * Custom component: AutoComplete
 * 
    <auto-complete>
        <icon></icon>
        <text-field-float></text-field-float>
        <input/>
        <group>
            <text-field-border/>
            <text-field-state/>
        </group>
        <list-view>
            <list-field>
                <list-field-name></list-field-name>
            </list-field>
        </list-view>
    </auto-complete>
 * 
 * Reference:
 * - https://material.io/guidelines/components/text-fields.html#text-fields-layout
 * - http://materializecss.com/autocomplete.html
 * 
 * @class
 */
export default class AC extends React.Component {

    static defaultProps = {
        // input
        color       : "rgba(51, 51, 51, .87)",
        value       : "",
        placeholder : "",
        floating    : undefined,
        // dropdown
        items       : [],
        activeColor : "#009bf1",
        hoverColor  : "#f0f0f0",
        borderColor : undefined,
        focusColor  : undefined,
        fontSize: '12px',
        tooltip     : {},
    };

    static propTypes = {
        // input
        color       : React.PropTypes.string,
        value       : React.PropTypes.string,
        placeholder : React.PropTypes.string,
        floating    : React.PropTypes.string,
        items       : React.PropTypes.array,
        // dropdown
        activeColor : React.PropTypes.string,
        hoverColor  : React.PropTypes.string,
        borderColor : undefined,
        focusColor  : undefined,

        tooltip     : React.PropTypes.object,
        // event
        onChange    : React.PropTypes.func,
    }

    style = cssinjs()

    state = {
        name  : "",
        items : [],
        title : this.getActiveTitle(this.props.value),
        icon_ : 'icon-down-px',
    }
    getActiveTitle(key){
        return this.props.items.find(item => {
            return item.value === key;
        }).name || '';
    }
    // usage hack code, not usage react
    onTextKeyDown( event ) {
        const $target = $( "list-view" );
        if ( $target.children().length == 0 && event.keyCode == 40 ) {
            this.setState({ name : this.refs.input.value, items: this.props.items });
            this.refs.dropdown.dataset.state = "open";
            return;
        }
        const $sub = $target.find( "list-field[active=true]" );
        if ( event.keyCode == 9 || event.keyCode == 27 ) {
            this.refs.dropdown.dataset.state = "close";
            this.setState({ name : "", items: [] });
        }
        else if ( event.keyCode == 40 ) {
            if ( $sub.length == 0 ) {
                $target.children().first().attr( "active", true ).css( "background-color", this.props.hoverColor );
            } else {
                $sub.css( "background-color", "transparent" ).attr( "active", false );
                $sub.next().attr( "active", true ).css( "background-color", this.props.hoverColor );
            }
        } else if ( event.keyCode == 38 ) {
            if ( $sub.length == 0 ) {
                $target.children().last().attr( "active", true ).css( "background-color", this.props.hoverColor );
            } else {
                $sub.css( "background-color", "transparent" ).attr( "active", false );
                $sub.prev().attr( "active", true ).css( "background-color", this.props.hoverColor );
            }
        } else if ( event.keyCode == 13 ) {
            this.onDropdownChange( $sub.text(), $sub.attr("value") );
        }
    }

    onTextChangeFocus( event ) {
        const style   = { ...this.style },
              $target = $( this.refs.dropdown ),
              $state  = $target.next().find( "text-field-state" ),
              $float  = $target.prev();
        $state.css({ ...style.state, ...style.state_focus });
        // this.props.floating != "" && $float.css({ ...style.float, ...style.float_focus });
    }

    onTextChangeBlur( event ) {
        const style   = { ...this.style },
              $target = $( this.refs.dropdown ),
              $state  = $target.next().find( "text-field-state" ),
              $float  = $target.prev();
        $state.css({ ...style.state });
        // if ( this.props.floating != "" && event.target.value == "" ) $float.css({ ...style.float });
    }

    onTextChange( event ) {
        if ( event.target.value == "" ) {
            this.setState({ name : "", items: [] });
            this.refs.dropdown.dataset.state = "close";
        } else {
            this.setState({name : event.target.value, items: this.filter( event.target.value ) });
            this.refs.dropdown.dataset.state = "open";
        }
        this.props.onChange && this.props.onChange( name, event.target.value );
    }

    onDropdownClick( event ) {
        if ( event.target.dataset.state == "close" ) {

            this.onTextChangeFocus(event);

            this.setState({ name : this.state.name, items: this.props.items });
            event.target.dataset.state = "open";
        } else {
            this.onTextChangeBlur(event);

            this.setState({ name : "", items: [] });
            event.target.dataset.state = "close";
        }
    }

    onDropdownChange( name, value ) {
        // this.refs.input.value = value == undefined ? "" : value;
        this.onTextChangeBlur();
        this.setState({ ...this.state, title : this.getActiveTitle(value) });
        this.refs.dropdown.dataset.state = "close";
        this.setState({ name : "", items: [] });
        this.props.onChange && this.props.onChange( name, value );
    }

    filter( value ) {
        return this.props.items.filter( obj => {
            return obj.name.includes( value );
        });
    }

    componentDidMount() {
        // this.refs.input.value = this.props.value;
    }

    render() {
        const style       = { ...this.style };
        style.input.color = this.props.color;
        style.float       = this.props.placeholder == "" && this.props.value == "" ? style.float : { ...style.float, ...style.float_focus };
        if ( this.props.borderColor ) {
            style.border.borderTop    = `none ${this.props.borderColor}`;
            style.border.borderLeft   = `none ${this.props.borderColor}`;
            style.border.borderRight  = `none ${this.props.borderColor}`;
            style.border.borderBottom = `1px solid ${this.props.borderColor}`;
        }
        if ( this.props.focusColor ) {
            style.float_focus.color  = this.props.focusColor;
            style.state.borderTop    = `none ${this.props.focusColor}`;
            style.state.borderLeft   = `none ${this.props.focusColor}`;
            style.state.borderRight  = `none ${this.props.focusColor}`;
            style.state.borderBottom = `2px solid ${this.props.focusColor}`;
        }

        const props = {
            placeholder :this.props.placeholder,
            onFocus  : (e)=>this.onTextChangeFocus(e),
            onBlur   : (e)=>this.onTextChangeBlur(e),
            onChange : (e)=>this.onTextChange(e),
            onKeyDown: (e)=>this.onTextKeyDown(e),
        },
        tooltip = this.props.tooltip,
        titleStyle = {
            height: '40px',
            lineHeight: '40px',
            textAlign: 'center',
            fontSize: '14px',
            color: '#222',
        };
        console.log(321,this.props);
        
        return (
            <auto-complete style={ style.root }
                data-tooltip={ tooltip.text ? tooltip.text : this.props[ tooltip.target ] } data-tooltip-position={ tooltip.position } data-tooltip-delay={ tooltip.delay }>
                
                {/* <text-field-float style={ style.float }>{this.props.floating}</text-field-float> */}
                {/* <input ref="input" style={ style.input } {...props} /> */}
                <p ref="dropdown" style={titleStyle} data-state="close" onClick={evt=>this.onDropdownClick(evt)}>
                    {this.state.title}
                </p>
                <ac-group>
                    <text-field-border style={ style.border }/>
                    <text-field-state style={ style.state }/>
                </ac-group>
                <icon className={`iconfont ${}`} style={ style.icon }></icon>
                <ListView waves={ this.props.waves } onChange={ (n,v)=>this.onDropdownChange(n,v) }
                    activeColor={ this.props.activeColor } hoverColor={ this.props.hoverColor }
                    active={ this.state.name } items={ this.state.items } />
            </auto-complete>
        )
    }

}
