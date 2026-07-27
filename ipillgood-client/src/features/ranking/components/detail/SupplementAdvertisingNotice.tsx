import NoticeTitle from './NoticeTitle';

interface SupplementAdvertisingNoticeProps {
  ingredientName: string;
}

const ADVERTISING_WARNING_LIST = [
  '질병 예방 및 치료를 주장하는 문구 (ex. 항암 효과, 탈모 치료)',
  '‘특효’, ‘100% 기능 향상’ 등 지나치게 장담하는 표현',
  '증명할 수 없는 효능을 주장하는 문구 (ex. 체중 감량 보장)',
  '식약처 및 지자체 등 공인기관이 아닌 사설기관 인증 광고',
];

const SupplementAdvertisingNotice = ({ ingredientName }: SupplementAdvertisingNoticeProps) => (
  <section className='flex w-full flex-col gap-2.5 px-5 py-4'>
    <article className='flex w-full flex-col gap-2 rounded-[20px] border border-point-600 bg-point-100/70 px-5 py-3 backdrop-blur-sm'>
      <NoticeTitle>과대 광고 성분 조심 안내</NoticeTitle>
      <div className='flex flex-col gap-1 leading-normal typo-caption-7 text-neutral-900'>
        <p>식약처 부당 광고 사례집에도 등장한 성분이에요.</p>
        <p>
          <strong className='font-semibold'>[{ingredientName}]</strong>의 효능 표현, 과장 없는지
          확인해 보세요!
        </p>
      </div>
    </article>

    <article className='flex w-full flex-col gap-2 rounded-[20px] border border-point-700 bg-point-200/70 px-5 py-3 backdrop-blur-sm'>
      <NoticeTitle>아래와 같은 광고 문구가 포함된 제품은 주의하세요</NoticeTitle>
      <div className='flex flex-col gap-4'>
        <ul className='flex list-outside list-disc flex-col gap-1 pl-4.5 leading-normal typo-caption-7 text-neutral-900'>
          {ADVERTISING_WARNING_LIST.map((warning) => (
            <li key={warning}>{warning}</li>
          ))}
        </ul>
        <p className='leading-normal typo-caption-2 text-point-900'>
          건강기능식품은 질병의 치료 및 예방이 아닌 건강 유지 및 개선에 도움을 주는 식품이에요.
        </p>
      </div>
    </article>
  </section>
);

export default SupplementAdvertisingNotice;
