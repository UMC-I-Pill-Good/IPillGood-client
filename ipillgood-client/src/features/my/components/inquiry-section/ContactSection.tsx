import ContactCard from './ContactCard';

interface ContactSectionProps {
  showTitle?: boolean;
  showHours?: boolean;
  caption?: string;
  className?: string;
}

const ContactSection = ({
  showTitle = true,
  showHours = true,
  caption,
  className = 'flex flex-col gap-2 mt-8',
}: ContactSectionProps) => {
  return (
    <section className={className}>
      {showTitle && <h2 className='typo-body-5 text-black'>문의하기</h2>}

      <ContactCard title='이메일'>
        <p>ipillgood_umc10th@naver.com</p>
      </ContactCard>

      {showHours && (
        <ContactCard title='운영시간'>
          <p>평일 09:00 ~ 18:00</p>
          <p>(주말 및 공휴일 휴무)</p>
        </ContactCard>
      )}

      {caption && <p className='text-point-900 typo-caption-6 ml-4'>{caption}</p>}
    </section>
  );
};

export default ContactSection;
