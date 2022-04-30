import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { convertImage, toBase64 } from "../utils/utils";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Innoloft assignment</title>
        <meta name="description" content="Innoloft frontend assignment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className="flex flex-col">
          <Image
            placeholder="blur"
            height="100"
            width="200"
            src={"https://img.innoloft.com/logo.svg"}
            className="w-fit"
            alt="Kill me"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              convertImage(100, 100)
            )}`}
          />
          <Link href="/product/6781" className="underline decoration-gray-600">
            <a>Go to product page -></a>
          </Link>
        </div>
      </main>
    </div>
  );
}
