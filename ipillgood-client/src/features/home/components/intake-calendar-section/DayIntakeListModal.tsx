import { DayIntakeItemType } from '../../types/intakeDayDetail.type';
import CheckboxList from '../CheckboxList';
import ModalShell from '../ModalShell';

interface DayIntakeListModalProps {
  date: string;
  intakes: DayIntakeItemType[];
  onClose: () => void;
}

const DayIntakeListModal = ({ date, intakes, onClose }: DayIntakeListModalProps) => {
  const takenList = intakes.filter((intake: DayIntakeItemType) => intake.taken);
  const [, month, day] = date.split('-');

  return (
    <ModalShell onClose={onClose} className='gap-5'>
      <p className='typo-body-5 text-[#111] text-center'>
        {Number(month)}/{Number(day)} 섭취한 영양제 목록
      </p>
      <CheckboxList
        list={takenList.map((intake) => ({
          id: intake.userSupplementId,
          label: intake.productName,
        }))}
        checkedIdList={takenList.map((intake) => intake.userSupplementId)}
        onToggle={() => {}}
        readOnly
      />
    </ModalShell>
  );
};

export default DayIntakeListModal;
