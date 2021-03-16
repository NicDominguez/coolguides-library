import React from "react";
import { useMutation } from "@apollo/client";

import { updateGuideMutation, getGuideQuery } from "../queries/queries";

//Salad Guide
//https://i.redd.it/opr525vfqhm61.jpg
//Mar 11, 2021
//NoelaniSpell
//food

function UpdateGuide() {
  const [updateGuide, { called, error }] = useMutation(updateGuideMutation);
  const [state, setState] = React.useState({
    title: "",
    imageURL: "",
    postDate: "",
    author: "",
    tags: "",
  });

  const submitForm = async (e) => {
    e.preventDefault();
    await updateGuide({
      variables: {
        title: state.title,
        imageURL: state.imageURL,
        postDate: state.postDate,
        author: state.author,
        tags: state.tags,
      },
      refetchQueries: [{ query: getGuideQuery }],
    });
    console.log(called, error);
  };

  return (
    <form id="update-guide" onSubmit={submitForm}>
      <div className="field">
        <label>Guide Title:</label>
        <input
          type="text"
          onChange={(e) =>
            setState((prevState) => ({ ...prevState, title: e.target.value }))
          }
          value={state.title}
        />
      </div>
      <div className="field">
        <label>Image URL:</label>
        <input
          type="text"
          onChange={(e) =>
            setState((prevState) => ({
              ...prevState,
              imageURL: e.target.value,
            }))
          }
          value={state.imageURL}
        />
      </div>
      <div className="field">
        <label>Post Date:</label>
        <input
          type="text"
          onChange={(e) =>
            setState((prevState) => ({
              ...prevState,
              postDate: e.target.value,
            }))
          }
          value={state.postDate}
        />
      </div>
      <div className="field">
        <label>Author:</label>
        <input
          type="text"
          onChange={(e) =>
            setState((prevState) => ({ ...prevState, author: e.target.value }))
          }
          value={state.author}
        />
      </div>
      <div className="field">
        <label>Tags:</label>
        <input
          type="text"
          onChange={(e) =>
            setState((prevState) => ({ ...prevState, tags: e.target.value }))
          }
          value={state.tags}
        />
      </div>
      <button type="submit">Update</button>
    </form>
  );
}

export default UpdateGuide;
