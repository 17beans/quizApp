// Actions

// 퀴즈 데이터 가져온다
const GET_QUIZ = "quiz/GET_QUIZ";
// 유저의 응답(퀴즈 답)을 추가한다
const ADD_ANSWER = "quiz/ADD_ANSWER";
// 응답을 초기화 해준다
const RESET_ANSWER = "quiz/RESET_ANSWER";

const ADD_QUIZ = "quiz/ADD_QUIZ";

const initialState = {
  name: "르탄이",
  score_texts: {
    60: "우린 친구! 앞으로도 더 친하게 지내요! :)",
    80: "우와! 우리는 엄청 가까운 사이!",
    100: "우와, 만점!!! 이 정도면 쌍둥이 아닌가요?!",
  },
  answers: [],
  quiz: [{ question: "르탄이는 1살이다.", answer: "O" }],
};

// Action Creators
// export const getQuiz = (quiz_list) => {
//   return { type: GET_QUIZ, quiz_list };
// };
export const getQuiz = () => {
  return { type: GET_QUIZ };
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

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // case "quiz/GET_QUIZ": {
    //   return { ...state, quiz: action.quiz_list };
    // }
    case "quiz/GET_QUIZ": {
      return { ...state };
    }

    case "quiz/ADD_ANSWER": {
      return { ...state, answers: [...state.answers, action.answer] };
    }

    case "quiz/RESET_ANSWER": {
      return { ...state, answers: [] };
    }

    case "quiz/ADD_QUIZ": {
      return { ...state, question: action.question, answer: action.answer };
    }

    default:
      return state;
  }
}
