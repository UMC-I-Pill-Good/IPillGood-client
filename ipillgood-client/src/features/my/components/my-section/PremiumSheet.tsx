import { MascotSadIcon } from '@/assets';
import BottomSheet from '@/shared/components/modal/BottomSheet';

interface PremiumSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PremiumSheet = ({ open, onOpenChange }: PremiumSheetProps) => {
  return (
    <BottomSheet open={open} onOpenChange={onOpenChange}>
      <div className='flex flex-col px-5 pt-10 items-center'>
        <p className='typo-body-5 text-black text-center'>
          죄송합니다.
          <br />
          현재 프리미엄 서비스는
          <span className='text-primary-700'> 준비 중</span>에 있습니다!
        </p>
        <MascotSadIcon />
      </div>
    </BottomSheet>
  );
};

export default PremiumSheet;
