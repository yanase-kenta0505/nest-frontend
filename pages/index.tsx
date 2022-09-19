import type { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { urqlClient } from '../src/libs/gql-requests'
import gql from 'graphql-tag'

type Props = {
  posts: {
    id: string
    title: string
  }[]
}

const Home: NextPage<Props> = (props) => {
  return (
    <div className={styles.container}>
     <Head>
       <title>Create Next App</title>
       <meta name="description" content="Generated by create next app" />
       <link rel="icon" href="/favicon.ico" />
     </Head>

     <main className={styles.main}>
        <h1 className={styles.title}>Hello, Graphql</h1>
        <ul className={styles.grid}>
          {props.posts.map(post => (
            <li className={styles.title} key={post.id}>
            id: {post.id} title: {post.title}
          </li>
          ))}
        </ul>

       <p className={styles.description}>
         Get started by editing{" "}
         <code className={styles.code}>pages/index.tsx</code>
       </p>

       <div className={styles.grid}>
         <a href="https://nextjs.org/docs" className={styles.card}>
           <h2>Documentation &rarr;</h2>
           <p>Find in-depth information about Next.js features and API.</p>
         </a>

         <a href="https://nextjs.org/learn" className={styles.card}>
           <h2>Learn &rarr;</h2>
           <p>Learn about Next.js in an interactive course with quizzes!</p>
         </a>

         <a
           href="https://github.com/vercel/next.js/tree/canary/examples"
           className={styles.card}
         >
           <h2>Examples &rarr;</h2>
           <p>Discover and deploy boilerplate example Next.js projects.</p>
         </a>

         <a
           href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
           className={styles.card}
         >
           <h2>Deploy &rarr;</h2>
           <p>
             Instantly deploy your Next.js site to a public URL with Vercel.
           </p>
         </a>
       </div>
     </main>

     <footer className={styles.footer}>
       <a
         href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
         target="_blank"
         rel="noopener noreferrer"
       >
         Powered by{" "}
         <span className={styles.logo}>
           <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
         </span>
       </a>
     </footer>
   </div>
 );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  try {
    const client = await urqlClient()
    const postsQuery = gql`
      query {
        posts {
          id
          title
        }
      }
      `
      const result = await client.query(postsQuery, {}).toPromise()

      return {
        props: {
          posts: result.data.posts
        }
      }
  } catch (error) {
    console.log(error)
    return {
      notFound: true
    }
  }
};

export default Home;