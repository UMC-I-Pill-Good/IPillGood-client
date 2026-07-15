import { CheckboxButton } from '@/shared/components';
import { agreementLists } from '@/features/signup/constants/signup.constants';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface SignupAgreementStepProps {
  checked: {
    all: boolean;
    terms: boolean;
    privacy: boolean;
    health: boolean;
    marketing: boolean;
  };
  onAllCheck: () => void;
  onCheck: (key: keyof SignupAgreementStepProps['checked']) => void;
}

const SignupAgreementStep = ({ checked, onAllCheck, onCheck }: SignupAgreementStepProps) => {
  return (
    <section className='py-4 space-y-2'>
      <div className='bg-white/50 h-10 p-2.5 rounded-xl glass w-full flex items-center justify-start gap-2'>
        <CheckboxButton checked={checked.all} onClick={onAllCheck} size='lg' />

        <p className='typo-body-9'>전체 동의합니다</p>
      </div>

      <div className='bg-white/50 glass h-38 p-2.5 w-full rounded-[20px]'>
        <ul className='space-y-3 w-full'>
          {agreementLists.map(({ id, label, href }) => (
            <li key={id} className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <CheckboxButton checked={checked[id]} onClick={() => onCheck(id)} size='sm' />
                <p className='typo-body-10'>{label}</p>
              </div>

              <Link
                href={href}
                className='typo-caption-6 flex items-center text-neutral-800 transition hover:brightness-90'
              >
                보기
                <ChevronRight size={14} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default SignupAgreementStep;
