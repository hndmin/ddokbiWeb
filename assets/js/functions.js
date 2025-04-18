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




// function useDdokbiPromotion_0401(){ // 2024.04.01
//     const promotion_0401_Links = {
//         'fomo_1':'6WvAv9Bu7Rb',
//         'fomo_2':'jn5bvVYu7Rb',
//         'save_1':'aEHodR4u7Rb',
//         'save_2':'ZtSumDcv7Rb',
//         'category_1':'bkKBScmv7Rb',
//         'category_2':'hR6lRwqv7Rb',
//         'category_3':'DA82bVuv7Rb',
//         'discount_1':'KPxAWwBv7Rb',
//         'discount_2':'lNVqPsFv7Rb',
//         'children_1':'WTfMreGv7Rb',
//         'children_2':'R1nksuQv7Rb',
//         'forbes_1':'d7d6YTw4hSb',
//         'forbes_2':'fdx4h4A4hSb',
//         'forbes_3':'13UtZ7C3mSb',
//         'skin_1':'WiyYXlM3hSb',
//         'skin_2':'koYanjO3hSb',
//         'skin_3':'EbllkY83hSb',
//     }


//     // checks current url as a List
//     const parsedURL = window.location.href.split('/');
//     // console.log(parsedURL, parsedURL.length);

//     // .html 앞 부분 가져오기
//     let uri = parsedURL[parsedURL.length - 1];
//     // Remove the part after the last dot in the URI
//     let target = null;
//     if (uri.includes('.')) {
//         target = uri.substring(0, uri.lastIndexOf('.'));
//     }
//     console.log(target, promotion_0401_Links[target]);


//     let unknown = '-';

//     // browser
//     const nAgt = navigator.userAgent;

//     // system
//     // Just keeping it for future reference
//     let os = unknown;
    
//     for (const id in clientStrings) {
//         let cs = clientStrings[id];
//         if (cs.r.test(nAgt)) {
//             os = cs.s;
//             break;
//         }
//     }

//     if (/Windows/.test(os)) {
//         os = 'Windows';
//     }
    
//     switch (os) {
//         case 'iOS':
//             return window.open('https://ddokbi.app.link/' + promotion_0401_Links[target]);
//         case 'Android':
//             return window.open('https://ddokbi.app.link/' + promotion_0401_Links[target]);
//         default:
//             alert('모바일에서 사용 해 주세요.');
//     }
// }


// function setPromotionPages_0324(){
//     const imgLength = {
//         'fomo': 9,
//         'save': 10,
//         'children': 10,
//         'discount': 9,
//         'category': 9,
//         'forbes' : 9,
//         'skin' : 10,
//     }
//     const youtubePoint = {
//         'fomo': 4,
//         'save': 5,
//         'children': 5,
//         'discount': 7,
//         'category': 7,
//         'forbes' : 9,
//         'skin' : 10,
//     }

//     const parsedURL = window.location.href.split('/');
//     let uri = parsedURL[parsedURL.length - 1];
//     let target = null;
//     if (uri.includes('.')) {
//         target = uri.substring(0, uri.lastIndexOf('.'));
//     }
//     if (uri.includes('_')) {
//         target = uri.substring(0, uri.lastIndexOf('_'));
//     }
    
//     const imgContainer = document.getElementById('imgContainer');
//     for (let i = 1; i <= imgLength[target]; i++) {

//         if(i == youtubePoint[target]){
//             console.log(`${i} / ${imgLength[target]} ==> YOUTUBE: ${youtubePoint[target]}`);
//             //
//             const section = document.createElement('section');
//             section.id = 'youtube';

//             if (target === 'fomo') {
//                 section.classList.add('dark');
//             }

//             section.innerHTML = `
//                 <dl>
//                     <dd>
//                         똑비 in YouTube
//                     </dd>
//                     <dt>
//                         <span>유명 방송인</span>도<br>
//                         극찬한 똑비
//                     </dt>
//                 </dl>
//                 <div class="video-container">
//                     <iframe 
//                         width="560" 
//                         height="315" 
//                         src="https://www.youtube.com/embed/l95vFUo57o4?si=DLESQFURmbd1BTQu" 
//                         title="YouTube video player" 
//                         frameborder="0" 
//                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
//                         referrerpolicy="strict-origin-when-cross-origin" 
//                         allowfullscreen>
//                     </iframe>
//                 <div>
//             `;
//             imgContainer.appendChild(section);
//         }else{
//             console.log(`${i} / ${imgLength[target]}`);
//             //
//             const img = document.createElement('img');
//             img.src = `./${target}/${i}.jpg`; // Replace with the actual path to your images
//             img.alt = `Image ${i}`;
//             imgContainer.appendChild(img);
//         }
//     }
//     console.log('page:', target);
// }



