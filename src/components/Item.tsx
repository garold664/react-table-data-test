import { Check } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface ItemProps {
  children: string | number;
  update: (id: string, field: string, value: string | number) => void;
  setEditedId: React.Dispatch<React.SetStateAction<string | null>>;
  editedId: string | null;
  field: string;
  barcode: string;
}
export default function Item({
  children,
  update,
  setEditedId,
  editedId,
  field,
  barcode,
}: ItemProps) {
  const [isEdited, setIsEdited] = useState(false);
  const [value, setValue] = useState(children);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEdited) {
      inputRef.current?.focus();
    }
  }, [isEdited]);
  return (
    <>
      {isEdited && editedId === barcode + field ? (
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            update(barcode, field, value);
            setIsEdited(false);
          }}
        >
          <input
            ref={inputRef}
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
        <div
          onDoubleClick={() => {
            setEditedId(barcode + field);
            setIsEdited(true);
          }}
        >
          {value}
        </div>
      )}
    </>
  );
}
