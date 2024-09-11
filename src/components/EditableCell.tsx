import { Check } from 'lucide-react';
import { memo, useEffect, useRef, useState } from 'react';
import { TableCell } from './ui/table';

interface ItemProps {
  children: string | number;
  update: (id: string, field: string, value: string | number) => void;
  setEditedId: React.Dispatch<React.SetStateAction<string | null>>;
  isEdited: boolean;
  field: string;
  barcode: string;
}
const EditableCell = memo(
  ({ children, update, setEditedId, isEdited, field, barcode }: ItemProps) => {
    const [isBeingEdited, setIsBeingEdited] = useState(false);
    const [value, setValue] = useState(children);
    const [itemWidth, setItemWidth] = useState<number | undefined>(undefined);
    const [itemHeight, setItemHeight] = useState(0);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
      if (isBeingEdited) {
        const textarea = textareaRef.current;

        if (!textarea) return;
        textarea.focus();
        textarea.setSelectionRange(
          textarea.value.length,
          textarea.value.length
        );
      }
    }, [isBeingEdited, isEdited]);

    return (
      <TableCell style={{ width: itemWidth || undefined }}>
        {isBeingEdited && isEdited ? (
          <form
            ref={formRef}
            className="relative flex top-0 left-0 w-full h-full"
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              update(barcode, field, value);
              setIsBeingEdited(false);
              setItemWidth(undefined);
            }}
          >
            <textarea
              className=" resize-y overflow-hidden p-2 pr-6 w-full h-full max-h-96 text-center flex-shrink-1"
              ref={textareaRef}
              value={value}
              // style={{ width: itemWidth && itemWidth }}
              style={{
                // width: itemWidth,
                height: itemHeight,
                minHeight: itemHeight,
              }}
              // size={value.toString().length}
              onChange={(e) =>
                setValue(
                  typeof children === 'number'
                    ? +e.target.value
                    : e.target.value
                )
              }
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  formRef.current?.requestSubmit();
                }
              }}
            />

            <button
              className="absolute top-1/2 right-0 -translate-y-1/2"
              type="submit"
            >
              <Check />
            </button>
          </form>
        ) : (
          <div
            ref={containerRef}
            className="p-2 pr-6"
            onDoubleClick={() => {
              setItemWidth(containerRef.current?.clientWidth || 0);
              setItemHeight(containerRef.current?.clientHeight || 0);
              setEditedId(barcode + field);
              setIsBeingEdited(true);
            }}
          >
            {value}
          </div>
        )}
      </TableCell>
    );
  }
);
export default EditableCell;
