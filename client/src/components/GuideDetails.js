import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { getGuideQuery } from "../queries/queries";

import UpdateGuide from "./UpdateGuide";

function GuideDetails(props) {
  const [showUpdateForm, setShowUpdateFrom] = useState(false);
  const { loading, error, data } = useQuery(getGuideQuery, {
    variables: { id: props.guideId },
  });

  const displayGuideDetails = () => {
    if (loading) {
      return <div>Guide data loading...</div>;
    }

    if (error) {
      return <div>There was an error, {error}</div>;
    }

    if (data && props.guideId) {
      const { guide } = data;
      return (
        <div>
          <div>
            <h2>{guide.title}</h2>
            <p>{guide.postDate}</p>
            <p>{guide.author}</p>
            <p>{guide.tags}</p>
            <img src={guide.imageURL} alt={guide.title}></img>
          </div>
          <button
            onClick={() => {
              setShowUpdateFrom(true);
            }}
          >
            Update Guide
          </button>
        </div>
      );
    } else {
      return <div>No guide selected...</div>;
    }
  };

  return (
    <div id="book-details">
      {displayGuideDetails()}
      {showUpdateForm && <UpdateGuide />}
    </div>
  );
}

export default GuideDetails;
