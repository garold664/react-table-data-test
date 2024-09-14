import Widget from './Widget';
import {
  NotebookIcon,
  NotebookPenIcon,
  NotepadTextIcon,
  SettingsIcon,
  XIcon,
} from 'lucide-react';
import MenuButton from './MenuButton';
import { Button } from '../ui/button';
export default function MenuWidget() {
  return (
    <Widget>
      <h2 className="text-2xl font-bold mb-6 ml-4">
        <span className="bg-accent rounded-sm p-1">ФИН</span> Контроль
      </h2>
      <Button
        variant="secondary"
        className="absolute right-8 top-6 rounded-3xl text-tertiary gap-2 px-2 py-4 h-0"
      >
        Меню
        <XIcon size={14} />
      </Button>
      <MenuButton>
        <SettingsIcon size={16} />
        Настройки
      </MenuButton>
      <MenuButton>
        <NotebookPenIcon size={16} />
        Внесение данных
      </MenuButton>
      <MenuButton>
        <NotebookIcon size={16} />
        Отчеты
      </MenuButton>
      <MenuButton>
        <NotepadTextIcon size={16} />
        База знаний
      </MenuButton>
    </Widget>
  );
}
