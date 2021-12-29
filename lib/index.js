import axios from "axios";
import { createClient } from "@supabase/supabase-js";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

const fetcher = (url) => axios.get(STRAPI_URL + url).then((r) => r.data);

const fetchWithToken = (url, token) =>
  axios
    .get(STRAPI_URL + url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((r) => r.data);

// Create a single supabase client for interacting with your database
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export { fetcher, STRAPI_URL, fetchWithToken, supabase };
