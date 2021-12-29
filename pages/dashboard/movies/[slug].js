/* eslint-disable @next/next/no-img-element */
import Layout from "components/Layout";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";
import { fetcher, STRAPI_URL } from "../../../lib";

export default function Moviepage() {
  const { query } = useRouter();
  const { data: movie, error } = useSWR(
    `/api/movies/${query.slug}?populate[poster][fields]=url`,
    fetcher
  );

  console.log(movie);

  useEffect(() => {
    console.log(query);
  }, []);
  return (
    <Layout>
      <img
        className="w-full aspect-video"
        src={STRAPI_URL + movie?.data.attributes.poster.data?.attributes.url}
        alt=""
      />
    </Layout>
  );
}
