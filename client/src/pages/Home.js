import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_THOUGHTS } from "../utils/queries";
import ThoughtList from "../components/ThoughtList";
const Home = () => {
  // use useQuery hook to make query request
  // This is going to fetch our data
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  // now we destructure the data using optional chaining.
  const thoughts = data?.thoughts || [];
  console.log(thoughts);
  return (
    <main>
      <div className="flex-row justify-space-between">
        <div className="col-12 mb-3">
          {loading ? (
            <div> Loading... </div>
          ) : (
            <ThoughtList thoughts={thoughts} title="Some Feed for Thought(s)" />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;