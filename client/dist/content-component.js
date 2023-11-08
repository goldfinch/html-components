const u=t=>t.toString().slice(1,-1),E=u(/((?:[,\s]+(?:[a-z0-9\-_]+)=(?:(?:[a-z0-9\-_]+)|(?:\d+\.\d+)|(?:'[^']*')|(?:"[^"]*")))*)/),f=/[,\s]+([a-z0-9\-_]+)=(?:([a-z0-9\-_]+)|(\d+\.\d+)|(?:'([^']*)')|(?:"([^"]*)"))/,k=u(/\[%s/),w="\\]",T=u(/\[\s*\/\s*%s\s*]/),_=u(/((?:.|\n|)*?)/),S=u(/\s*/),y={match(t,s,c){let l=`${i18n.sprintf(k,t)}${E}${S}${w}`;s&&(l=`${l}${_}${i18n.sprintf(T,t)}`);const d=new RegExp(l,"i").exec(c);if(!d)return null;const h=this.parseProperties(d[1]);return{name:t,wrapped:s,properties:h,original:d[0],content:s?d[2]:null}},parseProperties(t){let s=t;const c={};let a=s.match(f);for(;a;){const l=a[1]||"",i=a[2]||a[3]||a[4]||a[5]||"";l&&(c[l]=i);const d=s.indexOf(a[0]);s=s.substr(d+a[0].length),a=s.match(f)}return c},serialise(t,s=!1){const c=s?{sep:",",quote:"",replacer:/[^a-z0-9\-_.]/gi}:{sep:" ",quote:'"',replacer:/"/g},a=Object.entries(t.properties).map(([l,i])=>i?`${c.sep}${l}=${c.quote}${`${i}`.replace(c.replacer,"")}${c.quote}`:null).filter(l=>l!==null).join("");return t.wrapped?`[${t.name}${a}]${t.content}[/${t.name}]`:`[${t.name}${a}]`}},D=()=>{const t=document.createElement("div");return s=>s===void 0?"":(t.textContent=s,t.innerHTML)},R=t=>{const s=D();return Object.entries(t).reduce((c,[a,l])=>({...c,[a]:s(l)}),{})},C=async function(t,s){const c=await fetch(t,{method:"POST",headers:{"X-CSRF-TOKEN":window.ss.config.SecurityID},body:s});if(!c.ok)throw new Error("Fetch request failed");return c.json()};tinymce.PluginManager.add("htmlcomponents",(t,s)=>{var c,a,l;t.addCommand("cc-delete",()=>{const e=t.selection.getNode();t.dom.is(e,b)?e.remove():t.dom.is(e.parentNode,b)?e.parentNode.remove():console.error({error:"Unexpected selection - expected embed",selectedNode:e})});const i={title:"Content Components",body:{type:"panel",items:[{type:"htmlpanel",html:"<p>Please, select type of component you would like to add</p><p></p>"},{type:"listbox",name:"component",label:"Component",enabled:!1,items:[{text:"-",value:"-"}]}]},initialData:{},buttons:[{type:"custom",name:"action_next",text:"Next",enabled:!1}],onChange:(e,n)=>{const r=e.getData();e.setEnabled("action_next",r.component)},onAction:async(e,n)=>{n.name==="action_next"&&(e.block("Loading"),g(e))}},d={title:"Content Components",body:{type:"panel",items:[{type:"htmlpanel",html:"<p>Now, select the actual component you would like to be used</p><p></p>"},{type:"listbox",name:"component",label:"Component",enabled:!1,items:[{text:"-",value:"-"}]}]},buttons:[{type:"custom",name:"action_back",text:"Back",enabled:!0},{type:"custom",name:"action_insert",text:"Insert",enabled:!1}],initialData:{},onChange:(e,n)=>{const r=e.getData();e.setEnabled("action_insert",r.component)},onAction:async(e,n)=>{if(n.name==="action_back")e.block("Loading"),h(e);else if(n.name==="action_insert"){const m=e.getData();var r=Object.keys(a).find(p=>a[p].value===c),o=Object.keys(l).find(p=>l[p].value===m.component);tinymce.activeEditor.execCommand("mceInsertContent",!1,`[htmlcomponentblock class="gf-component" data-class="${c}" data-id="${m.component}" data-bn="${a[r].text}" data-n="${l[o].text}"].[/htmlcomponentblock]`),e.close()}}},h=async e=>{const n=new FormData;n.append("name",t.targetElm.getAttribute("name")),n.append("class",t.targetElm.getAttribute("data-based-on-class"));try{const o=await C("/api-html-components/component/types",n);var r=i;r.body.items[1].enabled=!0,r.body.items[1].items=o,a=o,e.redial(r),e.unblock()}catch{}},g=async e=>{c=e.getData().component;const n=new FormData;n.append("name",t.targetElm.getAttribute("name")),n.append("class",t.targetElm.getAttribute("data-based-on-class")),n.append("component",c);try{const o=await C("/api-html-components/component/objects",n);l=o;var r=d;r.body.items[1].enabled=!0,r.body.items[1].items=o,e.unblock(),e.redial(r)}catch{}};t.ui.registry.addButton("htmlcomponents",{icon:"sharpen",onAction:async()=>{var e=t.windowManager.open(i);return e.block("Loading"),h(e),e}});const b='div[data-shortcode="htmlcomponentblock"]';return t.ui.registry.addButton("ccdelete",{tooltip:"Delete content block",icon:"remove",onAction:()=>t.execCommand("cc-delete")}),t.ui.registry.addContextToolbar("htmlcomponents",{predicate:e=>t.dom.is(e,b),position:"node",scope:"node",items:"ccdelete"}),t.on("GetContent",e=>{const n=jQuery(`<div>${e.content}</div>`);n.find(b).each(function(){const o=jQuery(this),m=o.data("id"),p=o.data("class"),x=o.data("n"),O=o.data("bn"),$=R({"data-id":m,"data-class":p,"data-n":x,"data-bn":O,class:o.prop("class")}),v=y.serialise({name:"htmlcomponentblock",properties:$,wrapped:!0,content:""});o.replaceWith(v)}),e.content=n.html()}),t.on("BeforeSetContent",e=>{let n=e.content,r=y.match("htmlcomponentblock",!0,n);for(;r;){const o=r.properties,m=jQuery("<div/>").attr("data-id",o["data-id"]).attr("data-class",o["data-class"]).attr("data-n",o["data-n"]).attr("data-bn",o["data-bn"]).attr("data-shortcode","htmlcomponentblock").addClass(o.class);m.html('<img src="/_resources/vendor/goldfinch/html-components/client/dist/images/component.svg" width="">'),n=n.replace(r.original,jQuery("<div/>").append(m).html()),r=y.match("htmlcomponentblock",!0,n)}e.content=n}),{getMetadata:()=>({name:"Goldfinch Components",url:"https://github.com/goldfinch/html-components"})}});
