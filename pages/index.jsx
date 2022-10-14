import Head from 'next/head'
import { Container } from '@chakra-ui/react'
import Hero from 'components/hero'

const Home = () => {
	return (
		<>
			<Head>
				<title></title>
			</Head>

			<Container>
				<Hero />
			</Container>
		</>
	)
}

export default Home
