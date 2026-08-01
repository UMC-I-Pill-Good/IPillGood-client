import ContactCard from './ContactCard';

interface ContactSectionProps {
  showTitle?: boolean;
  showHours?: boolean;
  caption?: string;
  className?: string;
  contactEmail: string;
  operatingHours?: string;
  closedDays?: string;
}

const ContactSection = ({
  showTitle = true,
  showHours = true,
  caption,
  contactEmail,
  operatingHours,
  closedDays,
  className = 'flex flex-col gap-2 mt-8',
}: ContactSectionProps) => {
  return (
    <section className={className}>
      {showTitle && <h2 className='typo-body-5 text-black'>문의하기</h2>}

      <ContactCard title='이메일'>
        <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
      </ContactCard>

      {showHours && (
        <ContactCard title='운영시간'>
          <p>{operatingHours}</p>
          <p>{closedDays}</p>
        </ContactCard>
      )}

      {caption && <p className='text-point-900 typo-caption-6 ml-4'>{caption}</p>}
    </section>
  );
};

export default ContactSection;