function setPromotionPages_20250404(){
    const imgLength = {
        'forbes' : 9,
        'skin' : 10,
    }
    const forbesPoint = {
        'forbes' : 4,
        'skin' : 4,
    }
    const youtubePoint = {
        'forbes' : 5,
        'skin' : 5,
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

        if(i == forbesPoint[target]){
            console.log(`${i} / ${imgLength[target]} ==> FORBES: ${youtubePoint[target]}`);
            //
            const section = document.createElement('section');
            section.id = 'forbes';

            if (target === 'skin') {
                section.classList.add('dark');
            }

            section.innerHTML = `
                <dl>
                    <dd>
                        똑비 in Forbes
                    </dd>
                    <dt>
                        <span>포브스</span>에<br>
                        소개된 똑비
                    </dt>
                </dl>
                <div class="img-container">
                    <img src="./forbes.png" alt="Forbes"/>
                    <a href="https://jmagazine.joins.com/forbes/view/340959" target="_blank">
                        <button>
                            기사 보기
                        </button>    
                    </a>
                <div>
            `;
            imgContainer.appendChild(section);
        }else if(i == youtubePoint[target]){
            console.log(`${i} / ${imgLength[target]} ==> YOUTUBE: ${youtubePoint[target]}`);
            //
            const section = document.createElement('section');
            section.id = 'youtube';

            if (target === 'forbes') {
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


//////////////////////////////////////

function getQueryArray(){
    const queryParams = new URLSearchParams(window.location.search);
    const queryArray = [];
    queryParams.forEach((value, key) => {
        queryArray.push({ key, value });
    });
    // console.log('Query Parameters:', queryArray, getQueryValue(queryArray, 'category'), getQueryValue(queryArray, 'type'), getQueryValue(queryArray, 'path'));

    return queryArray;
}

function getQueryValue(queryArray, keyString) {
    return queryArray.find(param => param.key === keyString)?.value
}


function setPromotionPages_20250414(){
    const imgLength = {
        'category' : 9,
        'woman' : 9,
        'skin' : 9,
    }

    const point = {
        "forbes" : {
            "category" : 4,
            "woman" : 4,
            "skin" : 4,
        },
        "youtube" : {
            "category" : 5,
            "woman" : 5,
            "skin" : 5,
        },
        "var" : {
            "category" : 6,
            "woman" : 6,
            "skin" : 6,
        }
    }


    // GET QUERY-PARAMS
    const queryArray = getQueryArray();

    let date = getQueryValue(queryArray, 'date');
    let category = getQueryValue(queryArray, 'category');
    let type = getQueryValue(queryArray, 'type');
    // let path = getQueryValue(queryArray, 'path');




    // set Btn txt
    if(type == 'a'){
        document.querySelector('#ActionBtn').innerHTML = '무료로 이용하기';
    }else if (type == 'b'){
        document.querySelector('#ActionBtn').innerHTML = '똑비 시작하기';
    }


    const imgContainer = document.getElementById('imgContainer');
    for (let i = 1; i <= imgLength[category]; i++) {

        if(i == point.var[category]){
            console.log(`${i} / ${imgLength[category]} ==> VAR: ${point.var[category]}`);
            //
            const img = document.createElement('img');
            img.src = `./${date}/${category}/${type}.jpg`;
            img.alt = `Image ${type}`;
            imgContainer.appendChild(img);
        }else if(i == point.forbes[category]){
            console.log(`${i} / ${imgLength[category]} ==> FORBES: ${point.forbes[category]}`);
            //
            const section = document.createElement('section');
            section.id = 'forbes';

            if (category === 'skin') {
                section.classList.add('dark');
            }

            section.innerHTML = `
                <dl>
                    <dd>
                        똑비 in Forbes
                    </dd>
                    <dt>
                        <span>포브스</span>에<br>
                        소개된 똑비
                    </dt>
                </dl>
                <div class="img-container">
                    <img src="../../../assets/img/forbes.png" alt="Forbes"/>
                    <a href="https://jmagazine.joins.com/forbes/view/340959" category="_blank">
                        <button>
                            기사 보기
                        </button>    
                    </a>
                <div>
            `;
            imgContainer.appendChild(section);
        }else if(i == point.youtube[category]){
            console.log(`${i} / ${imgLength[category]} ==> YOUTUBE: ${point.youtube[category]}`);
            //
            const section = document.createElement('section');
            section.id = 'youtube';

            if (category === 'forbes') {
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
            console.log(`${i} / ${imgLength[category]}`);
            //
            const img = document.createElement('img');
            img.src = `./${date}/${category}/${i}.jpg`; // Replace with the actual path to your images
            img.alt = `Image ${i}`;
            imgContainer.appendChild(img);
        }
    }
    // console.log('page:', category);

}


function useDdokbiPromotion_20250414(){
    const queryArray = getQueryArray();
    //
    const query_category = getQueryValue(queryArray, 'category');
    const query_type = getQueryValue(queryArray, 'type');
    const query_path = getQueryValue(queryArray, 'path');
    //
    const LINKS = 
    {
        "category": {
            "a": {
                "1": "I1biRcCXxSb",
                "2": "ZWXKfiSXxSb",
                "3": "jB4RVk4XxSb",
                "4": "JzCvOgBYxSb",
            },
            "b": {
                "1": "V1bcG2LXxSb",
                "2": "2UVLrVXXxSb",
                "3": "4dbdS1kYxSb",
                "4": "24Jz5UFYxSb",
            }
        },
        "woman": {
            "a": {
                "1": "Dw5N0XZYxSb",
                "2": "2OgADaeZxSb",
            },
            "b": {
                "1": "0FaaNq3YxSb",
                "2": "LC63i9gZxSb",
            }
        },
        "skin": {
            "a": {
                "1": "YZXHR4pZxSb",
                "2": "owOBb0CZxSb",
                "3": "ORu40yNZxSb",
            },
            "b": {
                "1": "nvGY1PuZxSb",
                "2": "x8gArgHZxSb",
                "3": "uT4rZoRZxSb",
            }
        },
    }
    



    const deepLink = LINKS[query_category]?.[query_type]?.[query_path];
    console.log('DEEEEEP: ',deepLink);


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
            return window.open('https://ddokbi.app.link/' + deepLink);
        case 'Android':
            return window.open('https://ddokbi.app.link/' + deepLink);
        default:
            alert('모바일에서 사용 해 주세요.');
    }
}






// Load promotion data from JSON file
async function loadPromotionData(eventID) {
    eventID = String(eventID);
    try {
        const response = await fetch('../../assets/js/promotionData.json');
        if (!response.ok) {
            throw new Error('Failed to load promotion data');
        }
        const loadedJson = await response.json();

        
        const promotionData = loadedJson.promotions;
        // console.log('Promotion Data:', promotionData, promotionData[0][eventID], loadedJson.promotions[0][eventID]);
        console.log('Promotion Data:', promotionData[0][eventID]);


        return promotionData[0][eventID];
    } catch (error) {
        console.error('Error loading promotion data:', error);
    }
}



function setPromotionPages_withForm(){


    // Call the function to load data
    // const promotionData = loadPromotionData(20250414);
    // console.log(promotionData);



    const imgLength = {
        'category' : 11,
        'fomo' : 10,
    }

    const point = {
        "forbes" : {
            "category" : 6,
            "fomo" : 5
        },
        "youtube" : {
            "category" : 7,
            "fomo" : 6
        },
        "var" : {
            "category" : 0,
            "fomo" : 0
        },
        "form" : {
            "category" : [2,11],
            "fomo" : [2,10]
        }
    }


    // GET QUERY-PARAMS
    const queryArray = getQueryArray();

    let date = getQueryValue(queryArray, 'date');
    let category = getQueryValue(queryArray, 'category');
    // let type = getQueryValue(queryArray, 'type');
    // let path = getQueryValue(queryArray, 'path');




    // set Btn txt
    // if(type == 'a'){
    //     document.querySelector('#ActionBtn').innerHTML = '무료로 이용하기';
    // }else if (type == 'b'){
    //     document.querySelector('#ActionBtn').innerHTML = '똑비 시작하기';
    // }


    const imgContainer = document.getElementById('imgContainer');
    // for (let i = 1; i <= imgLength[category]; i++) {
    for (let i = 1; i <= imgLength[category]; i++) {

        if(point.form[category].includes(i)){
            // console.log(`${i} / ${imgLength[category]} ==> FORM: ${point.form[category]}`);
            //
            const section = document.createElement('section');
            section.classList.add('formSection');

            section.innerHTML = `
                <div class="formContainer">
                    <dl>
                        <dt>똑비 신청하기</dt>
                        <dd>
                            연락처를 남기시면, 당신만의 전담 비서가 직접 서비스 내용과 혜택을 상세히 안내드립니다. 바로 신청해보세요. 
                        </dd>
                    </dl>

                    <form  id="promotionForm-${i}" class="promotionForm">
                        <div class="mb-3 inputWrap">
                            <label for="name-${i}" class="form-label">성함</label>
                            <input type="name" class="form-control" id="name-${i}" placeholder="홍길동" required>
                        </div>
                        <div class="mb-4 inputWrap">
                            <label for="phone-${i}" class="form-label">전화번호</label>
                            <input type="text" class="form-control" id="phone-${i}" placeholder="010-0000-0000" required oninput="validateInput(this)" aria-describedby="phoneHelp">
                            <div id="phoneHelp" class="form-text">&nbsp;* 숫자 혹은 - 만 입력 가능합니다.</div>
                        </div>
                        <div class="mb-3 form-check" onclick="this.classList.toggle('checked')">
                            <input type="checkbox" class="form-check-input" id="agree-Age-${i}">
                            <label class="form-check-label" for="agree-Age-${i}" required>(필수) 저는 만 45세 (1980년 이전 출생자) 이상입니다.</label>
                        </div>
                        <div class="mb-3 form-check" onclick="this.classList.toggle('checked')">
                            <input type="checkbox" class="form-check-input" id="agree-Privacy-${i}">
                            <label class="form-check-label" for="agree-Privacy-${i}" required>(필수) 위 정보는 상담 용도로만 이용되며 상담 후 즉시 폐기됩니다. 이에 동의합니다.</label>
                        </div>
                        <button type="submit" id="sendBtn-${i}" class="btn btn-primary pulse-text">똑비 멤버십 안내 받기 </button>
                    </form>
                </div>
            `;
            imgContainer.appendChild(section);
        }
        // else if(i == point.var[category]){ // ABTest
        //     console.log(`${i} / ${imgLength[category]} ==> VAR: ${point.var[category]}`);
        //     //
        //     const img = document.createElement('img');
        //     img.src = `./${date}/${category}/${type}.jpg`;
        //     img.alt = `Image ${type}`;
        //     imgContainer.appendChild(img);
        // }
        else if(i == point.forbes[category]){
            console.log(`${i} / ${imgLength[category]} ==> FORBES: ${point.forbes[category]}`);
            //
            const section = document.createElement('section');
            section.id = 'forbes';

            if (category === 'fomo') {
                section.classList.add('dark');
            }

            section.innerHTML = `
                <dl>
                    <dd>
                        똑비 in Forbes
                    </dd>
                    <dt>
                        <span>포브스</span>에<br>
                        소개된 똑비
                    </dt>
                </dl>
                <div class="img-container">
                    <img src="../../../assets/img/forbes.png" alt="Forbes"/>
                    <a href="https://jmagazine.joins.com/forbes/view/340959" category="_blank">
                        <button>
                            기사 보기
                        </button>    
                    </a>
                <div>
            `;
            imgContainer.appendChild(section);
        }else if(i == point.youtube[category]){
            console.log(`${i} / ${imgLength[category]} ==> YOUTUBE: ${point.youtube[category]}`);
            //
            const section = document.createElement('section');
            section.id = 'youtube';

            if (category === 'forbes') {
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
            console.log(`${i} / ${imgLength[category]}`);
            //
            const img = document.createElement('img');
            img.src = `./${date}/${category}/${i}.jpg`; // Replace with the actual path to your images
            img.alt = `Image ${i}`;
            imgContainer.appendChild(img);
        }
    }
    // console.log('page:', category);

}

function validateInput(input) {
    input.value = input.value.replace(/[^0-9\-]/g, '');
  }



