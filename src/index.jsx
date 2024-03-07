/*** APP ***/
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  gql,
  useQuery,
  useLazyQuery,
  useApolloClient,
} from "@apollo/client";

import { link } from "./link.js";
import { Layout } from "./layout.jsx";
import "./index.css";
import { cacheSizes } from '@apollo/client/utilities';

cacheSizes["inMemoryCache.executeSelectionSet"] = 100000;

//cacheSizes.reset()



const ALL_PEOPLE = gql`
  query AllPeople {
    people {
      id
      name
    }
  }
`;

const ONE_PERSON = gql`
  query onePerson {
    onePerson {
      id
      name
    }
  }
`;

function App() {
  const { loading, data } = useQuery(ALL_PEOPLE);
  const [load, { data: otherData }] = useLazyQuery(ONE_PERSON);
  const clientVersion = useApolloClient().version

  return (
    <main>
      <h3>{clientVersion}</h3>
      <div className="add-person">
        <label htmlFor="name">Name</label>
        <button
          onClick={() => {
            load();
          }}
        >
          Add person
        </button>
      </div>
      <h2>Names</h2>
      {loading ? (
        <p>Loading…</p>
      ) : (
        <>
          <div>
            <ul>
              <li key={otherData?.onePerson.id}>{otherData?.onePerson.name}</li>
            </ul>
          </div>
          <div>
            <ul>
              {data?.people.slice(0,10).map((person) => (
                <li key={person.id}>{person.name}</li>
              ))}
            </ul>
          </div>
        </>
      )}
  <pre>
      {JSON.stringify(client.getMemoryInternals(), null, 2)}</pre>
    </main>
  );
}

const client = new ApolloClient({
  cache: new InMemoryCache({
    resultCacheMaxSize: Math.pow(2,20)
  }),
  link,
});


const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <ApolloProvider client={client}>
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
        </Route>
      </Routes>
    </Router>
  </ApolloProvider>,
);
