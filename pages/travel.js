/* eslint-disable @next/next/no-img-element */
import Layout from "components/Layout";
import { fetcher, STRAPI_URL } from "lib";
import { useState } from "react/cjs/react.development";
import useSWR from "swr";

export default function Travelapage() {
  const [query, setQuery] = useState(
    "/api/travels?populate[poster][fields]=formats"
  );
  const [searchValue, setSearchValue] = useState();
  const [searchData, setSearchData] = useState([]);

  const { data: travels, error } = useSWR(query, fetcher);

  function handleSearch() {
    if (searchValue === "") return;
    setQuery(
      `/api/travels?populate[poster][fields]=formats&filters[title][$contains]=${searchValue}`
    );
    setSearchData([searchValue]);
  }

  function removeFilters() {
    setQuery("/api/travels?populate[poster][fields]=formats");
    setSearchData([]);
    setSearchValue("");
  }

  console.log("travel", travels);

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-3">
          <div className="form-control">
            <div className="relative">
              <input
                type="text"
                placeholder="search"
                className="input input-bordered w-full"
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <button
                className="absolute top-0 right-0 rounded-l-none btn"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        {searchData.length > 0 && (
          <div className="badge cursor-pointer" onClick={removeFilters}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-4 h-4 mr-2 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
            {searchData[0]}
          </div>
        )}
        <div className="grid grid-cols-3 gap-5 mt-10">
          {travels?.data.map((travel, index) => (
            <div className="card rounded" key={index}>
              <figure>
                <img
                  className="w-full aspect-video"
                  src={
                    STRAPI_URL +
                    travel.attributes.poster.data.attributes.formats.thumbnail
                      .url
                  }
                  alt={travel.attributes.title}
                />
              </figure>
              <div className="card-body">
                <div className="card-title">{travel.attributes.title}</div>
                <div className="text-sm font-medium text-base-content/60">
                  Rp.{travel.attributes.price}
                </div>
                <div className="card-actions">
                  <button className="btn btn-block btn-ghost">whisilist</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
