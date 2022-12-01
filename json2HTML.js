export function JSON2HTML(obj,sameLine = false,comma = false) {
    if (typeof obj === 'object' && obj !== null) {
        if (Array.isArray(obj)) {
            return ArrayToHTML(obj,sameLine,comma);
        } else {
            return ObjectToHTML(obj,comma);
        }
    } else {
        let color = isNaN(obj) ? '#00ff00' : '#ff8e00';
        let field = !isNaN(obj) ? obj : '"' + obj + '"';
        return `<span style="color: ${color};padding-left: 20px;display:inline-block"> ${field} ${comma ? ',':''}</span>`;
    }
}

function ObjectToHTML(obj,comma = false) {
    let longest = GetLongestKeyLength(obj);
    let keySpanPxWidth = (longest + 3) * 8;
    let body = '';
    let keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        let isLast = i === keys.length - 1;
        let spanKey = `<span style="color: #00ff00;display:inline-block;width:${keySpanPxWidth}px"> ${
            '"' + key + '"'
        } </span>`;
        let spanValue = `${JSON2HTML(obj[key],true,!isLast)}`;
        body += `<div style="padding-left:20px;display:block">${spanKey}:${spanValue} </div>`;
    }
    return `
    <div style="padding-left:20px;">
        <span style="color: #ff8e00">{</span> 
            ${body} 
        <span style="color: #ff8e00">} ${comma ? ',':''}</span>
    </div>`;

}
function ArrayToHTML(array,sameLine,comma = false) {
    let display = !sameLine ? 'inline-block' : 'inline-grid';
    let body = '';
    for (let i = 0 ; i < array.length ; i++) {
        let element = array[i];
        let isLast = i === array.length - 1;
        body += JSON2HTML(element,true,!isLast);
    }
    return `
    <div style="display:${display}">
        <span style="color: #ff8e00">[</span> 
            ${body} 
        <span style="color: #ff8e00">] ${comma ? ',':''}</span>
    </div>`;
}

function GetLongestKeyLength(obj) {
    let longest = 0;
    for (let key in obj) {
        if (key.length > longest) {
            longest = key.length;
        }
    }
    return longest;
}

export function JSON2HTMLPage(jsonObject) {
    let html = '<!DOCTYPE html>';
    html += '<html>';
    html += '<head>';
    html += '<title>API</title>';
    html += `<link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Ubuntu+Mono&display=swap" rel="stylesheet">
  <style>
    
    body {
      font-family: 'Ubuntu Mono', monospace;
      font-size: 16px;
      background-color: #0c272c;
      color: #ff8e00;
      }
  </style>`;
    html += '</head>';
    html += '<body>';
    html += JSON2HTML(jsonObject);
    html += '</body>';
    html += '</html>';
    return html;
}
