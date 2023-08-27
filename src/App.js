import "./App.css";
import "./Vehicle.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import store from "./store/reduxStore";
import VehiclesPage from "./pages/VehiclesPage";

/**
 * react-query library provides
 *   - improved application performance
 *   - easy caching/refetching
 *   - no need to manage data in global state (redux store)
 */

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // disable refetching queries in the background, at window refocus events
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <VehiclesPage />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
