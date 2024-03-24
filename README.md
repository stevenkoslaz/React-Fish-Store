# My React App Architecture

This document outlines the main architecture, components, and logic of my Fish Store application, focusing on how the app is structured and how the components interact with each other.

## Component Hierarchy

### `App`

The root component that encapsulates the entire application. It's responsible for rendering the main layout, including the `ProductList`, `ShoppingCart`, `Inventory`, and `Credits` components.

### `StoreProvider`

A context provider component that wraps the app and provides a global state to all components. It uses the React Context API for state management, facilitating state sharing across the application.

### `Storage`

A utility class for interacting with `localStorage`. This class provides methods for CRUD operations on products and cart items, ensuring data persistence across sessions.

## Main Components

### `ProductList`

- **Purpose**: Displays a list of products.
- **State/Props**: Retrieves product data from the global context provided by `StoreProvider`.
- **Interactions**:
  - On mount, it loads products from `products.json` (using an import statement) and updates the global state.
  - It renders `ProductItem` components for each product.

### `ProductItem`

- **Purpose**: Represents a single product.
- **State/Props**: Receives individual product details as props from `ProductList`.
- **Interactions**:
  - Allows users to add the product to the cart.

### `ShoppingCart`

- **Purpose**: Manages and displays the shopping cart, allowing users to see their selected products and total price.
- **State/Props**: Utilizes the cart state from the global context for displaying cart items.
- **Interactions**:
  - Users can increase or decrease the quantity of the products in the cart or remove them entirely.

### `CartItem`

- **Purpose**: Represents an individual item in the shopping cart.
- **State/Props**: Receives cart item details as props.
- **Interactions**:
  - Allows users to modify the quantity of an item directly from the cart or remove it.

### `Inventory`

- **Purpose**: Allows for the management of products in the store, including adding new products and loading sample data.
- **State/Props**: Interacts with the global state for product management.
- **Interactions**:
  - Provides UI for adding new products to the store.
  - Includes `LoadSampleData` button for populating the store with sample products.

### `EditableProductForm`

- **Purpose**: Used within the `Inventory` component for editing existing products.
- **State/Props**: Receives a product object as prop for editing.
- **Interactions**:
  - Allows updating product details like title, price, and description.

### `AddNewProductForm`

- **Purpose**: Part of the `Inventory` component, allowing the addition of new products to the store.
- **Interactions**:
  - Captures new product details from the user and adds the new product to the global state and `localStorage`.

### `LoadSampleData`

- **Purpose**: Provides a button to load sample products into the product list and reset the `EditableProductForm`.
- **Interactions**:
  - On click, it imports `products.json` and updates the product list in the global state. It also triggers a reset of the `EditableProductForm` to ensure it reflects the loaded sample data.

### `Credits`

- **Purpose**: Displays credit information or acknowledgments.
- **Interactions**:
  - Static component with no dynamic interactions.

## State Management

The app utilizes React's Context API for state management, encapsulated within the `StoreContext`. It manages the application's product list and cart items, facilitating interaction between components and global state.

## Utility Class

### `Storage`

- **Purpose**: Manages `localStorage` for persisting the product list and cart items.
- **Methods**:
  - `addProduct`, `loadProducts`: For product management.
  - `loadCartItems`: For cart item management.
