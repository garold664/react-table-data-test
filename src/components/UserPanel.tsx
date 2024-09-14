import {
  ArrowRightIcon,
  CalendarRangeIcon,
  CircleUserRoundIcon,
  NotepadTextIcon,
} from 'lucide-react';
import { Button } from './ui/button';

export default function UserPanel() {
  return (
    <>
      <div className="bg-white pl-7 pr-5 py-1.5 rounded-2xl flex flex-wrap items-center justify-center md:justify-start gap-2">
        <div className="flex gap-3">
          <CircleUserRoundIcon /> Иванов И.И
        </div>
        <div className="flex bg-accent-foreground py-6 px-5 rounded-2xl sm:ml-10 ">
          <CalendarRangeIcon
            fill="currentColor"
            stroke="white"
            className="text-accent"
          />{' '}
          Тариф до <span>15.04.2024</span>
        </div>
        <div className="flex sm:ml-auto ">
          <Button variant={'outline'}>Выйти</Button>
          <Button variant={'accent2'} className="flex gap-1 ml-2">
            О нас <ArrowRightIcon size={12} />
          </Button>
        </div>
      </div>
      <div className="mt-10 flex flex-wrap items-center gap-6 mb-9">
        <h1 className="md:text-3xl text-xl">
          Остатки сформированы на 01.04.2023 г.
        </h1>
        <Button className=" flex gap-1 text-sm">
          <NotepadTextIcon size={16} /> Инструкции
        </Button>
      </div>
    </>
  );
}
