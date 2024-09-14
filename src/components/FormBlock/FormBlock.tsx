import { FileUpIcon, FolderPlusIcon, FolderSymlinkIcon } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { Button } from '../ui/button';

export default function FormBlock() {
  return (
    <form action="" className="">
      <section className="flex gap-3 mb-3">
        <div className="bg-white rounded-2xl px-4 py-2 space-x-4 shadow-sm box-content">
          <label htmlFor="barcode">Баркод</label>
          <input
            id="barcode"
            className="bg-muted-light p-4 rounded-2xl w-40"
            type="text"
            placeholder="5643242134323099"
          />
        </div>
        <div className="bg-white rounded-2xl px-4 py-2 space-x-4 shadow-sm box-content">
          <label htmlFor="article">Артикул</label>
          <input
            id="article"
            className="bg-muted-light p-4 rounded-2xl w-44"
            type="text"
            placeholder="ДжЖСинМом0823"
          />
        </div>
        <div className="bg-white rounded-2xl px-4 py-2 space-x-4 shadow-sm box-content">
          <label htmlFor="article">Размер</label>
          <input
            id="article"
            className="bg-muted-light p-4 rounded-2xl w-14 text-center"
            type="number"
            placeholder="44"
          />
        </div>
        <div className="bg-white rounded-2xl px-4 py-2 shadow-sm box-content">
          <label className="text-slate-400" htmlFor="article">
            Категория
          </label>

          <Select>
            <SelectTrigger className="space-x-4 w-full p-0">
              <SelectValue placeholder="Джинсы" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Шорты</SelectItem>
              <SelectItem value="dark">Рубашка</SelectItem>
              <SelectItem value="system">Кардиган</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>
      <div className="flex gap-2">
        <Button variant={'accent'}>Сформировать</Button>
        <Button className="space-x-2">
          <FileUpIcon fill="white" stroke="black" size={16} />{' '}
          <span>Экспорт</span>
        </Button>
      </div>
      <footer className="flex mt-7 mb-7 border-t-2 border-b-2 border-slate-200">
        <Button variant={'ghost'} className="flex gap-2">
          <FolderSymlinkIcon size={18} />
          <span>Загрузить данные из csv</span>
        </Button>
        <Button variant={'ghost'} className="flex gap-2">
          <FolderPlusIcon size={18} />
          <span>Изменить данные</span>
        </Button>
      </footer>
    </form>
  );
}
