import { CREATE_COMMENT, FETCH_COMMENTS } from "../types";
import { getComments, useCreateComment } from "../../api/comment";

export const fetchComments = ({ id, page = 1 }) => {
  return async (dispatch) => {
    try {
      const comments = await getComments({ id, page });

      if (page > 1) {
        const additionalComments = await getComments({ id, page: page - 1 });
        comments.results = [...additionalComments.results, ...comments.results];
      }

      dispatch({
        type: FETCH_COMMENTS,
        payload: comments,
      });
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };
};

export const createComment = (comment) => {
  return async (dispatch) => {
    try {
      await useCreateComment(comment);
      dispatch({
        type: CREATE_COMMENT,
      });
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };
};
