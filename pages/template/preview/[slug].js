import Layout from "components/Layout";
import { useRouter } from "next/router";

export default function PreviewPage() {
  const router = useRouter();

  return (
    <Layout>
      <button className="btn btn-sm" onClick={() => router.back()}>
        back
      </button>
    </Layout>
  );
}
