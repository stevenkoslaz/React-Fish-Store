import { StoreProvider } from "./Context/StoreContext";
import ProductList from "./Components/ProductList/ProductList";
import ShoppingCart from "./Components/ShoppingCart/ShoppingCart";
import Inventory from "./Components/Inventory/Inventory";
import Credits from "./Components/Credits/Credits";

import "./App.css";

const App = () => {
  return (
    <StoreProvider>
      <div className="app">
        <main className="main-content">
          <ProductList />
          <ShoppingCart />
          <Inventory />
        </main>
        <Credits />
      </div>
    </StoreProvider>
  );
};

export default App;
