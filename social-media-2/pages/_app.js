import '../styles/globals.css'
import Layout from './components/layout/Layout'
import "semantic-ui-css/semantic.min.css"


function MyApp({ Component, pageProps }) {
  // function MyApp(appContext) {
  //   console.log(appContext);
  //   const {Component, pageProps} = appContext;
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
