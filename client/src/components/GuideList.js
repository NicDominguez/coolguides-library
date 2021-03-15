import React from "react";
import { useQuery } from "@apollo/client";

import { getAllGuidesQuery } from "../queries/queries";
import GuideDetails from "./GuideDetails";

function GuideList(props) {
  const [state, setState] = React.useState({ selected: null });
  const { loading, error, data } = useQuery(getAllGuidesQuery);

  const displayGuides = () => {
    if (loading) {
      return <div>Loading guides...</div>;
    } else if (error) {
      return <div>There was an error, {error}</div>;
    } else {
      return data.allGuides.map((guide) => {
        return (
          <li
            key={guide.id}
            onClick={(e) => {
              setState({ selected: guide.id });
            }}
          >
            <p>{guide.title}</p>
            <img src={guide.imageURL} alt={guide.title}></img>
          </li>
        );
      });
    }
  };

  return (
    <div>
      <ul id="book-list">{displayGuides()}</ul>
      <GuideDetails guideId={state.selected} />
    </div>
  );
}

export default GuideList;
