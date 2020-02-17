!function(e){function t(a){if(n[a])return n[a].exports;var l=n[a]={i:a,l:!1,exports:{}};return e[a].call(l.exports,l,l.exports,t),l.l=!0,l.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,a){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:a})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=2)}([function(e,t){},function(e,t){},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});n(3),n(4),n(5),n(6)},function(e,t,n){"use strict";function a(e,t){if("size"==e){var n=["width","height"];_.each(n,function(e){var n={};n[e]="",t(n)})}else if("zIndex"==e){var a={};a[e]=0,t(a)}}var l=n(0),r=(n.n(l),n(1)),__=(n.n(r),wp.i18n.__),i=wp.blocks.registerBlockType,m=["rri/vertical-tab-single","rri/vertical-tab-video"],c=wp.blockEditor,s=c.InnerBlocks,o=c.InspectorControls,p=c.BlockControls,u=(wp.compose.withState,wp.components),d=u.PanelBody,b=u.PanelRow,g=u.TextControl,w=u.SelectControl,v=u.RangeControl,E=u.Toolbar,f=u.Button,h={isCollapsed:{type:"boolean",default:!1},width:{type:"number",default:100},width_type:{type:"string",default:"%"},height:{type:"number",default:500},height_type:{type:"string",default:"px"},marginTop:{type:"number",default:0},marginRight:{type:"number",default:0},marginBottom:{type:"number",default:0},marginLeft:{type:"number",default:0},paddingTop:{type:"number",default:0},paddingRight:{type:"number",default:0},paddingBottom:{type:"number",default:0},paddingLeft:{type:"number",default:0},zIndex:{type:"number",default:0},element_style:{type:"string",default:null}};i("rri/vertical-tabs",{title:__("Vertical tabs"),icon:"list-view",category:"rri_blocks",keywords:[__("Vertical tabs"),__("section")],attributes:h,supports:{align:["full","wide"],reusable:!0,anchor:!0},edit:function(e){var t=y(e.attributes,e.setAttributes);return[k(e.attributes,e.setAttributes),N(e.attributes,e.setAttributes),wp.element.createElement(p,null,wp.element.createElement(E,{controls:["collapse"].map(function(){return{icon:"arrow-down-alt2",title:"Collapse block",isActive:!0===e.attributes.isCollapsed,onClick:function(){return!0===e.attributes.isCollapsed?e.setAttributes({isCollapsed:!1}):e.setAttributes({isCollapsed:!0})}}})})),wp.element.createElement("div",{className:(e.className,"rri-vertical-tabs-editable"),style:t},wp.element.createElement("div",{className:!0===e.attributes.isCollapsed?"collapsed":""},wp.element.createElement("div",{className:"rri-block-title"},"Vertical tabs block"),wp.element.createElement("div",{className:"rri-vertical-tabs-inner"},wp.element.createElement("div",{className:"rri-tabs-panels",style:{height:e.attributes.height+e.attributes.height_type}},wp.element.createElement(s,{allowedBlocks:m})))))]},save:function(e){return wp.element.createElement(s.Content,null)},deprecated:[{attributes:h,save:function(e){return wp.element.createElement("div",{className:(e.className,"rri-vertical-tabs")},wp.element.createElement("div",{className:"rri-vertical-tabs-inner"},wp.element.createElement("div",{className:"rri-tabs-panels"},wp.element.createElement(s.Content,null))))}}]});var y=function(e,t){var n={},a="";return _.each(e,function(t,l){if(null!=t&&""!=t)switch(l){case"width":n.width=t+e.width_type,a+="width: "+t+e.width_type+"; ";break;case"marginTop":a+="margin-top: "+t+"px; ",n[l]=t+"px";break;case"marginBottom":a+="margin-bottom: "+t+"px; ",n[l]=t+"px";break;case"marginLeft":a+="margin-left: "+t+"px; ",n[l]=t+"px";break;case"marginRight":a+="margin-right: "+t+"px; ",n[l]=t+"px";break;case"paddingTop":a+="padding-top: "+t+"px; ",n[l]=t+"px";break;case"paddingBottom":a+="padding-bottom: "+t+"px; ",n[l]=t+"px";break;case"paddingLeft":a+="padding-left: "+t+"px; ",n[l]=t+"px";break;case"paddingRight":a+="padding-right: "+t+"px; ",n[l]=t+"px";break;case"zIndex":a+="z-index: "+t+"; ",n[l]=t}}),t({element_style:a}),n},k=function(e,t){return wp.element.createElement(o,null,wp.element.createElement(d,{title:"Size",initialOpen:!1,className:"rri-settings-size"},wp.element.createElement(b,null,wp.element.createElement("div",{className:"size-selector"},wp.element.createElement("label",null,"Width"),wp.element.createElement(g,{label:"",type:"number",value:e.width,onChange:function(e){return t({width:Number(e)})}}),wp.element.createElement(w,{label:"",value:e.width_type,options:[{label:__("px","rri"),value:"px"},{label:__("%","rri"),value:"%"}],onChange:function(e){return t({width_type:e})}}))),wp.element.createElement(b,null,wp.element.createElement("div",{className:"size-selector"},wp.element.createElement("label",null,"Height"),wp.element.createElement(g,{label:"",type:"number",value:e.height,onChange:function(e){return t({height:Number(e)})}}),wp.element.createElement(w,{label:"",value:e.height_type,options:[{label:__("px","rri"),value:"px"},{label:__("%","rri"),value:"%"}],onChange:function(e){return t({height_type:e})}}))),wp.element.createElement(f,{isSmall:!0,onClick:function(){a("size",t)}},"Reset")))},N=function(e,t){return wp.element.createElement(o,null,wp.element.createElement(d,{title:"Spacing",initialOpen:!1,className:"rri-settings-spacing"},wp.element.createElement("h2",null,"Margin (px)"),wp.element.createElement(b,null,wp.element.createElement(v,{label:wp.element.createElement("img",{src:x("Top.svg")}),value:e.marginTop,min:-200,max:200,allowReset:!0,onChange:function(e){return t({marginTop:e})}})),wp.element.createElement(b,null,wp.element.createElement(v,{label:wp.element.createElement("img",{src:x("Right.svg")}),value:e.marginRight,min:-200,max:200,allowReset:!0,onChange:function(e){return t({marginRight:e})}})),wp.element.createElement(b,null,wp.element.createElement(v,{label:wp.element.createElement("img",{src:x("Bottom.svg")}),value:e.marginBottom,min:-200,max:200,allowReset:!0,onChange:function(e){return t({marginBottom:e})}})),wp.element.createElement(b,null,wp.element.createElement(v,{label:wp.element.createElement("img",{src:x("Left.svg")}),value:e.marginLeft,min:-200,max:200,allowReset:!0,onChange:function(e){return t({marginLeft:e})}})),wp.element.createElement("h2",null,"Padding (px)"),wp.element.createElement(b,null,wp.element.createElement(v,{label:wp.element.createElement("img",{src:x("Top.svg")}),value:e.paddingTop,min:-200,max:200,allowReset:!0,onChange:function(e){return t({paddingTop:e})}})),wp.element.createElement(b,null,wp.element.createElement(v,{label:wp.element.createElement("img",{src:x("Right.svg")}),value:e.paddingRight,min:-200,max:200,allowReset:!0,onChange:function(e){return t({paddingRight:e})}})),wp.element.createElement(b,null,wp.element.createElement(v,{label:wp.element.createElement("img",{src:x("Bottom.svg")}),value:e.paddingBottom,min:-200,max:200,allowReset:!0,onChange:function(e){return t({paddingBottom:e})}})),wp.element.createElement(b,null,wp.element.createElement(v,{label:wp.element.createElement("img",{src:x("Left.svg")}),value:e.paddingLeft,min:-200,max:200,allowReset:!0,onChange:function(e){return t({paddingLeft:e})}})),wp.element.createElement("h2",null,"Z-index"),wp.element.createElement(b,null,wp.element.createElement(g,{label:"",value:e.zIndex,min:0,max:1e4,allowReset:!0,onChange:function(e){return t({zIndex:e})}}),wp.element.createElement(f,{isSmall:!0,onClick:function(){a("zIndex",t)}},"Reset"))))},x=function(e){return rri.pluginDirPath+"dist/images/"+e}},function(e,t,n){"use strict";var a=n(0),l=(n.n(a),n(1)),__=(n.n(l),wp.i18n.__),r=wp.blocks.registerBlockType,i=["core/heading","core/paragraph","core/button"],m=wp.blockEditor,c=m.InnerBlocks,s=m.InspectorControls,o=m.MediaUpload,p=m.MediaUploadCheck,u=(wp.compose.withInstanceId,wp.element.Fragment),d=wp.components,b=d.PanelBody,g=d.PanelRow,w=d.TextControl,v=d.Button,E=d.Dashicon;r("rri/vertical-tab-single",{title:__("Single image tab"),icon:"excerpt-view",category:"rri_blocks",keywords:[__("single tab"),__("section")],attributes:{tabID:{type:"string",default:""},tabName:{type:"string",default:"Tab title"},background_color:{type:"string",default:""},background_image:{type:"object",default:{}}},supports:{align:!1,reusable:!1,anchor:!1},parent:["rri/vertical-tabs"],edit:function(e){return e.setAttributes({tabID:e.clientId}),[wp.element.createElement(u,null,wp.element.createElement(s,null,wp.element.createElement(b,{title:"Tab Settings",initialOpen:!0},wp.element.createElement(g,null,wp.element.createElement(w,{label:"Tab title",value:e.attributes.tabName,onChange:function(t){return e.setAttributes({tabName:t})}})),wp.element.createElement(g,null,wp.element.createElement(p,null,wp.element.createElement(o,{title:"Background Image",allowedTypes:["image"],value:e.attributes.background_image,onSelect:function(t){return e.setAttributes({background_image:t})},render:function(t){var n=t.open;return f(n,e)}})))))),wp.element.createElement("div",{className:(e.className,"rri-tabs-pane"),role:"tabpanel",id:"tab-"+e.attributes.tabID},wp.element.createElement("div",{className:"rri-tabs-media"},h(e.attributes)),wp.element.createElement("div",{className:"rri-tabs-content"},wp.element.createElement("div",{className:"rri-block-title"},"Single tab with image"),wp.element.createElement(c,{allowedBlocks:i,renderAppender:function(){return wp.element.createElement(c.ButtonBlockAppender,null)}})))]},save:function(e){return wp.element.createElement("div",{className:"rri-tabs-pane",role:"tabpanel",id:"tab-"+e.attributes.tabID,"data-name":e.attributes.tabName},wp.element.createElement("div",{className:"rri-tabs-media"},h(e.attributes)),wp.element.createElement("div",{className:"rri-tabs-content"},wp.element.createElement(c.Content,null)))}});var f=function(e,t){return null!=t.attributes.background_image.id?wp.element.createElement("div",{className:"background-image-preview"},wp.element.createElement("h2",null,"Background Image"),wp.element.createElement("div",{className:"image"},wp.element.createElement("img",{src:t.attributes.background_image.url}),wp.element.createElement("div",{className:"image-controls"},wp.element.createElement(v,{onClick:e},wp.element.createElement(E,{icon:"edit"})),wp.element.createElement(v,{onClick:function(e){return t.setAttributes({background_image:{}})}},wp.element.createElement(E,{icon:"no-alt"}))))):wp.element.createElement("div",{className:"background-image-preview"},wp.element.createElement("h2",null,"Background Image"),wp.element.createElement(v,{onClick:e,className:"editor-post-featured-image__toggle"},__("Open Media Library","rri")))},h=function(e){if(null!=e.background_image.id)return wp.element.createElement("figure",{className:"media-image"},wp.element.createElement("img",{src:e.background_image.url,alt:"Preview image"}))}},function(e,t,n){"use strict";var a=n(0),l=(n.n(a),n(1)),__=(n.n(l),wp.i18n.__),r=wp.blocks.registerBlockType,i=wp.blockEditor,m=(i.InnerBlocks,i.InspectorControls),c=(i.MediaUpload,i.MediaUploadCheck,wp.compose.withState,wp.element.Fragment,wp.components),s=c.PanelBody,o=c.PanelRow,p=c.TextControl;c.Button,c.Dashicon,c.RangeControl;r("rri/vertical-tab-video",{title:__("Single video tab"),icon:"format-video",category:"rri_blocks",keywords:[__("single tab"),__("section"),__("video")],attributes:{tabID:{type:"string",default:""},tabName:{type:"string",default:"Tab title"},videoURL:{type:"string",default:""}},supports:{align:!1,reusable:!1,anchor:!1},parent:["rri/vertical-tabs"],edit:function(e){return e.setAttributes({tabID:e.clientId}),[wp.element.createElement(m,null,wp.element.createElement(s,{title:"Tab Settings",initialOpen:!0},wp.element.createElement(o,null,wp.element.createElement(p,{label:"Tab title",value:e.attributes.tabName,onChange:function(t){return e.setAttributes({tabName:t})}})),wp.element.createElement(o,null,wp.element.createElement(p,{label:"Video URL",value:e.attributes.videoURL,onChange:function(t){return e.setAttributes({videoURL:t})}})))),wp.element.createElement("div",{className:(e.className,"rri-tabs-pane"),role:"tabpanel",id:"tab-"+e.attributes.tabID},wp.element.createElement("div",{className:"rri-tabs-media"},u(e.attributes)),wp.element.createElement("div",{className:"rri-tabs-content"},wp.element.createElement("div",{className:"rri-block-title"},"Single tab with video")))]},save:function(e){return wp.element.createElement("div",{className:"rri-tabs-pane",role:"tabpanel",id:"tab-"+e.attributes.tabID,"data-name":e.attributes.tabName},wp.element.createElement("div",{className:"rri-tabs-media"},u(e.attributes)))}});var u=function(e){if(null!=e.videoURL&&""!=e.videoURL)return wp.element.createElement("div",{className:"media-video"},wp.element.createElement("iframe",{width:"100%",height:"100%",src:e.videoURL,frameborder:"0",allow:"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",allowfullscreen:!0}))}},function(e,t,n){"use strict";var a=n(0),l=(n.n(a),n(1)),__=(n.n(l),wp.i18n.__),r=wp.blocks.registerBlockType,i=wp.blockEditor,m=(i.InnerBlocks,i.InspectorControls),c=(wp.compose.withState,wp.element.Fragment,wp.components),s=c.PanelBody,o=c.PanelRow,p=c.TextControl,u=c.TextareaControl;r("rri/vertical-tab-map",{title:__("Single map tab"),icon:"admin-site",category:"rri_blocks",keywords:[__("single tab"),__("section"),__("video")],attributes:{tabID:{type:"string",default:""},tabName:{type:"string",default:"Tab title"},embedMap:{type:"string",default:""}},supports:{align:!1,reusable:!1,anchor:!1},parent:["rri/vertical-tabs"],edit:function(e){return e.setAttributes({tabID:e.clientId}),[wp.element.createElement(m,null,wp.element.createElement(s,{title:"Tab Settings",initialOpen:!0},wp.element.createElement(o,null,wp.element.createElement(p,{label:"Tab title",value:e.attributes.tabName,onChange:function(t){return e.setAttributes({tabName:t})}})),wp.element.createElement(o,null,wp.element.createElement(u,{label:"Embed Map",value:e.attributes.embedMap,onChange:function(t){return e.setAttributes({embedMap:t})}})))),wp.element.createElement("div",{className:(e.className,"rri-tabs-pane"),role:"tabpanel",id:"tab-"+e.attributes.tabID},wp.element.createElement("div",{className:"rri-tabs-media"},d(e.attributes)),wp.element.createElement("div",{className:"rri-tabs-content"},wp.element.createElement("div",{className:"rri-block-title"},"Single tab with map")))]},save:function(e){return wp.element.createElement("div",{className:"rri-tabs-pane",role:"tabpanel",id:"tab-"+e.attributes.tabID,"data-name":e.attributes.tabName},wp.element.createElement("div",{className:"rri-tabs-media"},d(e.attributes)))}});var d=function(e){if(null!=e.embedMap&&""!=e.embedMap)return wp.element.createElement("div",{className:"media-video",dangerouslySetInnerHTML:{__html:e.embedMap}})}}]);