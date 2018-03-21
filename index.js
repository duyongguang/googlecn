
var https = require('https');
var languages = {
    'auto': 'Automatic',
    'af': 'Afrikaans',
    'sq': 'Albanian',
    'am': 'Amharic',
    'ar': 'Arabic',
    'hy': 'Armenian',
    'az': 'Azerbaijani',
    'eu': 'Basque',
    'be': 'Belarusian',
    'bn': 'Bengali',
    'bs': 'Bosnian',
    'bg': 'Bulgarian',
    'ca': 'Catalan',
    'ceb': 'Cebuano',
    'ny': 'Chichewa',
    'zh-cn': 'Chinese Simplified',
    'zh-tw': 'Chinese Traditional',
    'co': 'Corsican',
    'hr': 'Croatian',
    'cs': 'Czech',
    'da': 'Danish',
    'nl': 'Dutch',
    'en': 'English',
    'eo': 'Esperanto',
    'et': 'Estonian',
    'tl': 'Filipino',
    'fi': 'Finnish',
    'fr': 'French',
    'fy': 'Frisian',
    'gl': 'Galician',
    'ka': 'Georgian',
    'de': 'German',
    'el': 'Greek',
    'gu': 'Gujarati',
    'ht': 'Haitian Creole',
    'ha': 'Hausa',
    'haw': 'Hawaiian',
    'iw': 'Hebrew',
    'hi': 'Hindi',
    'hmn': 'Hmong',
    'hu': 'Hungarian',
    'is': 'Icelandic',
    'ig': 'Igbo',
    'id': 'Indonesian',
    'ga': 'Irish',
    'it': 'Italian',
    'ja': 'Japanese',
    'jw': 'Javanese',
    'kn': 'Kannada',
    'kk': 'Kazakh',
    'km': 'Khmer',
    'ko': 'Korean',
    'ku': 'Kurdish (Kurmanji)',
    'ky': 'Kyrgyz',
    'lo': 'Lao',
    'la': 'Latin',
    'lv': 'Latvian',
    'lt': 'Lithuanian',
    'lb': 'Luxembourgish',
    'mk': 'Macedonian',
    'mg': 'Malagasy',
    'ms': 'Malay',
    'ml': 'Malayalam',
    'mt': 'Maltese',
    'mi': 'Maori',
    'mr': 'Marathi',
    'mn': 'Mongolian',
    'my': 'Myanmar (Burmese)',
    'ne': 'Nepali',
    'no': 'Norwegian',
    'ps': 'Pashto',
    'fa': 'Persian',
    'pl': 'Polish',
    'pt': 'Portuguese',
    'ma': 'Punjabi',
    'ro': 'Romanian',
    'ru': 'Russian',
    'sm': 'Samoan',
    'gd': 'Scots Gaelic',
    'sr': 'Serbian',
    'st': 'Sesotho',
    'sn': 'Shona',
    'sd': 'Sindhi',
    'si': 'Sinhala',
    'sk': 'Slovak',
    'sl': 'Slovenian',
    'so': 'Somali',
    'es': 'Spanish',
    'su': 'Sundanese',
    'sw': 'Swahili',
    'sv': 'Swedish',
    'tg': 'Tajik',
    'ta': 'Tamil',
    'te': 'Telugu',
    'th': 'Thai',
    'tr': 'Turkish',
    'uk': 'Ukrainian',
    'ur': 'Urdu',
    'uz': 'Uzbek',
    'vi': 'Vietnamese',
    'cy': 'Welsh',
    'xh': 'Xhosa',
    'yi': 'Yiddish',
    'yo': 'Yoruba',
    'zu': 'Zulu'
};

var window = {
    TKK: global.TKK || '0'
};

var sM = function(a) {
    var b;
    if (null !== yr){
        b = yr;
    }else{
        b = wr(String.fromCharCode(84));
        var c = wr(String.fromCharCode(75));
        b = [b(), b()];
        b[1] = c();
        b = (yr = window[b.join(c())] || "") || "";
    }
    var d = wr(String.fromCharCode(116));
    var c = wr(String.fromCharCode(107));
    var d = [d(), d()];
    
    d[1] = c();
    c = "&" + d.join("") + "=";
    d = b.split(".");
    b = Number(d[0]) || 0;
    for (var e = [], f = 0, g = 0; g < a.length; g++) {
        var l = a.charCodeAt(g);
        128 > l ? e[f++] = l : (2048 > l ? e[f++] = l >> 6 | 192 : (55296 == (l & 64512) && g + 1 < a.length && 56320 == (a.charCodeAt(g + 1) & 64512) ? (l = 65536 + ((l & 1023) << 10) + (a.charCodeAt(++g) & 1023),
            e[f++] = l >> 18 | 240,
            e[f++] = l >> 12 & 63 | 128) : e[f++] = l >> 12 | 224,
            e[f++] = l >> 6 & 63 | 128),
            e[f++] = l & 63 | 128)
    }
    a = b;
    for (f = 0; f < e.length; f++)
        a += e[f],
            a = xr(a, "+-a^+6");
    a = xr(a, "+-3^+b+-f");
    a ^= Number(d[1]) || 0;
    0 > a && (a = (a & 2147483647) + 2147483648);
    a %= 1E6;
    return c + (a.toString() + "." + (a ^ b))
};

