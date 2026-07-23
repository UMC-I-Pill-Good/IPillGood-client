import { TextButton } from '@/shared/components';
import BottomSheet from '@/shared/components/modal/BottomSheet';
import { AlertCircle, FileText } from 'lucide-react';

interface SurveyEditSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SurveyEditSheet = ({ open, onOpenChange }: SurveyEditSheetProps) => {
  return (
    <BottomSheet open={open} onOpenChange={onOpenChange}>
      <div className='pt-4 px-[19.5px] flex flex-col items-center justify-center'>
        <p className='typo-subtitle-4 text-black'>설문 수정</p>

        <div className='w-30 h-30 rounded-full bg-primary-200 flex items-center justify-center mt-11.5 mb-11.25'>
          <FileText size={60} className='text-primary-600' />
        </div>

        <p className='typo-body-1 text-black mb-2'>설문을 다시 작성할 수 있어요.</p>
        <p className='typo-caption-2 text-neutral-800 mb-14'>
          설문을 수정하면 맞춤 영양제 추천 결과가 초기화됩니다.
        </p>

        <div className='flex bg-semantic-200 rounded-[20px] px-5 py-3 gap-2'>
          <AlertCircle size={24} className='text-semantic-600' />
          <div className='flex flex-col gap-1 text-black'>
            <p className='typo-caption-3'>
              설문 수정 시 기존 추천 결과는 삭제되며, 다시 추천을 해드립니다.
            </p>
            <p className='typo-caption-2'>섭취 중인 영양제, 복용 기록은 유지됩니다.</p>
          </div>
        </div>

        {/* TODO: 초기 설문 1로 이동 */}
        <TextButton
          type='button'
          text='설문 다시 작성하기'
          variant='primary'
          size='xl'
          className='mt-11 w-full'
          onClick={() => {}}
        />
      </div>
    </BottomSheet>
  );
};

export default SurveyEditSheet;
