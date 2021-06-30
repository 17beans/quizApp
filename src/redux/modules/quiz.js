import { firestore } from "../../firebase";

const quiz_db = firestore.collection("quiz");

// Actions

// 퀴즈 데이터 가져온다
const GET_QUIZ = "quiz/GET_QUIZ";
// 유저의 응답(퀴즈 답)을 추가한다
const ADD_ANSWER = "quiz/ADD_ANSWER";
// 응답을 초기화 해준다
const RESET_ANSWER = "quiz/RESET_ANSWER";

const ADD_QUIZ = "quiz/ADD_QUIZ";

const SET_QUIZ = "quiz/SET_QUIZ";

const DELETE_QUIZ = "quiz/DELETE_QUIZ";

const ADD_DOCREF = "quiz/ADD_DOCREF";

const initialState = {
  name: "",
  score_texts: {
    60: "우린 친구! 앞으로도 더 친하게 지내요! :)",
    80: "우와! 우리는 엄청 가까운 사이!",
    100: "우와 만점!!! 이 정도면 쌍둥이 아닌가요?!",
  },
  answers: [],
  quiz: [],
  docRef: "",
};

// Action Creators
// export const getQuiz = (quiz_list) => {
//   return { type: GET_QUIZ, quiz_list };
// };
export const getQuiz = (data, docId) => {
  return { type: GET_QUIZ, data, docId };
};

export const addAnswer = (answer) => {
  return { type: ADD_ANSWER, answer };
};

export const resetAnswer = () => {
  return { type: RESET_ANSWER };
};

export const addQuiz = (quiz, answer) => {
  return { type: ADD_QUIZ, quiz, answer };
};

export const setQuiz = (name, quizList) => {
  return { type: SET_QUIZ, name, quizList };
};

export const deleteQuiz = (quiz) => {
  return { type: DELETE_QUIZ, quiz };
};

export const addDocRef = (docRef) => {
  return { type: ADD_DOCREF, docRef };
};

// Firebase Function

export const loadQuizFB = (docId) => {
  return function (dispatch) {
    quiz_db
      .doc(docId)
      .get()
      .then((doc) => {
        // console.log("doc(loadQuizFB): " + JSON.stringify(doc.data()));
        dispatch(getQuiz(doc.data(), docId));
        dispatch(addDocRef(docId));
      });
  };
};

// export const addQuizListFB = (name, quizList) => {
//   // 파이어베이스에 퀴즈리스트와 이름을 객체로 올리는 작업
//   let list = { name: name, quiz: quizList };
//   quiz_db.add(list);
// };

export const addQuizListFB = (name, quizList) => {
  // 파이어베이스에 퀴즈리스트와 이름을 객체로 올리는 작업
  return function (dispatch) {
    let list = { name: name, quiz: quizList };
    // console.log("list.name: " + list.name);
    // console.log("list.quizList: " + JSON.stringify(quizList));
    quiz_db.add(list).then((docRef) => {
      dispatch(addDocRef(docRef.id));
      // console.log("docId: " + docRef.id);
      // let url = "http://localhost:3000/" + docRef.id;
      // console.log("url: " + url);
    });
  };
};

// function KakaoLinkSend() {
//   Kakao.API.request({
//     url: "/v1/api/talk/friends/message/send",
//     data: {
//       template_object: {
//         object_type: "feed",
//         content: {
//           title: "카카오톡 링크 4.0",
//           description: "디폴트 템플릿 FEED",
//           image_url:
//             "http://mud-kage.kakao.co.kr/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png",
//           link: {
//             web_url: "https://developers.kakao.com",
//             mobile_web_url: "https://developers.kakao.com",
//           },
//         },
//         social: {
//           like_count: 100,
//           comment_count: 200,
//         },
//         button_title: "바로 확인",
//       },
//     },
//     success: function (response) {
//       console.log(response);
//     },
//     fail: function (error) {
//       console.log(error);
//     },
//   });
// }

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // case "quiz/GET_QUIZ": {
    //   return { ...state, quiz: action.quiz_list };
    // }
    case "quiz/GET_QUIZ": {
      return {
        ...state,
        name: action.data.name,
        quiz: action.data.quiz,
        docRef: action.docId,
      };
    }

    case "quiz/ADD_ANSWER": {
      return { ...state, answers: [...state.answers, action.answer] };
    }

    case "quiz/RESET_ANSWER": {
      return { ...state, answers: [] };
    }

    case "quiz/ADD_QUIZ": {
      const new_quizList = [
        ...state.quiz,
        { question: action.quiz, answer: action.answer },
      ];
      return { quiz: new_quizList };
      // return {
      //   quiz: [...state.quiz, { question: action.quiz, answer: action.answer }],
      // };
    }

    case "quiz/SET_QUIZ": {
      // const new_state = [{}];
      return { ...state, name: action.name, quiz: action.quizList };
    }

    case "quiz/DELETE_QUIZ": {
      const new_QuizList = state.quiz.filter((l, i) => {
        if (l !== action.quiz) {
          return l;
        }
      });
      return { quiz: new_QuizList };
    }

    case "quiz/ADD_DOCREF": {
      // console.log("action.docRef: " + JSON.stringify(action.docRef));
      return { ...state, docRef: action.docRef };
    }

    default:
      return state;
  }
}
