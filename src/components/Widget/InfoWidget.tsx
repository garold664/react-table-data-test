import Widget from './Widget';

export default function InfoWidget() {
  return (
    <Widget className="p-7">
      <h2 className="mb-10">Техническая поддержка</h2>
      <div className="flex gap-4 mb-6">
        <div className="w-1/2">
          <h3 className="text-sm text-tertiary">Номер поддержки:</h3>
          <p>8 999 999 99 99</p>
        </div>
        <div className="w-1/2">
          <h3 className="text-sm text-tertiary">Почта поддержки:</h3>
          <p>pf1@werthesest.ru</p>
        </div>
      </div>
      <div className="w-1/2">
        <h3 className="text-sm text-tertiary">Часы работы:</h3>
        <p>Пн - Пт с 9:00 - 18:00</p>
      </div>
      <div className="mt-11">
        <a href="#" className="text-tertiary hover:text-white">
          Пользовательское соглашение
        </a>
        <hr className="border-[#2f3744] mt-3 mb-2" />
        <a href="#" className="text-tertiary hover:text-white">
          Политика конфиденциальности
        </a>
        <hr className="border-[#2f3744] mt-3 mb-2" />
        <a href="#" className="text-tertiary hover:text-white">
          Юридическая информация
        </a>
        <hr className="border-[#2f3744] mt-3 mb-2" />
        <a href="#" className="text-tertiary hover:text-white">
          Публичная оферта
        </a>
      </div>
    </Widget>
  );
}
