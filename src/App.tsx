import MenuWidget from './components/MenuWidget';
import ProductsTable from './components/ProductsTable';

function App() {
  return (
    <div className="flex px-6 py-5 gap-12">
      <aside className="w-96">
        <MenuWidget />
      </aside>
      <div>
        <ProductsTable />
      </div>
    </div>
  );
}

export default App;
