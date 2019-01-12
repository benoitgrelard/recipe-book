import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { getToken } from './session';

const httpLink = new HttpLink({
	uri: 'https://api.graph.cool/simple/v1/cjqsl53vl3nkx0143br8sukhk',
});

const authLink = setContext(() => {
	const token = getToken();
	return token
		? {
				headers: {
					authorization: `Bearer ${token}`,
				},
		  }
		: {};
});

const authHttpLink = authLink.concat(httpLink);

export const apolloClient = new ApolloClient({
	link: authHttpLink,
	cache: new InMemoryCache(),
});
