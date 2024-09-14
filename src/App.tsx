import { MessageCircleMoreIcon } from 'lucide-react';
import InfoWidget from './components/InfoWidget';
import MenuWidget from './components/MenuWidget';
import ProductsTable from './components/ProductsTable';
import { Button } from './components/ui/button';
import UserPanel from './components/UserPanel';
import FormBlock from './components/FormBlock/FormBlock';
// import FormControl from './components/FormControl';

function App() {
  return (
    <div className="flex px-6 py-5 gap-12">
      <aside className="w-96">
        <MenuWidget />
        <InfoWidget />
        <Button variant={'accent'} className="w-full py-8 rounded-2xl gap-2">
          <MessageCircleMoreIcon /> Связаться с нами
        </Button>
      </aside>
      <div>
        <UserPanel />
        <FormBlock />
        <ProductsTable />
      </div>
    </div>
  );
}

export default App;
