import Head from 'next/head'
import { useRecoilValue } from 'recoil'
import { modalState } from '../atoms/modalAtom'
import Banner from '../components/Banner'
import Header from '../components/Header'
import Modal from '../components/Modal'
import Row from '../components/Row'
import useAuth from '../hooks/useAuth'
import { Movie } from '../typings'

interface Props {
  featured: Movie[]
  trending: Movie[]
  topRated: Movie[]
  action: Movie[]
  comedy: Movie[]
  horror: Movie[]
  romance: Movie[]
  documentaries: Movie[]
}

  const Home = ({
  featured,
  action,
  comedy,
  documentaries,
  horror,
  romance,
  topRated,
  trending,
}: Props) => {
  const { loading } = useAuth()
  const showModal = useRecoilValue(modalState)

  if (loading) return null

  return (
    <div
      className={`relative h-screen bg-gradient-to-b lg:h-[140vh] ${
        showModal && '!h-screen overflow-hidden'
      }`}
    >
      <Head>
        <title>Home - NebulaOS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />


      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
        <Banner featured={featured} />
        <section className="md:space-y-24">
          <Row title="Trending Now" movies={trending} />
          <Row title="Top Rated" movies={topRated} />
          <Row title="Action Thrillers" movies={action} />
          {/* My List Component */}
          <Row title="Comedies" movies={comedy} />
          <Row title="Scary Movies" movies={horror} />
          <Row title="Romance Movies" movies={romance} />
          <Row title="Documentaries" movies={documentaries} />
        </section>
      </main>
      {showModal && <Modal />}
    </div>
  )
}

export default Home

export const getServerSideProps = async () => {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://nebula-frontend-kz85.onrender.com"

  const res = await fetch(`${baseUrl}/api/home`)
  const data = await res.json()

  return {
    props: data,
  }
}
