/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
import Router from "next/router";
import { useEffect, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import Layout from "components/Layout";
import useUser from "hooks/useUser";
import { fetcher, STRAPI_URL } from "lib";

export default function Dashboardpage() {
  const [url, setUrl] = useState(
    "/api/movies?fields=title,price&populate[poster][fields]=url&populate[author][fields]=username,email"
  );
  const [filter, setFilter] = useState([]);
  const { data: movies, error } = useSWR(url, fetcher);
  const { user } = useUser();

  function handleFilter() {
    if (filter.includes(user.username)) return;
    setFilter((prev) => [...prev, user.username]);
    setUrl(
      `/api/movies?fields=title,price&populate[poster][fields]=url&populate[author][fields]=username,email&filters[author][username]=${user.username}`
    );
  }

  function removeFilters(index) {
    let updateData = [...filter];
    updateData.splice(index, 1);

    console.log("the update data", updateData);

    setUrl(
      "/api/movies?fields=title,price&populate[poster][fields]=url&populate[author][fields]=username,email"
    );
    setFilter(updateData);
  }

  if (error) return <div className="p-10">error while fetching data...</div>;

  return (
    <Layout>
      filter :
      {filter?.map((data, index) => (
        <div
          key={index}
          className="btn btn-sm btn-ghost px-4"
          onClick={() => removeFilters(index)}
        >
          <svg
            className="w-4 h-4 mr-2 -mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
          {data}
        </div>
      ))}
      <button className="btn" onClick={handleFilter}>
        {user?.username}
      </button>
      {movies?.data.length > 0 ? (
        <div className="grid grid-cols-4 gap-8">
          {movies?.data.map((movie, index) => (
            <div key={index} className="card">
              {movie.attributes.poster.data && (
                <figure>
                  <img
                    className="w-full aspect-square"
                    src={
                      STRAPI_URL + movie.attributes.poster.data?.attributes.url
                    }
                    alt=""
                  />
                </figure>
              )}
              <div className="card-body">
                <div className="card-title">{movie.attributes.title}</div>
                <span className="text-xs ml-2 font-semibold">
                  {movie.attributes.author.data?.attributes.username}
                </span>
                <div className="card-actions">
                  <button className="btn btn-ghost btn-block">
                    Rp{movie.attributes.price || "-"} Add to cart
                  </button>
                  <div
                    className="link w-full text-center"
                    onClick={() => Router.push("dashboard/movies/" + movie.id)}
                  >
                    View
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>Not found :)</div>
      )}
    </Layout>
  );
}
