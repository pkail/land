import Head from 'next/head';

const Layout = props => <div>
    <Head>
        <title>{props.title}</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta charSet="utf-8" />
		<meta name="description" content={props.description} />
    </Head>
	<div className="justify-center m-12">
	{props.children}
	</div>
</div>;

export default Layout;
