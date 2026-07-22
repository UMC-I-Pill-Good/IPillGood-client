import SectionCard from '../SectionCard';
import SectionItem from '../SectionItem';

const EtcSection = () => {
  return (
    <SectionCard title='기타'>
      <SectionItem label='개인정보 처리방침' href='/policy/privacy' />
      <SectionItem label='이용 약관' href='/policy/service' />
      <SectionItem
        label='버전 정보'
        right={<span className='typo-body-9 text-neutral-800'>v.0.0.1</span>}
      />
    </SectionCard>
  );
};

export default EtcSection;
