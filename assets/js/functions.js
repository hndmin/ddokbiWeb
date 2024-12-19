var links = {
    '360F': 'metlife',
    'geps': 'geps',
    'primeplus': 'PJ3zRlzrDlPdtnH',
}

function redirect(uri) {
    if (uri === '360F') {
        return window.open('https://ddokbi.app.link/metlife');
    }
    if (uri === 'primeplus') {
        return window.open('https://ddokbi.app.link/PJ3zRlzrDlPdtnH');
    }
    return alert('현재는 안드로이드 버전만 지원됩니다.');
}

/**
 * Modified by Hyunwoo Kim
 * based on JavaScript Client Detection
 * https://jsfiddle.net/ChristianL/AVyND/
 * (C) viazenetti GmbH (Christian Ludwig)
 */
function useDdokbi() {
    let unknown = '-';

    // browser
    const nAgt = navigator.userAgent;

    // system
    // Just keeping it for future reference
    let os = unknown;
    const clientStrings = [
        { s: 'Windows 10', r: /(Windows 10.0|Windows NT 10.0)/ },
        { s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/ },
        { s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/ },
        { s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/ },
        { s: 'Windows Vista', r: /Windows NT 6.0/ },
        { s: 'Windows Server 2003', r: /Windows NT 5.2/ },
        { s: 'Windows XP', r: /(Windows NT 5.1|Windows XP)/ },
        { s: 'Windows 2000', r: /(Windows NT 5.0|Windows 2000)/ },
        { s: 'Windows ME', r: /(Win 9x 4.90|Windows ME)/ },
        { s: 'Windows 98', r: /(Windows 98|Win98)/ },
        { s: 'Windows 95', r: /(Windows 95|Win95|Windows_95)/ },
        { s: 'Windows NT 4.0', r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/ },
        { s: 'Windows CE', r: /Windows CE/ },
        { s: 'Windows 3.11', r: /Win16/ },
        { s: 'Android', r: /Android/ },
        { s: 'Open BSD', r: /OpenBSD/ },
        { s: 'Sun OS', r: /SunOS/ },
        { s: 'Chrome OS', r: /CrOS/ },
        { s: 'Linux', r: /(Linux|X11(?!.*CrOS))/ },
        { s: 'iOS', r: /(iPhone|iPad|iPod)/ },
        { s: 'Mac OS X', r: /Mac OS X/ },
        { s: 'Mac OS', r: /(Mac OS|MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
        { s: 'QNX', r: /QNX/ },
        { s: 'UNIX', r: /UNIX/ },
        { s: 'BeOS', r: /BeOS/ },
        { s: 'OS/2', r: /OS\/2/ },
        { s: 'Search Bot', r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/ }
    ];
    for (const id in clientStrings) {
        let cs = clientStrings[id];
        if (cs.r.test(nAgt)) {
            os = cs.s;
            break;
        }
    }

    if (/Windows/.test(os)) {
        os = 'Windows';
    }

    // checks current url as a List
    const parsedURL = window.location.href.split('/');
    let uri = parsedURL[parsedURL.length - 1];
    // f#$%$% slash
    if (uri === '') uri = parsedURL[parsedURL.length - 2];
    // just in case query param exists
    const targetURI = uri.split('?')[0];
    console.log(targetURI);

    switch (os) {
        case 'Android':
            return window.open('https://ddokbi.app.link/' + links[targetURI]);
        case 'iOS':
            return redirect(targetURI);
        default:
            // console.log('https://ddokbi.app.link/' + links[targetURI]);
            alert('모바일에서 사용 해 주세요.');
    }
}
