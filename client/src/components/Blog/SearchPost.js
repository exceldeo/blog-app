import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";

const SearchPost = () => {
  const { query } = useParams();

  useEffect(() => {
    console.log("fetching search results");
    console.log(query);
  }, [query]);

  return (
    <MainLayout>
      <h1>Search results for: {query}</h1>
    </MainLayout>
  );
};

export default SearchPost;
