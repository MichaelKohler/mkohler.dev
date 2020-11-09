(function(){var e={newline:/^\n+/,code:/^( {4}[^\n]+\n*)+/,fences:h,hr:/^( *[-*_]){3,} *(?:\n+|$)/,heading:/^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,nptable:h,lheading:/^([^\n]+)\n *(=|-){3,} *\n*/,blockquote:/^( *>[^\n]+(\n[^\n]+)*\n*)+/,list:/^( *)(bull) [\s\S]+?(?:hr|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,html:/^ *(?:comment|closed|closing) *(?:\n{2,}|\s*$)/,def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,table:h,paragraph:/^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,text:/^[^\n]+/};function t(t){this.tokens=[],this.tokens.links={},this.options=t||a.defaults,this.rules=e.normal,this.options.gfm&&(this.options.tables?this.rules=e.tables:this.rules=e.gfm)}e.bullet=/(?:[*+-]|\d+\.)/,e.item=/^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/,e.item=r(e.item,"gm")(/bull/g,e.bullet)(),e.list=r(e.list)(/bull/g,e.bullet)("hr",/\n+(?=(?: *[-*_]){3,} *(?:\n+|$))/)(),e._tag="(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|@)\\b",e.html=r(e.html)("comment",/\x3c!--[\s\S]*?--\x3e/)("closed",/<(tag)[\s\S]+?<\/\1>/)("closing",/<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g,e._tag)(),e.paragraph=r(e.paragraph)("hr",e.hr)("heading",e.heading)("lheading",e.lheading)("blockquote",e.blockquote)("tag","<"+e._tag)("def",e.def)(),e.normal=o({},e),e.gfm=o({},e.normal,{fences:/^ *(`{3,}|~{3,}) *(\S+)? *\n([\s\S]+?)\s*\1 *(?:\n+|$)/,paragraph:/^/}),e.gfm.paragraph=r(e.paragraph)("(?!","(?!"+e.gfm.fences.source.replace("\\1","\\2")+"|")(),e.tables=o({},e.gfm,{nptable:/^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,table:/^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/}),t.rules=e,t.lex=function(e,s){return new t(s).lex(e)},t.prototype.lex=function(e){return e=e.replace(/\r\n|\r/g,"\n").replace(/\t/g,"    ").replace(/\u00a0/g," ").replace(/\u2424/g,"\n"),this.token(e,!0)},t.prototype.token=function(t,s){var n,i,l,r,h,o,a,u,p;for(t=t.replace(/^ +$/gm,"");t;)if((l=this.rules.newline.exec(t))&&(t=t.substring(l[0].length),l[0].length>1&&this.tokens.push({type:"space"})),l=this.rules.code.exec(t))t=t.substring(l[0].length),l=l[0].replace(/^ {4}/gm,""),this.tokens.push({type:"code",text:this.options.pedantic?l:l.replace(/\n+$/,"")});else if(l=this.rules.fences.exec(t))t=t.substring(l[0].length),this.tokens.push({type:"code",lang:l[2],text:l[3]});else if(l=this.rules.heading.exec(t))t=t.substring(l[0].length),this.tokens.push({type:"heading",depth:l[1].length,text:l[2]});else if(s&&(l=this.rules.nptable.exec(t))){for(t=t.substring(l[0].length),o={type:"table",header:l[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:l[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:l[3].replace(/\n$/,"").split("\n")},u=0;u<o.align.length;u++)/^ *-+: *$/.test(o.align[u])?o.align[u]="right":/^ *:-+: *$/.test(o.align[u])?o.align[u]="center":/^ *:-+ *$/.test(o.align[u])?o.align[u]="left":o.align[u]=null;for(u=0;u<o.cells.length;u++)o.cells[u]=o.cells[u].split(/ *\| */);this.tokens.push(o)}else if(l=this.rules.lheading.exec(t))t=t.substring(l[0].length),this.tokens.push({type:"heading",depth:"="===l[2]?1:2,text:l[1]});else if(l=this.rules.hr.exec(t))t=t.substring(l[0].length),this.tokens.push({type:"hr"});else if(l=this.rules.blockquote.exec(t))t=t.substring(l[0].length),this.tokens.push({type:"blockquote_start"}),l=l[0].replace(/^ *> ?/gm,""),this.token(l,s),this.tokens.push({type:"blockquote_end"});else if(l=this.rules.list.exec(t)){for(t=t.substring(l[0].length),r=l[2],this.tokens.push({type:"list_start",ordered:r.length>1}),n=!1,p=(l=l[0].match(this.rules.item)).length,u=0;u<p;u++)a=(o=l[u]).length,~(o=o.replace(/^ *([*+-]|\d+\.) +/,"")).indexOf("\n ")&&(a-=o.length,o=this.options.pedantic?o.replace(/^ {1,4}/gm,""):o.replace(new RegExp("^ {1,"+a+"}","gm"),"")),this.options.smartLists&&u!==p-1&&(r===(h=e.bullet.exec(l[u+1])[0])||r.length>1&&h.length>1||(t=l.slice(u+1).join("\n")+t,u=p-1)),i=n||/\n\n(?!\s*$)/.test(o),u!==p-1&&(n="\n"===o[o.length-1],i||(i=n)),this.tokens.push({type:i?"loose_item_start":"list_item_start"}),this.token(o,!1),this.tokens.push({type:"list_item_end"});this.tokens.push({type:"list_end"})}else if(l=this.rules.html.exec(t))t=t.substring(l[0].length),this.tokens.push({type:this.options.sanitize?"paragraph":"html",pre:"pre"===l[1]||"script"===l[1],text:l[0]});else if(s&&(l=this.rules.def.exec(t)))t=t.substring(l[0].length),this.tokens.links[l[1].toLowerCase()]={href:l[2],title:l[3]};else if(s&&(l=this.rules.table.exec(t))){for(t=t.substring(l[0].length),o={type:"table",header:l[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:l[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:l[3].replace(/(?: *\| *)?\n$/,"").split("\n")},u=0;u<o.align.length;u++)/^ *-+: *$/.test(o.align[u])?o.align[u]="right":/^ *:-+: *$/.test(o.align[u])?o.align[u]="center":/^ *:-+ *$/.test(o.align[u])?o.align[u]="left":o.align[u]=null;for(u=0;u<o.cells.length;u++)o.cells[u]=o.cells[u].replace(/^ *\| *| *\| *$/g,"").split(/ *\| */);this.tokens.push(o)}else if(s&&(l=this.rules.paragraph.exec(t)))t=t.substring(l[0].length),this.tokens.push({type:"paragraph",text:"\n"===l[1][l[1].length-1]?l[1].slice(0,-1):l[1]});else if(l=this.rules.text.exec(t))t=t.substring(l[0].length),this.tokens.push({type:"text",text:l[0]});else if(t)throw new Error("Infinite loop on byte: "+t.charCodeAt(0));return this.tokens};var s={escape:/^\\([\\`*{}\[\]()#+\-.!_>])/,autolink:/^<([^ >]+(@|:\/)[^ >]+)>/,url:h,tag:/^\x3c!--[\s\S]*?--\x3e|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,link:/^!?\[(inside)\]\(href\)/,reflink:/^!?\[(inside)\]\s*\[([^\]]*)\]/,nolink:/^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,strong:/^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,em:/^\b_((?:__|[\s\S])+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,code:/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,br:/^ {2,}\n(?!\s*$)/,del:h,text:/^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/};function n(e,t){if(this.options=t||a.defaults,this.links=e,this.rules=s.normal,!this.links)throw new Error("Tokens array requires a `links` property.");this.options.gfm?this.options.breaks?this.rules=s.breaks:this.rules=s.gfm:this.options.pedantic&&(this.rules=s.pedantic)}function i(e){this.tokens=[],this.token=null,this.options=e||a.defaults}function l(e,t){return e.replace(t?/&/g:/&(?!#?\w+;)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function r(e,t){return e=e.source,t=t||"",function s(n,i){return n?(i=(i=i.source||i).replace(/(^|[^\[])\^/g,"$1"),e=e.replace(n,i),s):new RegExp(e,t)}}function h(){}function o(e){for(var t,s,n=1;n<arguments.length;n++)for(s in t=arguments[n])Object.prototype.hasOwnProperty.call(t,s)&&(e[s]=t[s]);return e}function a(e,s,n){if(n||"function"==typeof s){n||(n=s,s=null),s&&(s=o({},a.defaults,s));var r=t.lex(r,s),h=s.highlight,u=0,p=r.length,g=0;if(!h||h.length<3)return n(null,i.parse(r,s));for(var c=function(){delete s.highlight;var e=i.parse(r,s);return s.highlight=h,n(null,e)};g<p;g++)!function(e){"code"===e.type&&(u++,h(e.text,e.lang,(function(t,s){if(null==s||s===e.text)return--u||c();e.text=s,e.escaped=!0,--u||c()})))}(r[g])}else try{return s&&(s=o({},a.defaults,s)),i.parse(t.lex(e,s),s)}catch(e){if(e.message+="\nPlease report this to https://github.com/chjj/marked.",(s||a.defaults).silent)return"<p>An error occured:</p><pre>"+l(e.message+"",!0)+"</pre>";throw e}}s._inside=/(?:\[[^\]]*\]|[^\]]|\](?=[^\[]*\]))*/,s._href=/\s*<?([^\s]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/,s.link=r(s.link)("inside",s._inside)("href",s._href)(),s.reflink=r(s.reflink)("inside",s._inside)(),s.normal=o({},s),s.pedantic=o({},s.normal,{strong:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,em:/^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/}),s.gfm=o({},s.normal,{escape:r(s.escape)("])","~|])")(),url:/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,del:/^~~(?=\S)([\s\S]*?\S)~~/,text:r(s.text)("]|","~]|")("|","|https?://|")()}),s.breaks=o({},s.gfm,{br:r(s.br)("{2,}","*")(),text:r(s.gfm.text)("{2,}","*")()}),n.rules=s,n.output=function(e,t,s){return new n(t,s).output(e)},n.prototype.output=function(e){for(var t,s,n,i,r="";e;)if(i=this.rules.escape.exec(e))e=e.substring(i[0].length),r+=i[1];else if(i=this.rules.autolink.exec(e))e=e.substring(i[0].length),"@"===i[2]?(s=":"===i[1][6]?this.mangle(i[1].substring(7)):this.mangle(i[1]),n=this.mangle("mailto:")+s):n=s=l(i[1]),r+='<a href="'+n+'">'+s+"</a>";else if(i=this.rules.url.exec(e))e=e.substring(i[0].length),r+='<a href="'+(n=s=l(i[1]))+'">'+s+"</a>";else if(i=this.rules.tag.exec(e))e=e.substring(i[0].length),r+=this.options.sanitize?l(i[0]):i[0];else if(i=this.rules.link.exec(e))e=e.substring(i[0].length),r+=this.outputLink(i,{href:i[2],title:i[3]});else if((i=this.rules.reflink.exec(e))||(i=this.rules.nolink.exec(e))){if(e=e.substring(i[0].length),t=(i[2]||i[1]).replace(/\s+/g," "),!(t=this.links[t.toLowerCase()])||!t.href){r+=i[0][0],e=i[0].substring(1)+e;continue}r+=this.outputLink(i,t)}else if(i=this.rules.strong.exec(e))e=e.substring(i[0].length),r+="<strong>"+this.output(i[2]||i[1])+"</strong>";else if(i=this.rules.em.exec(e))e=e.substring(i[0].length),r+="<em>"+this.output(i[2]||i[1])+"</em>";else if(i=this.rules.code.exec(e))e=e.substring(i[0].length),r+="<code>"+l(i[2],!0)+"</code>";else if(i=this.rules.br.exec(e))e=e.substring(i[0].length),r+="<br>";else if(i=this.rules.del.exec(e))e=e.substring(i[0].length),r+="<del>"+this.output(i[1])+"</del>";else if(i=this.rules.text.exec(e))e=e.substring(i[0].length),r+=l(i[0]);else if(e)throw new Error("Infinite loop on byte: "+e.charCodeAt(0));return r},n.prototype.outputLink=function(e,t){return"!"!==e[0][0]?'<a href="'+l(t.href)+'"'+(t.title?' title="'+l(t.title)+'"':"")+">"+this.output(e[1])+"</a>":'<img src="'+l(t.href)+'" alt="'+l(e[1])+'"'+(t.title?' title="'+l(t.title)+'"':"")+">"},n.prototype.smartypants=function(e){return this.options.smartypants?e.replace(/--/g,"—").replace(/'([^']*)'/g,"‘$1’").replace(/"([^"]*)"/g,"“$1”").replace(/\.{3}/g,"…"):e},n.prototype.mangle=function(e){for(var t,s="",n=e.length,i=0;i<n;i++)t=e.charCodeAt(i),Math.random()>.5&&(t="x"+t.toString(16)),s+="&#"+t+";";return s},i.parse=function(e,t){return new i(t).parse(e)},i.prototype.parse=function(e){this.inline=new n(e.links,this.options),this.tokens=e.reverse();for(var t="";this.next();)t+=this.tok();return t},i.prototype.next=function(){return this.token=this.tokens.pop()},i.prototype.peek=function(){return this.tokens[this.tokens.length-1]||0},i.prototype.parseText=function(){for(var e=this.token.text;"text"===this.peek().type;)e+="\n"+this.next().text;return this.inline.output(e)},i.prototype.tok=function(){switch(this.token.type){case"space":return"";case"hr":return"<hr>\n";case"heading":return"<h"+this.token.depth+">"+this.inline.output(this.token.text)+"</h"+this.token.depth+">\n";case"code":if(this.options.highlight){var e=this.options.highlight(this.token.text,this.token.lang);null!=e&&e!==this.token.text&&(this.token.escaped=!0,this.token.text=e)}return this.token.escaped||(this.token.text=l(this.token.text,!0)),"<pre><code"+(this.token.lang?' class="'+this.options.langPrefix+this.token.lang+'"':"")+">"+this.token.text+"</code></pre>\n";case"table":var t,s,n,i,r,h="";for(h+="<thead>\n<tr>\n",s=0;s<this.token.header.length;s++)t=this.inline.output(this.token.header[s]),h+=this.token.align[s]?'<th align="'+this.token.align[s]+'">'+t+"</th>\n":"<th>"+t+"</th>\n";for(h+="</tr>\n</thead>\n",h+="<tbody>\n",s=0;s<this.token.cells.length;s++){for(n=this.token.cells[s],h+="<tr>\n",r=0;r<n.length;r++)i=this.inline.output(n[r]),h+=this.token.align[r]?'<td align="'+this.token.align[r]+'">'+i+"</td>\n":"<td>"+i+"</td>\n";h+="</tr>\n"}return"<table>\n"+(h+="</tbody>\n")+"</table>\n";case"blockquote_start":for(h="";"blockquote_end"!==this.next().type;)h+=this.tok();return"<blockquote>\n"+h+"</blockquote>\n";case"list_start":var o=this.token.ordered?"ol":"ul";for(h="";"list_end"!==this.next().type;)h+=this.tok();return"<"+o+">\n"+h+"</"+o+">\n";case"list_item_start":for(h="";"list_item_end"!==this.next().type;)h+="text"===this.token.type?this.parseText():this.tok();return"<li>"+h+"</li>\n";case"loose_item_start":for(h="";"list_item_end"!==this.next().type;)h+=this.tok();return"<li>"+h+"</li>\n";case"html":return this.token.pre||this.options.pedantic?this.token.text:this.inline.output(this.token.text);case"paragraph":return"<p>"+this.inline.output(this.token.text)+"</p>\n";case"text":return"<p>"+this.parseText()+"</p>\n"}},h.exec=h,a.options=a.setOptions=function(e){return o(a.defaults,e),a},a.defaults={gfm:!0,tables:!0,breaks:!1,pedantic:!1,sanitize:!1,smartLists:!1,silent:!1,highlight:null,langPrefix:""},a.Parser=i,a.parser=i.parse,a.Lexer=t,a.lexer=t.lex,a.InlineLexer=n,a.inlineLexer=n.output,a.parse=a,"object"==typeof exports?module.exports=a:"function"==typeof define&&define.amd?define((function(){return a})):this.marked=a}).call(function(){return this||("undefined"!=typeof window?window:global)}());