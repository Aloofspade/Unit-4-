
const index  = ({user, followData}) => {

  console.log(user, followData);
  return <div>Home Page</div>
}

export default index

//posts are pageProps
// const index = ({posts}) => {

//   return  <div>
//     {/* {posts && posts.map((post) => {
//       return (
//       <div key={post.id}>
//         <h1>{post.title}</h1>
//         <p>{post.body}</p>
//         <Divider />
//       </div>
//       )
//     })} */}
//   </div>
  
// }

// index.getInitialProps = async (ctx) => {
//   const pageProps = await checkToken(ctx);
//   // try {
//   //   const res = await axios.get("https://jsonplaceholder.typicode.com/posts")
//   //   return {posts: res.data};
//   // } catch (error) {
//   //   return {errorProp: true}
    
//   // }
// }




