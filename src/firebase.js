import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCr1qlENMErTiN07ewj0dNHMHrHTMShQEU",
  authDomain: "rumyfriend-c2f37.firebaseapp.com",
  projectId: "rumyfriend-c2f37",
  storageBucket: "rumyfriend-c2f37.appspot.com",
  messagingSenderId: "528103748454",
  appId: "1:528103748454:web:245670cb3515d4791acea7",
  measurementId: "G-20RTYC3805",
};

// firebaseConfig 정보로 firebase 시작
firebase.initializeApp(firebaseConfig);

// firebase의 firestore 인스턴스를 변수에 저장
const firestore = firebase.firestore();

// 필요한 곳에서 사용할 수 있도록 내보내기
export { firestore };
