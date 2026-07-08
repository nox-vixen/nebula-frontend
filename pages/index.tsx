import Head from "next/head";
import { useRecoilValue } from "recoil";
import { modalState } from "../atoms/modalAtom";
import Banner from "../components/Banner";
import Header from "../components/Header";
import Modal from "../components/Modal";
import Row from "../components/Row";
import useAuth from "../hooks/useAuth";
import { NebulaSearchResult } from "../models/NebulaSearchResult";

interface HomeSection {
  title: string;
  type: string;
  items: NebulaSearchResult[];
}

interface Props {
  banner: NebulaSearchResult[];
  sections: HomeSection[];
}

export default function Home({ banner, sections }: Props) {
  console.log("Sections:", sections.map(s => ({ title: s.title, items: s.items.length })));
  const { loading } = useAuth();
  const showModal = useRecoilValue(modalState);

  if (loading) return null;

  return (
    <div
      className={`relative h-screen bg-gradient-to-b lg:h-[140vh] ${
        showModal && "!h-screen overflow-hidden"
      }`}
    >
      <Head>
        <title>Home - NebulaOS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
        <Banner featured={banner} />

        <section className="md:space-y-24">
          {sections.map((section) => (
            <Row
              key={section.title}
              title={section.title}
              movies={section.items}
            />
          ))}
        </section>
      </main>

      {showModal && <Modal />}
    </div>
  );
}

export async function getServerSideProps({ req }: any) {
  const protocol =
    process.env.NODE_ENV === "development" ? "http" : "https";

  const host = req.headers.host;
  const baseUrl = `${protocol}://${host}`;

  try {
    const res = await fetch(`${baseUrl}/api/home`);
    const json = await res.json();

    return {
      props: {
        banner: json.sections?.banner ?? [],
        sections: json.sections?.sections ?? [],
      },
    };
  } catch {
    return {
      props: {
        banner: [],
        sections: [],
      },
    };
  }
}
