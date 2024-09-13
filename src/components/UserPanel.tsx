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
      <div className="bg-white pl-7 pr-5 py-1.5 rounded-2xl flex items-center ">
        <div className="flex gap-3">
          <CircleUserRoundIcon /> Иванов И.И
        </div>
        <div className="flex bg-accent-foreground py-6 px-5 rounded-2xl ml-10">
          <CalendarRangeIcon
            fill="currentColor"
            stroke="white"
            className="text-accent"
          />{' '}
          Тариф до <span>15.04.2024</span>
        </div>
        <Button variant={'outline'} className="ml-auto">
          Выйти
        </Button>
        <Button variant={'accent2'} className="flex gap-1 ml-2">
          О нас <ArrowRightIcon size={12} />
        </Button>
      </div>
      <div className="mt-10 flex items-center gap-6">
        <h1 className="text-3xl">Остатки сформированы на 01.04.2023 г.</h1>
        <Button className=" flex gap-1 text-sm">
          <NotepadTextIcon size={16} /> Инструкции
        </Button>
      </div>
    </>
  );
}
