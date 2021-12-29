import CompleteProfile from "components/CompleteProfile";
import Layout from "components/Layout";
import Stat from "components/Stats";
import { useEffect, useState } from "react";

import useSWR from "swr";
import { fetcher, supabase } from "../lib";

export default function Homepage() {
  const { data, error } = useSWR("/api/movies", fetcher);
  const [createNew, setCreateNew] = useState(false);

  async function getData() {
    const { data: wedding, error } = await supabase
      .from("wedding")
      .select(`judul,  user_id`);

    console.log(wedding);
  }

  useEffect(() => {
    getData();
  }, []);

  if (!data && !error)
    return (
      <div className="p-10 font-medium capitalize text-xl">loading...</div>
    );

  if (error)
    return (
      <div className="p-10">
        <div className="font-medium">
          Server error: error while fetching data...
        </div>
        <button
          className="btn btn-sm mt-5"
          onClick={() => window.location.reload()}
        >
          reload page
        </button>
      </div>
    );

  return (
    <Layout>
      <div>
        {createNew ? (
          <CompleteProfile />
        ) : (
          <>
            <button
              className="btn btn-secondary mt-10"
              onClick={() => setCreateNew(true)}
            >
              create new
            </button>
          </>
        )}
      </div>
    </Layout>
  );
}
