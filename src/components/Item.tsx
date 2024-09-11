import { Check } from 'lucide-react';
import { memo, useEffect, useRef, useState } from 'react';

interface ItemProps {
  children: string | number;
  update: (id: string, field: string, value: string | number) => void;
  setEditedId: React.Dispatch<React.SetStateAction<string | null>>;
  isEdited: boolean;
  field: string;
  barcode: string;
}
const Item = memo(
  ({ children, update, setEditedId, isEdited, field, barcode }: ItemProps) => {
    const [isBeingEdited, setIsBeingEdited] = useState(false);
    const [value, setValue] = useState(children);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      console.log(`isBeingEdited: ${isBeingEdited}`);
      if (isBeingEdited) {
        console.log(`Focus ${inputRef.current?.value}`);
        inputRef.current?.focus();
      }
    }, [isBeingEdited, isEdited]);

    return (
      <>
        {isBeingEdited && isEdited ? (
          <form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              update(barcode, field, value);
              setIsBeingEdited(false);
            }}
          >
            <input
              ref={inputRef}
              value={value}
              onChange={(e) =>
                setValue(
                  typeof children === 'number'
                    ? +e.target.value
                    : e.target.value
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
              setIsBeingEdited(true);
            }}
          >
            {value}
          </div>
        )}
      </>
    );
  }
);
export default Item;
