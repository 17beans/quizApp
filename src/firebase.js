import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCA7tbEighyB6Kv7JosEhS3B7h62pus_QI",
  authDomain: "friend-test-5476f.firebaseapp.com",
  projectId: "friend-test-5476f",
  storageBucket: "friend-test-5476f.appspot.com",
  messagingSenderId: "35308591932",
  appId: "1:35308591932:web:04da8f9eb37702753b1c39",
  measurementId: "G-D083L33TJC",
};

// firebaseConfig 정보로 firebase 시작
firebase.initializeApp(firebaseConfig);

// firebase의 firestore 인스턴스를 변수에 저장
const firestore = firebase.firestore();

// 필요한 곳에서 사용할 수 있도록 내보내기
export { firestore };
