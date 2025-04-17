// 📁 function.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";

let db = null;


function getQueryArray() {
    const params = new URLSearchParams(window.location.search);
    const result = [];
    for (const [key, value] of params.entries()) {
      result.push({ key, value });
    }
    return result;
}
  
function getQueryValue(queryArray, targetKey) {
    const found = queryArray.find(p => p.key === targetKey);
    return found ? found.value : null;
}



export function initializeFirebase() {
  const firebaseConfig = {
    apiKey: "AIzaSyBnd24FsfDWlnZbUU3RxCwjOEj5ulo4r_E",
    authDomain: "ddokbi-promotion.firebaseapp.com",
    projectId: "ddokbi-promotion",
    storageBucket: "ddokbi-promotion.firebasestorage.app",
    messagingSenderId: "1053820523541",
    appId: "1:1053820523541:web:fa72b844b7f00cddee2a1c",
    measurementId: "G-T6DVYZKQQQ"
  };

  const app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  return db;
}

export async function submitContactForm() {
    const form = document.getElementById("promotionForm-0");
    const queryArray = getQueryArray();

    // 쿼리값에서 날짜를 컬렉션 이름으로 사용
    // const collectionName = getQueryValue(queryArray, "date");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const name = document.getElementById("name-0").value;
        const phone = document.getElementById("phone-0").value;

        try {
        await addDoc(collection(db, collectionName), {
            name,
            phone,
            timestamp: new Date(),
            ...queryArray.reduce((acc, param) => {
            acc[param.key] = param.value;
            return acc;
            }, {}),
        });
        alert("저장 완료!");
        form.reset();
        } catch (error) {
        console.error("저장 실패:", error);
        alert("저장 중 오류 발생");
        }
    });
}


// export async function submitContactForm_onclick(e, nth) {
//     e.preventDefault();

//     console.log("nth", nth);
//     // const form = document.getElementById(`promotionForm-${nth}`);
//     // const queryArray = getQueryArray();
  
//     // // 쿼리값에서 날짜를 컬렉션 이름으로 사용
//     // const collectionName = getQueryValue(queryArray, "date");
  
//     // const name = document.getElementById(`name-${nth}`).value;
//     // const phone = document.getElementById(`phone-${nth}`).value;

//     // try {
//     //     await addDoc(collection(db, collectionName), {
//     //         name,
//     //         phone,
//     //         timestamp: new Date(),
//     //         ...queryArray.reduce((acc, param) => {
//     //             acc[param.key] = param.value;
//     //             return acc;
//     //         }, {}),
//     //     });
//     //     alert("저장 완료!");
//     //     form.reset();
//     // } catch (error) {
//     //     console.error("저장 실패:", error);
//     //     alert("저장 중 오류 발생");
//     // }
//   }



  
