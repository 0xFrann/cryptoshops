import Head from "next/head";

interface IDefaultHeadProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  extra?: () => void;
}

const DefaultHead = ({
  title = "",
  description = "Encontrá negocios que aceptan cryptos",
  url = "https://cryptoshops.vercel.app",
  image = "https://cryptoshops.vercel.app/cryptoshops-banner.png",
  extra,
}: IDefaultHeadProps): React.ReactElement => {
  const pageTitle = title ? `${title} - CryptoShops` : "CryptoShops";

  return (
    <Head>
      {/* <!-- HTML Meta Tags --> */}
      <title>{pageTitle}</title>
      <meta name="description" content={description} />

      {/* <!-- Google / Search Engine Tags --> */}
      <meta itemProp="name" content={pageTitle} />
      <meta itemProp="description" content={description} />
      <meta itemProp="image" content={image} />

      {/* <!-- Facebook Meta Tags --> */}
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* <!-- Twitter Meta Tags --> */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* <!-- Meta Tags Generated via http://heymeta.com --></meta> */}

      {extra}
    </Head>
  );
};

export default DefaultHead;
