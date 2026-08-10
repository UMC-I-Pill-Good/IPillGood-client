import {
  ADVERTISING_RISK_NOTICE_DESCRIPTION,
  ADVERTISING_RISK_NOTICE_TITLE,
  ADVERTISING_WARNING_FOOTNOTE,
  ADVERTISING_WARNING_LIST,
  ADVERTISING_WARNING_TITLE,
} from '../../constants/advertisingNotice';
import NoticeTitle from './NoticeTitle';

interface SupplementAdvertisingNoticeProps {
  ingredientName?: string;
}

const SupplementAdvertisingNotice = ({ ingredientName }: SupplementAdvertisingNoticeProps) => (
  <section className='flex w-full flex-col gap-2.5 px-5 py-4'>
    {ingredientName && (
      <article className='flex w-full flex-col gap-2 rounded-[20px] border border-point-600 bg-point-100/70 px-5 py-3 backdrop-blur-sm'>
        <NoticeTitle>{ADVERTISING_RISK_NOTICE_TITLE}</NoticeTitle>
        <div className='flex flex-col leading-normal typo-caption-7 text-neutral-900'>
          <p>{ADVERTISING_RISK_NOTICE_DESCRIPTION}</p>
          <p>
            <strong className='font-semibold'>[{ingredientName}]</strong>의 효능 표현, 과장 없는지
            확인해 보세요!
          </p>
        </div>
      </article>
    )}

    <article className='flex w-full flex-col gap-2 rounded-[20px] border border-point-700 bg-point-200/70 px-5 py-3 backdrop-blur-sm'>
      <NoticeTitle>{ADVERTISING_WARNING_TITLE}</NoticeTitle>
      <div className='flex flex-col gap-4'>
        <ul className='flex flex-col gap-1 leading-normal typo-caption-7 text-neutral-900'>
          {ADVERTISING_WARNING_LIST.map((warning) => (
            <li key={warning} className='flex items-start gap-1'>
              <span aria-hidden='true' className='shrink-0'>
                •
              </span>
              <span>{warning}</span>
            </li>
          ))}
        </ul>
        <p className='leading-normal typo-caption-2 text-point-900'>
          {ADVERTISING_WARNING_FOOTNOTE}
        </p>
      </div>
    </article>
  </section>
);

export default SupplementAdvertisingNotice;
