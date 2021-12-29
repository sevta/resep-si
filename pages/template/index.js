/* eslint-disable @next/next/no-img-element */
import Layout from "components/Layout";
import { fetcher, STRAPI_URL } from "lib";
import Link from "next/link";
import useSWR from "swr";

export default function TemplatePage() {
  const { data: templates, error } = useSWR(
    "/api/templates?populate[image][fields]=formats",
    fetcher
  );

  console.log("template", templates);
  return (
    <Layout>
      <div className="grid grid-cols-4 gap-5">
        {templates?.data.map((template, index) => (
          <div className="card rounded-2xl" key={index}>
            <figure>
              <img
                className="w-full aspect-square"
                src={
                  STRAPI_URL +
                  template.attributes.image.data.attributes.formats.large.url
                }
                alt=""
              />
            </figure>
            <div className="card-body justify-end">
              <div className="card-title">
                {template.attributes.name}
                <div className="font-semibold"></div>
                <span className="badge badge-sm font-normal">
                  Rp {template.attributes.price}
                </span>
              </div>
              <div className="card-actions ">
                <div className="btn btn-secondary btn-block ">
                  Beli sekarang
                </div>
                <div className="w-full flex items-center justify-center">
                  <Link href={`/template/preview/${template.id}`} passHref>
                    <div className="link">preview</div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
