import { firestore } from "../../firebase";

const rank_db = firestore.collection("rank");

// Action

// 유저 이름을 바꾼다
const ADD_USER_NAME = "rank/ADD_USER_NAME";
// 유저 메시지를 바꾼다
const ADD_USER_MESSAGE = "rank/ADD_USER_MESSAGE";
// 랭킹정보를 추가한다
const ADD_RANK = "rank/ADD_RANK";
// 랭킹정보를 가져온다
const GET_RANK = "rank/GET_RANK";

const IS_LOADED = "rank/IS_LOADED";

const initialState = {
  user_name: "",
  user_message: "",
  user_score: "",
  score_text: {
    60: "우린 친구! 앞으로도 더 친하게 지내요! :)",
    80: "우와! 우리는 엄청 가까운 사이!",
    100: "둘도 없는 단짝이에요! :)",
  },
  ranking: [],
  is_loaded: false,
};

// Action Creators
export const addUserName = (user_name) => {
  return { type: ADD_USER_NAME, user_name };
};

export const addUserMessage = (user_message) => {
  return { type: ADD_USER_MESSAGE, user_message };
};

export const addRank = (rank_info) => {
  return { type: ADD_RANK, rank_info };
};

export const getRank = (rank_list) => {
  return { type: GET_RANK, rank_list };
};

export const isLoaded = (loaded) => {
  return { type: IS_LOADED, loaded };
};

export const getRankFB = () => {
  return function (dispatch) {
    dispatch(isLoaded(false));

    // docId가 docId인 문서만 가져올 것
    rank_db.get().then((docs) => {
      let rank_data = [];

      docs.forEach((doc) => {
        rank_data = [...rank_data, { id: doc.id, ...doc.data() }];
      });

      dispatch(getRank(rank_data));
      dispatch(isLoaded(true));
    });
  };
};

export const addRankFB = (rank_info) => {
  return function (dispatch) {
    dispatch(isLoaded(false));

    let rank_data = {
      message: rank_info.message,
      name: rank_info.name,
      score: rank_info.score,
      docId: rank_info.docId,
    };
    rank_db.add(rank_data).then((doc) => {
      rank_data = {
        ...rank_data,
        id: doc.id,
        docId: rank_info.docId,
        current: true,
      };
      dispatch(addRank(rank_data));
    });
  };
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "rank/ADD_USER_NAME": {
      return { ...state, user_name: action.user_name };
    }

    case "rank/ADD_USER_MESSAGE": {
      return { ...state, user_message: action.user_message };
    }

    case "rank/ADD_RANK": {
      return {
        ...state,
        ranking: [...state.ranking, action.rank_info],
        docId: action.docId,
      };
    }

    case "rank/IS_LOADED": {
      return { ...state, is_loaded: action.loaded };
    }

    case "rank/GET_RANK": {
      let ranking_data = [...state.ranking];

      const rank_ids = state.ranking.map((r, i) => {
        return r.id;
      });

      console.log("rank_ids: " + rank_ids);

      const rank_data_fb = action.rank_list.filter((r, i) => {
        if (rank_ids.indexOf(r.id) === -1) {
          ranking_data = [...ranking_data, r];
        }
      });

      return { ...state, ranking: ranking_data };
    }

    default:
      return state;
  }
}
