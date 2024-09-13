interface WidgetProps {
  children: React.ReactNode;
}
export default function Widget({ children }: WidgetProps) {
  return (
    <article className="relative bg-primary w-full p-3 pt-6 text-white rounded-2xl">
      {children}
    </article>
  );
}
