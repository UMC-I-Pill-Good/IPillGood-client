import { DELETED_INFO_LIST } from '../../constants/withdrawInfo';

const WithdrawInfoList = () => {
  return (
    <section className='flex flex-col gap-2 mb-2.5'>
      <h2 className='text-[16px] typo-title-gosanja text-black'>삭제되는 정보</h2>
      {/* ::marker는 margin을 지원하지 않아 list-style 대신 불렛을 직접 렌더링 */}
      <ul className='flex flex-col px-2 py-[7.5px] gap-1 bg-white rounded-lg'>
        {DELETED_INFO_LIST.map((deletedInfo) => (
          <li key={deletedInfo} className='flex items-center text-neutral-800 typo-body-10'>
            <span className='w-1 h-1 rounded-full bg-neutral-800 mx-2.5' />
            {deletedInfo}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default WithdrawInfoList;
