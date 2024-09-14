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
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../components/ui/form';
import * as z from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
interface FormBlockProps {
  setTableData: React.Dispatch<React.SetStateAction<Product[]>>;
  tableData: Product[];
}

const formSchema = z
  .object({
    barcode: z.string(),
    category: z.string(),
    article: z.string(),
    size: z.coerce.number().gte(0, {
      message: 'Размер должен быть больше нуля',
    }),
  })
  .refine(
    (data) => {
      if (
        data.barcode ||
        data.article ||
        data.category !== 'Все' ||
        data.size > 0
      )
        return true;
      else return false;
    },
    {
      message: 'Хотя бы одно поле должно быть заполнено',
      path: ['barcode'],
    }
  );

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

const categories = [
  'Джинсы',
  'Шорты',
  'Кардиган',
  'Брюки',
  'Рубашка',
  'Костюм',
  'Цепочка',
  'Кольцо',
];

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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      barcode: '',
      category: 'Все',
      article: '',
      size: 0,
    },
  });

  const handleSubmit = ({
    barcode,
    category,
    article,
    size,
  }: z.infer<typeof formSchema>) => {
    // console.log(article, category);
    setTableData(() => {
      let newData: Product[] = [...tableData];
      newData =
        size > 0
          ? newData.filter((product) => {
              const firstSize = Number(product.size.split('-')[0]);
              const lastSize = Number(product.size.split('-')[1]);
              if (!lastSize) return firstSize === size;
              return firstSize <= size && lastSize >= size;
            })
          : newData;
      console.log(newData);
      newData = barcode
        ? newData.filter((product) => product.barcode === barcode)
        : newData;
      console.log(newData);
      newData = article
        ? newData.filter((product) => product.type === article)
        : newData;
      console.log(newData);
      newData =
        category !== 'Все'
          ? newData.filter((product) => product.name === category)
          : newData;
      console.log(newData, category);
      return newData;
    });
  };
  return (
    <Form {...form}>
      <form action="" className="" onSubmit={form.handleSubmit(handleSubmit)}>
        <section className="flex gap-3 mb-3">
          <FormField
            name="barcode"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Баркод</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="barcode"
                    type="text"
                    placeholder="5643242134323099"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="article"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Артикул</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className=""
                    type="text"
                    placeholder="ДжЖСинМом0823"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="size"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Размер</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="w-16 text-center"
                    type="number"
                    min={0}
                    placeholder="44"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="category"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-col items-start space-x-0 space-y-2">
                <FormLabel className="text-slate-400">Категория</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="space-x-4 w-full p-0 h-4">
                      <SelectValue placeholder="Все" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Все">Все</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          ></FormField>
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
      <FormMessage />
    </Form>
  );
}
