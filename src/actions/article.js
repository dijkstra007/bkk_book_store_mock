import axios from "axios";
import * as API from "../constants/apiURL";

export const createArticle = data => {
    return new Promise(async (resolve, reject) => {
      try {
        let res = await axios({
          method: "post",
          url: API.CREATE_ARTICLE,
          data
        });
        console.log("createArticle complete", res);
        resolve(res.data);
      } catch (err) {
        console.log("createArticle err ", err);
        reject(false);
      }
    });
  };