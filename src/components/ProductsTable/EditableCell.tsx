import { Check } from 'lucide-react';
import { memo, useEffect, useRef, useState } from 'react';
import Cell from './Cell';

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
    }, [isBeingEdited]);

    useEffect(() => {
      if (!isEdited) return;
      setValue(children);
      setError(null);
      setItemWidth(containerRef.current?.clientWidth || 0);
      setItemHeight(containerRef.current?.clientHeight || 0);
      setIsBeingEdited(true);
    }, [isEdited, children]);

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
      setEditedId(null);
      setItemWidth(undefined);
    };

    const onEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        formRef.current?.requestSubmit();
      }
    };

    const startEditing = () => {
      setEditedId(barcode + field);
    };

    const paddingStyles = 'py-7 pl-4 pr-6 ';

    const errorStyles = 'shadow-red-800 outline-red-800 text-red-800';

    return (
      <Cell className="p-0" style={{ width: itemWidth || undefined }}>
        {isBeingEdited && isEdited ? (
          <form
            ref={formRef}
            className="relative flex top-0 left-0 w-full h-full"
            onSubmit={saveEditedValue}
          >
            <textarea
              className={`resize-y overflow-hidden  w-full h-full max-h-96 text-left flex-shrink-1 outline-accent ${paddingStyles} ${
                error ? errorStyles : ''
              }`}
              ref={textareaRef}
              value={value}
              style={{
                height: itemHeight,
                minHeight: itemHeight,
              }}
              onChange={onTextareaChange}
              onKeyDown={onEnterPress}
            />

            <button
              className="absolute top-1/2 right-0 -translate-y-1/2"
              type="submit"
            >
              <Check className="hover:text-accent text-black" />
            </button>
            {error && (
              <div className="absolute left-0 -bottom-full w-full bg-white/90 p-1  text-red-500 text-xs z-50">
                {error}
              </div>
            )}
          </form>
        ) : (
          <div
            ref={containerRef}
            className={`${paddingStyles}`}
            onDoubleClick={startEditing}
          >
            {children}
          </div>
        )}
      </Cell>
    );
  }
);
export default EditableCell;
