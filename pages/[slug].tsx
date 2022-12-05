import type {GetStaticPaths, GetStaticProps} from 'next'
import {Mineral} from "../misc/data/repository/minerals";
import {api} from "../misc/data/repository";
import Header from "../components/organisms/header";
import Title from "../components/molecules/title";
import Footer from "../components/organisms/footer";
import Breadcrumbs from "../components/molecules/breadcrumbs";

export const getStaticProps: GetStaticProps = async (context) => {
  const slug:string = context.params.slug as string;
  const mineral:Mineral|undefined = await api.minerals().findBySlug(slug);
  if (!mineral) {
    return {
      notFound: true
    }
  }
  return {
    props: {
      mineral
    },
    revalidate: 60,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const minerals:Mineral[] = await api.minerals().findAll();
  return {
    paths: minerals.map(x => ({params:{ slug: x.slug }})),
    fallback: 'blocking',
  }
}

interface ProductPageProps {
  mineral:Mineral
}

function Product(props:ProductPageProps):JSX.Element {
  return (
      <div className="bg-white">
        <Header />

        <div>
          <Breadcrumbs  currentTitle={props.mineral.name} parents={[{href:'/',title:'Minerales'}]}/>

          <main className="max-w-2xl mx-auto px-4 lg:max-w-7xl lg:px-8">
            <Title  title={props.mineral.name} subtitle={props.mineral.description}/>

            <div className="pt-12 pb-24 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">

              <section aria-labelledby="product-heading" className="mt-6 lg:mt-0 lg:col-span-2 xl:col-span-3">
                <h2 id="product-heading" className="sr-only">
                  Products
                </h2>

                <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">

                </div>
              </section>
            </div>
          </main>
          <Footer />

        </div>
      </div>
  )
}

export default Product;


