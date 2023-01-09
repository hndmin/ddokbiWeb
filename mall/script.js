



//import {Data} from './data.js';
var pdData;
var pdDataLen;


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

function copyText() {
  var ProductName = document.getElementsByClassName("pdName")[0].innerText;
  var copyText = "똑비~! " + ProductName + " 구매해주세요";
  navigator.clipboard.writeText(copyText);
}





//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

// pdName / pdDiscript / pdSale / pdPrice / pdLink

//var pdDataLen = pdData.length;
function mainOnload(Data){
  pdData = Data;
  pdDataLen = pdData.length;


  // 상품 노드 생성 및 복사 
  var pdNode = document.getElementsByClassName("product")[0];
  var pdList = document.getElementById("pdList");
  for(i=0; i<pdDataLen - 1; i++){
    pdList.appendChild(pdNode.cloneNode(true));
  }


  var product = document.getElementsByClassName("product");
  //console.log(product);
  for(i=0; i<pdDataLen; i++){
    // 상품 컨텐츠 채우기
    //product[i].href = "./productPages/" + i + ".html";
    product[i].href = "./" + "detail" + ".html";
    product[i].setAttribute('onclick','toLocal('+ i +')');

    product[i].getElementsByClassName("pdImg")[0].src = "./src/img/product/" + i + ".png";
    product[i].getElementsByClassName("pdName")[0].innerText = pdData[i]["name"];
    product[i].getElementsByClassName("pdDiscript")[0].innerText = pdData[i]["discript"];
    product[i].getElementsByClassName("pdSale")[0].innerText = pdData[i]["sale"];
    product[i].getElementsByClassName("pdPrice")[0].innerText = pdData[i]["price"];

    // 똑비라벨 붙이기
    if(pdData[i]["ddockBiLabel"] == false){
      product[i].getElementsByClassName("pdDockLabel")[0].style.opacity = "0";
    }

    //상품 뱃지 붙이기
    var badgeLenth = pdData[i]["badge"].length;
    for(j=0; j<badgeLenth; j++){
      if(pdData[i]["badge"][j]["show"] == true){
        var newBadge = document.createElement("span");
        var badgeText = document.createTextNode(pdData[i]["badge"][j]["name"]);
        newBadge.appendChild(badgeText);
        newBadge.classList.add("badge");
        newBadge.style.backgroundColor = pdData[i]["badge"][j]["color"]

        product[i].getElementsByClassName("badgeGroup")[0].append(newBadge);
      }
    }

    //
  }
}
//////////////////////////////////////////////////////////////////////////////
//myStorage = window.localStorage;
function toLocal(i){
  window.localStorage.setItem("pdIndex", i);
}
//////////////////////////////////////////////////////////////////////////////
function detailOnload(Data, i){
  //console.log("key :" + window.localStorage.getItem("pdIndex"));

  pdData = Data;
  pdDataLen = pdData.length;


  var product = document.getElementsByClassName("product");
  
  product[0].getElementsByClassName("pdImg")[0].src = "./src/img/product/" + i + ".png"
  product[0].getElementsByClassName("pdName")[0].innerText = pdData[i]["name"];
  product[0].getElementsByClassName("pdDiscript")[0].innerText = pdData[i]["discript"];
  product[0].getElementsByClassName("pdSale")[0].innerText = pdData[i]["sale"];
  product[0].getElementsByClassName("pdPrice")[0].innerText = pdData[i]["price"];
  product[0].getElementsByClassName("info1")[0].innerText = pdData[i]["shipment"];
  //
  document.getElementById("pdDetail").src = pdData[i]["link"];
  
}

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

function categoryFilter(x){
  var btns = document.getElementById("categoryList").getElementsByClassName("btn");
  var btnLength = btns.length;
  var key = {};
  for(i=0; i<btnLength; i++){
    btns[i].classList.remove("on");
  }
  btns[x].classList.add("on");


  var product = document.getElementsByClassName("product");
  switch (x) {
    case 0:
      for(i=0; i<pdDataLen; i++){
        product[i].style.display = "block";
      }
      break;
    case 1:
      for(i=0; i<pdDataLen; i++){
        if(pdData[i]["category"] == "수산&정육"){
          product[i].style.display = "block";
        }else{
          product[i].style.display = "none";
        }
      }
      break;
    case 2:
      for(i=0; i<pdDataLen; i++){
        if(pdData[i]["category"] == "과일"){
          product[i].style.display = "block";
        }else{
          product[i].style.display = "none";
        }
      }
      break;
    case 3:
      for(i=0; i<pdDataLen; i++){
        if(pdData[i]["category"] == "건강식품"){
          product[i].style.display = "block";
        }else{
          product[i].style.display = "none";
        }
      }
      break;
      case 4:
        for(i=0; i<pdDataLen; i++){
          if(pdData[i]["category"] == "주류"){
            product[i].style.display = "block";
          }else{
            product[i].style.display = "none";
          }
        }
        break;
    default:
      alert( "" );
  }
}

  