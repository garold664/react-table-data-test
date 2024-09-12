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
    const [error, setError] = useState<string | null>(null);
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

    const onTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
      if (typeof children === 'number') {
        if (isNaN(+e.target.value)) {
          setError('Значение должно быть числом');
        } else {
          setError(null);
        }
      }
    };

    const saveEditedValue = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (error) {
        return;
      }

      const valueToSave =
        typeof children === 'number' ? +value : value.toString().trim();

      setValue(valueToSave);
      update(barcode, field, valueToSave);
      setIsBeingEdited(false);
      setItemWidth(undefined);
    };

    const onEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        formRef.current?.requestSubmit();
      }
    };

    const startEditing = () => {
      setValue(children);
      setError(null);
      setItemWidth(containerRef.current?.clientWidth || 0);
      setItemHeight(containerRef.current?.clientHeight || 0);
      setEditedId(barcode + field);
      setIsBeingEdited(true);
    };

    return (
      <TableCell style={{ width: itemWidth || undefined }}>
        {isBeingEdited && isEdited ? (
          <form
            ref={formRef}
            className="relative flex top-0 left-0 w-full h-full"
            onSubmit={saveEditedValue}
          >
            <textarea
              className="resize-y overflow-hidden p-2 pr-6 w-full h-full max-h-96 text-center flex-shrink-1"
              ref={textareaRef}
              value={value}
              style={{
                height: itemHeight,
                minHeight: itemHeight,
                boxShadow: error ? 'red 0px 0px 0px 2px' : undefined,
                outline: error ? '1px solid red' : undefined,
                color: error ? 'red' : undefined,
              }}
              onChange={onTextareaChange}
              onKeyDown={onEnterPress}
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
            onDoubleClick={startEditing}
          >
            {children}
          </div>
        )}
      </TableCell>
    );
  }
);
export default EditableCell;
