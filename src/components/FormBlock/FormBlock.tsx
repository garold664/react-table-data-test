import {
  FileUpIcon,
  FolderPlusIcon,
  FolderSymlinkIcon,
  XIcon,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { Button } from '../ui/button';
import { Product } from '../../types/types';
import { useRef } from 'react';

interface FormBlockProps {
  setTableData: React.Dispatch<React.SetStateAction<Product[]>>;
  tableData: Product[];
}

const exportData = (tableData: Product[]) => () => {
  if (!tableData || tableData.length === 0) return;
  //** Throw an Error! */
  const textFile = new Blob([JSON.stringify(tableData, null, 2)], {
    type: 'text/plain;charset=utf-8',
  });

  const href = URL.createObjectURL(textFile);
  const link = document.createElement('a');
  link.target = '_blank';
  link.download = 'data.json';
  link.href = href;
  link.click();
};

const onFileInput =
  (setTableData: React.Dispatch<React.SetStateAction<Product[]>>) =>
  (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== 'application/json') return;
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const jsonData = JSON.parse(e.target?.result as string);
      if (!jsonData || jsonData.length === 0 || !Array.isArray(jsonData))
        //** Validate for keys and values types */
        //** Throw an Error! */
        return;

      setTableData(jsonData);
    };
    reader.readAsText(file);
  };
export default function FormBlock({ setTableData, tableData }: FormBlockProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
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
        <Button
          type="button"
          className="space-x-2"
          onClick={exportData(tableData)}
        >
          <FileUpIcon fill="white" stroke="black" size={16} />{' '}
          <span>Экспорт</span>
        </Button>
      </div>
      <footer className="flex items-center mt-7 mb-7 border-t-2 border-b-2 border-slate-200">
        <Button
          type="button"
          variant={'ghost'}
          className="flex gap-2"
          onClick={() => fileInputRef.current?.click()}
        >
          <FolderSymlinkIcon size={18} />
          <span>Загрузить данные из csv</span>
        </Button>

        <input
          ref={fileInputRef}
          type="file"
          name=""
          id=""
          className="hidden"
          onChange={onFileInput(setTableData)}
        />
        <Button type="button" variant={'ghost'} className="flex gap-2">
          <FolderPlusIcon size={18} />
          <span>Изменить данные</span>
        </Button>
        <div className="border-r-2 h-6 ml-auto mr-12"></div>
        <Button
          type="button"
          variant={'ghost'}
          className="space-x-2"
          onClick={() => setTableData([])}
        >
          <span>Очистить</span>
          <XIcon fill="white" stroke="black" size={16} />
        </Button>
      </footer>
    </form>
  );
}
