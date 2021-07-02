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
  // score_text: {
  //   60: "우린 친구! 앞으로도 더 친하게 지내요! :)",
  //   80: "우와! 우리는 엄청 가까운 사이!",
  //   100: "둘도 없는 단짝이에요! :)",
  // },
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

export const getRankFB = (docRef) => {
  // docRef라는 quiz 문서 이름을 매개변수로 받아옴

  return function (dispatch) {
    dispatch(isLoaded(false));
    // console.log("docId(getRnkFB):" + docId);

    // rank collection에서 docRef 필드의 값이 ${docRef}인 문서들만 불러옴
    rank_db
      .where("docRef", "==", docRef)
      .get()
      .then((docs) => {
        let rank_data = [];

        docs.forEach((doc) => {
          rank_data = [...rank_data, { id: doc.id, ...doc.data() }];
        });

        console.log("==================================================");
        console.log("getRankFB");
        console.log("==================================================");
        console.log("FB_rank_data:\n" + JSON.stringify(rank_data));
        console.log("==================================================");
        console.log("==================================================");

        dispatch(getRank(rank_data));
        dispatch(isLoaded(true));
      });
    // rank_db.get().then((docs) => {
    //   let rank_data = [];

    //   docs.forEach((doc) => {
    //     rank_data = [...rank_data, { id: doc.id, ...doc.data() }];
    //   });

    //   dispatch(getRank(rank_data));
    //   dispatch(isLoaded(true));
    // });
  };
};

export const addRankFB = (rank_info) => {
  return function (dispatch) {
    dispatch(isLoaded(false));

    let rank_data = {
      message: rank_info.message,
      name: rank_info.name,
      score: rank_info.score,
      docRef: rank_info.docRef,
    };

    // console.log("rank_data(addRankFB):" + JSON.stringify(rank_data));

    rank_db.add(rank_data).then((doc) => {
      rank_data = {
        ...rank_data,
        id: doc.id,
        current: true,
        docRef: rank_info.docRef,
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
      let ranking = [...state.ranking, action.rank_info];
      console.log("==================================================");
      console.log("ADD_RANK");
      console.log("==================================================");
      console.log("rank_info:\n" + JSON.stringify(action.rank_info));
      console.log("==================================================");
      console.log("state.ranking:\n" + JSON.stringify(state.ranking));
      console.log("==================================================");
      console.log("합친 데이터:\n" + JSON.stringify(ranking));
      console.log("==================================================");
      console.log("==================================================");

      return {
        ...state,
        ranking: [...state.ranking, action.rank_info],
        // ranking: [
        //   ...state.ranking,
        //   {
        //     message: action.rank_info.message,
        //     name: action.rank_info.name,
        //     score: action.rank_info.score,
        //     docRef: action.rank_info.docRef,
        //     id: action.rank_info.id,
        //     current: action.rank_info.current,
        //   },
        // ],
      };
    }

    case "rank/IS_LOADED": {
      return { ...state, is_loaded: action.loaded };
    }

    case "rank/GET_RANK": {
      // 리덕스에 있던 데이터에 파이어베이스에서 가져온 데이터를 추가해요! 다만, 같은 값이 있으면 안되겠죠??
      // 중복되지 않은 데이터만 추가해줄거예요.
      // id가 같은 지 아닌 지로 데이터를 구분해서 추가해볼게요.

      // 일단 랭킹 데이터를 담을 변수를 만들고, 기존 리덕스 값을 가져다가 넣어줍니다.
      let ranking_data = [...state.ranking];

      // 랭킹 데이터의 id 배열을 하나 만들어줍니다.
      const rank_ids = state.ranking.map((r, i) => {
        return r.id;
        // return r;
      });

      // console.log("state:" + JSON.stringify(state));
      // console.log("state.ranking:" + JSON.stringify(state.ranking));
      // 콘솔로 확인해볼까요! :)
      // console.log("rank_ids(GET_RANK): " + JSON.stringify(rank_ids));

      // 리덕스에 없는 데이터만 가져오기
      const rank_data_fb = action.rank_list.filter((r, i) => {
        // 가지고 온 값의 id가 리덕스에 있는 아이디 배열에 없으면 추가해요!
        if (rank_ids.indexOf(r.id) === -1) {
          // 배열에도 이렇게 스프레드 문법을 사용할 수 있습니다. :) (다른 방법으로 추가하셔도 됩니다.)
          ranking_data = [...ranking_data, r];
        }
      });

      // 데이터 확인해보기!
      // console.log("ranking_data(GET_RANK)):" + JSON.stringify(ranking_data));

      console.log("==================================================");
      console.log("GET_RANK");
      console.log("==================================================");
      console.log("rank_ids(기존 리덕스 스토어의 id들):\n" + rank_ids);
      console.log("==================================================");
      // console.log(
      //   "ranking_data(기존 리덕스 스토어):\n" + JSON.stringify(ranking_data)
      // );
      const test = state.ranking.map((r, i) => {
        return r;
      });
      console.log("state.ranking:\n" + JSON.stringify(test));
      console.log("==================================================");
      console.log(
        "action.rank_list(FB에서 가져온 랭킹):\n" +
          JSON.stringify(action.rank_list)
      );
      console.log("==================================================");
      console.log("==================================================");

      return { ...state, ranking: ranking_data };
    }

    default:
      return state;
  }
}
