import ProductsTable from './components/ProductsTable';
import UserPanel from './components/UserPanel';
import SidePanel from './components/SidePanel';
// import FormControl from './components/FormControl';

function App() {
  return (
    <div className="flex px-6 py-5 gap-12 max-w-screen-xl mx-auto">
      <SidePanel />
      <div className="w-full">
        <UserPanel />
        <ProductsTable />
      </div>
    </div>
  );
}

export default App;
