import { MenuIcon, MessageCircleMoreIcon, XIcon } from 'lucide-react';
import { Button } from './ui/button';
import MenuWidget from './Widget/MenuWidget';
import InfoWidget from './Widget/InfoWidget';
import { useState } from 'react';

export default function SidePanel() {
  const [open, setOpen] = useState(false);

  const panelMobileStyles = 'block fixed left-2 top-2 z-10';
  // const buttonMobileStyles = 'left-[420px]';
  return (
    <>
      <Button
        variant={'accent'}
        className={`rounded-full fixed right-2 top-2 z-50 xl:hidden `}
        onClick={() => setOpen(!open)}
      >
        {!open && <MenuIcon />}
        {open && <XIcon />}
      </Button>
      <aside
        className={`shrink-0 max-w-full xl:block xl:static xl:w-96 ${
          open ? panelMobileStyles : 'hidden'
        }`}
      >
        <MenuWidget />
        <InfoWidget />
        <Button variant={'accent'} className="w-full py-8 rounded-2xl gap-2">
          <MessageCircleMoreIcon /> Связаться с нами
        </Button>
      </aside>
    </>
  );
}
