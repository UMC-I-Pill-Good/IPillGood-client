import Link from 'next/link';
import { CheckboxButton } from '@/shared/components';
import { agreementLists } from '@/features/signup/constants/signup.constants';
import { useAgreementStore } from '../stores/useAgreementStore';

const SignupAgreementStep = () => {
  const checked = useAgreementStore((s) => s.checked);
  const toggleAll = useAgreementStore((s) => s.toggleAll);
  const toggle = useAgreementStore((s) => s.toggle);

  return (
    <section className='py-4 space-y-2'>
      <div className='bg-white/50 h-12 p-4 rounded-xl glass w-full flex items-center justify-start gap-2'>
        <CheckboxButton checked={checked.all} onClick={toggleAll} size='lg' />
        <p className='typo-body-9'>전체 동의합니다</p>
      </div>

      <div className='bg-white/50 glass h-40 p-4 w-full rounded-[20px]'>
        <ul className='space-y-4 w-full'>
          {agreementLists.map(({ id, label, href }) => (
            <li key={id} className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <CheckboxButton checked={checked[id]} onClick={() => toggle(id)} size='sm' />
                <p className='typo-body-10'>{label}</p>
              </div>

              <Link
                href={href}
                className='typo-caption-6 flex items-center text-neutral-800 transition hover:underline'
              >
                보기
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default SignupAgreementStep;
