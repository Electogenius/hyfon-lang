function hyfon_string(a, sysname) {
    
    a = a.replace(/sys/gi, sysname)

    var aa; //current elm name for hue command
    var j = ''; //js code
    var name; //appname
    var mbt = '';
    a = a.replace(/(\r\n|\n|\r)/gm, "");
    a = a.split(';');
    //for every command
    for (l in a){
        var c; //command buffer
        var r = a[l].split('-')
        
        for(qq in r){
            k = r[qq]
            if (mbt == 'add') {
                if (qq==1) {
                    j += `${k}.innerHTML = `
                }else{
                    mbt = ''
                    j += k
                }
                c = ''
            }
        console.log(c);
        //if this is the first keyword,
        if (qq == 0) {
            //switch keyword
            switch (k) {
                case '/*':
                c = 'comment'
                j+='//'
                break;
                case "@NAME":
                    c = 'name'
                    break;
            
                case 'elm':
                    j+= 'var ';
                    c = 'elm';
                    break;
                case 'var':
                    c = 'var'
                break;
                case 'add':
                mbt = 'add'
                break;
                default:
                    break;
            }
        }else{ //for 2 word commands:
            switch (c) {
                case 'name':
                    name = k;
                    alert('name: ' + k)
                    break;
                case 'type':
                    break
                default:
                    break;
            }
        } 
        //hue
        if (c == 'elm') {
            if (qq==1) {
                j+=k
                aa = k
            }
            if (qq==2) {
                j+= ` = document.createElement(${k})`
            }
            if (qq==3) {
                j+= `\n{var n = document.createTextNode(${k})\n${aa}.appendChild(n)}`;
            }
        }
        //var
        if (c == 'var') {
            if (qq==0) {
                j+='var '
            }
            if (qq==1) {
                j+=k
            }
            if (qq==2) {
                j+=` = ${k}`
            }
        }
        }
        j+='; '
        aa = ''
    }
    j = j.replace('; ', '\n')
    var result = j
    return result;
}