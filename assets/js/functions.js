var links = {
    '360F': 'metlife',
    'geps': 'geps',
    'primeplus': 'PJ3zRlzrDlPdtnH',
}

const promotionLinks ={
    17: 'TLlYOevTFRb',
    19: 'JwSxYPCTFRb',
    21: 'DPiLA4ETFRb',
    24: 'vDhPBQJTFRb',
    26: 'wLEfrZLTFRb',
}

function redirect(uri) {
    if (uri === '360F') {
        // console.log('360F', uri);
        return window.open('https://ddokbi.app.link/metlife');
    }
    if (uri === 'primeplus') {
        // console.log('primeplus', uri);
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

function useDdokbi() {
    let unknown = '-';

    // browser
    const nAgt = navigator.userAgent;

    // system
    // Just keeping it for future reference
    let os = unknown;
    
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
    console.log(parsedURL, parsedURL.length);

    // .html 앞 부분 가져오기
    let uri = parsedURL[parsedURL.length - 1];
    console.log(uri);



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

function useDdokbiMain() {

    let unknown = '-';

    // browser
    const nAgt = navigator.userAgent;

    // system
    // Just keeping it for future reference
    let os = unknown;
    
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

    switch (os) {
        case 'iOS':
            return window.open("https://ddokbi.app.link/kCMOt2qkyPb", "_blank");
        case 'Android':
            return window.open("https://ddokbi.app.link/kCMOt2qkyPb", "_blank");
        default:
            alert('모바일에서 사용 해 주세요.');
            return location.href = "https://ddokbi.app.link/kCMOt2qkyPb";
    }
  }


function useDdokbiPromotion() {
    let unknown = '-';

    // browser
    const nAgt = navigator.userAgent;

    // system
    // Just keeping it for future reference
    let os = unknown;
    
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


    
    

    switch (os) {
        case 'iOS':
            // return window.open('https://ddokbi.app.link/' + promotionLinks[getTime('date')]);
            return promotionDateManager();
        case 'Android':
            // return window.open('https://ddokbi.app.link/' + promotionLinks[getTime('date')]);
            return promotionDateManager();
        default:
            alert('모바일에서 사용 해 주세요.');
    }
}


function getTime(option){
    const currentDate = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Seoul" }));
    // const koreaTimeOffset = 1; // KST is UTC+9
    // const koreaDate = new Date(currentDate.getTime() + (koreaTimeOffset * 60 * 1000));
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Months are zero-based
    const date = currentDate.getDate();
    // console.log('Korea Date:', currentDate);
    // console.log('Year:', year);
    // console.log('Month:', month);
    // console.log('Date:', date);

    switch (option) {
        case 'date':
            return date;
        case 'month':
            return month;
        case 'year':
            return year;
        default:
            return currentDate;
    }
}

function promotionDateManager(){
    let date = getTime('date');
    // let resultDate;
    
    if(date < 17){
        alert('프로모션이 곧 시작됩니다.');
    } else if (date >= 17 && date < 19) {
        //resultDate = 17;
        console.log('17');
        window.open('https://ddokbi.app.link/' + promotionLinks[17]);
    } else if (date >= 19 && date < 21) {
        //resultDate = 19;
        console.log('19');
        window.open('https://ddokbi.app.link/' + promotionLinks[19]);
    } else if (date >= 21 && date < 24) {
        //resultDate = 21;
        console.log('21');
        window.open('https://ddokbi.app.link/' + promotionLinks[21]);
    } else if (date >= 24 && date < 26) {
        //resultDate = 24;
        console.log('24');
        window.open('https://ddokbi.app.link/' + promotionLinks[24]);
    } else if (date >= 26) {
        //resultDate = 26; 
        console.log('26');
        window.open('https://ddokbi.app.link/' + promotionLinks[26]);
    }else {
        alert('현재 프로모션 기간이 종료되었습니다.');
    }
}





function useDdokbiPromotion_0401(){
    const promotion_0401_Links = {
        'fomo_1':'6WvAv9Bu7Rb',
        'fomo_2':'jn5bvVYu7Rb',
        'save_1':'aEHodR4u7Rb',
        'save_2':'ZtSumDcv7Rb',
        'category_1':'bkKBScmv7Rb',
        'category_2':'hR6lRwqv7Rb',
        'category_3':'DA82bVuv7Rb',
        'discount_1':'KPxAWwBv7Rb',
        'discount_2':'lNVqPsFv7Rb',
        'children_1':'WTfMreGv7Rb',
        'children_2':'R1nksuQv7Rb',
    }





    // console.log(window.location.href);

    // checks current url as a List
    const parsedURL = window.location.href.split('/');
    // console.log(parsedURL, parsedURL.length);

    // .html 앞 부분 가져오기
    let uri = parsedURL[parsedURL.length - 1];
    // Remove the part after the last dot in the URI
    let target = null;
    if (uri.includes('.')) {
        target = uri.substring(0, uri.lastIndexOf('.'));
    }
    console.log(target, promotion_0401_Links[target]);


    let unknown = '-';

    // browser
    const nAgt = navigator.userAgent;

    // system
    // Just keeping it for future reference
    let os = unknown;
    
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
    
    switch (os) {
        case 'iOS':
            return window.open('https://ddokbi.app.link/' + promotion_0401_Links[target]);
        case 'Android':
            return window.open('https://ddokbi.app.link/' + promotion_0401_Links[target]);
        default:
            alert('모바일에서 사용 해 주세요.');
    }
}


function setPromotionPages(){
    const imgLength = {
        'fomo': 9,
        'save': 10,
        'children': 10,
        'discount': 9,
        'category': 9,
    }
    const youtubePoint = {
        'fomo': 4,
        'save': 5,
        'children': 5,
        'discount': 7,
        'category': 7,
    }

    const parsedURL = window.location.href.split('/');
    let uri = parsedURL[parsedURL.length - 1];
    let target = null;
    if (uri.includes('.')) {
        target = uri.substring(0, uri.lastIndexOf('.'));
    }
    if (uri.includes('_')) {
        target = uri.substring(0, uri.lastIndexOf('_'));
    }
    
    const imgContainer = document.getElementById('imgContainer');
    for (let i = 1; i <= imgLength[target]; i++) {

        if(i == youtubePoint[target]){
            console.log(`${i} / ${imgLength[target]} ==> YOUTUBE: ${youtubePoint[target]}`);
            //
            const section = document.createElement('section');
            section.id = 'youtube';

            if (target === 'fomo') {
                section.classList.add('dark');
            }

            section.innerHTML = `
                <dl>
                    <dd>
                        똑비 in YouTube
                    </dd>
                    <dt>
                        <span>유명 방송인</span>도<br>
                        극찬한 똑비
                    </dt>
                </dl>
                <div class="video-container">
                    <iframe 
                        width="560" 
                        height="315" 
                        src="https://www.youtube.com/embed/l95vFUo57o4?si=DLESQFURmbd1BTQu" 
                        title="YouTube video player" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        referrerpolicy="strict-origin-when-cross-origin" 
                        allowfullscreen>
                    </iframe>
                <div>
            `;
            imgContainer.appendChild(section);
        }else{
            console.log(`${i} / ${imgLength[target]}`);
            //
            const img = document.createElement('img');
            img.src = `./${target}/${i}.jpg`; // Replace with the actual path to your images
            img.alt = `Image ${i}`;
            imgContainer.appendChild(img);
        }
    }
    console.log('page:', target);
}