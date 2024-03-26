import { useEffect, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { showModal } from '../../../../common/Modal/showModal';
import { closeModal } from '../../../../common/Modal/closeModal';

function DateSelector({
  date,
  onChange = () => {},
}: {
  onChange: Function;
  date: Date;
}) {
  const [startDate, setStartDate] = useState<Date>();

  useEffect(() => {
    if (startDate) {
      onChange(startDate);
      closeModal();
    }
  }, [startDate]);

  return (
    <div>
      <button
        style={{ textWrap: 'nowrap' }}
        className="p-3"
        onClick={() =>
          showModal(
            <DayPicker
              mode="single"
              disabled={(date: Date) => date.getTime() < Date.now()}
              onSelect={setStartDate}
              selected={startDate}
              modifiersClassNames={{
                selected: 'my-selected',
                today: 'my-today',
              }}
              modifiersStyles={{
                disabled: { opacity: '25%' },
              }}
            />,
            'Select expiriation date',
          )
        }
      >
        {startDate
          ? `Expires on: ${startDate.toLocaleDateString()}`
          : date
            ? `Expires on: ${new Date(date).toLocaleDateString()}`
            : 'Select date...'}
      </button>
    </div>
  );
}

export default DateSelector;
