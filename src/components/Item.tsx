import { Check } from 'lucide-react';
import { useState } from 'react';

interface ItemProps {
  children: string | number;
  update: (id: string, field: string, value: string | number) => void;
  field: string;
  barcode: string;
}
export default function Item({ children, update, field, barcode }: ItemProps) {
  const [isEdited, setIsEdited] = useState(false);
  const [value, setValue] = useState(children);
  return (
    <>
      {isEdited ? (
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            update(barcode, field, value);
            setIsEdited(false);
          }}
        >
          <input
            value={value}
            onChange={(e) =>
              setValue(
                typeof children === 'number' ? +e.target.value : e.target.value
              )
            }
          />
          <button type="submit">
            <Check />
          </button>
        </form>
      ) : (
        <div onDoubleClick={() => setIsEdited(true)}>{value}</div>
      )}
    </>
  );
}