var yr = null;
var wr = function(a) {
    return function() {
        return a;
    }
};
var xr = function(a, b) {
    for (var c = 0; c < b.length - 2; c += 3) {
        var d = b.charAt(c + 2)
            , d = "a" <= d ? d.charCodeAt(0) - 87 : Number(d)
            , d = "+" == b.charAt(c + 1) ? a >>> d : a << d;
        a = "+" == b.charAt(c) ? a + d & 4294967295 : a ^ d
    }
    return a;
};


var updateTKK = function() {
    return new Promise(function (resolve, reject) {
        //cache tk 1 hour
        if (Number(window.TKK.split('.')[0]) === Math.floor(Date.now() / 3600000) ) {
                resolve();
        }else{
                var options = {
                    hostname: 'translate.google.cn',
                    port: 443,
                    headers:{
                        'Referer':'https://translate.google.cn',
                        'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                        'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.1', 
                        'Host':'translate.google.cn'
                    },
                    path: '/',
                    method: 'GET'
                };
                var req = https.request(options, (res) => {
                        res.setEncoding('utf8');
            			var data = '';
            			res.on('data', function (chunk) {
            				data += chunk;
            			}); 
            			res.on('end', function () { 
            				var code = data.match(/TKK=(.*?)\(\)\)'\);/g); 
                            if (code) {
                                eval(code[0]); 
                                if (typeof TKK !== 'undefined') {
                                    window.TKK = TKK;
                                    global.TKK = TKK; 
                                } 
                            }
                            resolve(); 
            			});
                });
                req.on('error', (e) => {
                    reject(e);
                });
                req.end();
        }
    });
}

var token_get = function(text) {
    return updateTKK().then(function () {
        var tk = sM(text);
        tk = tk.replace('&tk=', '');
        return {name: 'tk', value: tk};
    }).catch(function (err) {
        throw err;
    });
}

var translate=function(text, opts) {
    opts = opts || {}; 
    opts.from = opts.from || 'auto';
    opts.to = opts.to || 'zh-CN';
    opts.from =  languages[opts.from];
    opts.to =  languages[opts.to];
    
    return token_get(text).then(function (token){
            //console.log(token);
            var url = '/translate_a/single';
            var data = {
                client: 't',
                sl: opts.from,
                tl: opts.to,
                hl: opts.to,
                dt: ['at', 'bd', 'ex', 'ld', 'md', 'qca', 'rw', 'rm', 'ss', 't'],
                ie: 'UTF-8',
                oe: 'UTF-8',
                otf: 1,
                ssel: 0,
                tsel: 0,
                kc: 7,
                q: text
            };
            data[token.name] = token.value;
            var arr=[];
            for(var x in data){
                if(Array.isArray(data[x])){
                    for(var i=0;i<data[x].length;i++){
                        arr.push(x+'='+encodeURIComponent(data[x][i])); 
                    } 
                }else{
                    arr.push(x+'='+encodeURIComponent(data[x]));
                }
            }
            var posturl=url + '?' + arr.join('&');
            //console.log(posturl);
            return posturl;
    }).then(function (path) { 
            return new Promise(function(resolve, reject) {
                    var options = {
                        hostname: 'translate.google.cn',
                        port: 443,
                        headers:{
                            'Referer':'https://translate.google.cn',
                            'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                            'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.1', 
                            'Host':'translate.google.cn'
                        },
                        path: path,
                        method: 'GET'
                    };
                    var req = https.request(options, (res) => {
                            res.setEncoding('utf8');
                			var data = '';
                			res.on('data', function (chunk) {
                				data += chunk;
                			}); 
                			res.on('end', function () { 
                                var body=JSON.parse(data);
                                var translation=body[0][0][0];
                                var source=body[0][0][1];
                                var result={source:source,translation:translation};
                                //console.log(result);
                                resolve(result); 
                			});
                    });
                    req.on('error', (e) => {
                        reject(e);
                    });
                    req.end();
            }); 
    });
}

module.exports = translate; 
