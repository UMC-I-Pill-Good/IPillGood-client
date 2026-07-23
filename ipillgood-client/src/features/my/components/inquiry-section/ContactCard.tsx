interface ContactCardProps {
  title: string;
  children: React.ReactNode;
}

const ContactCard = ({ title, children }: ContactCardProps) => {
  return (
    <div className='rounded-[20px] bg-secondary-200 p-4'>
      <h3 className='typo-body-10 text-black'>{title}</h3>
      <div className='mt-1 text-neutral-800 flex flex-col gap-1'>{children}</div>
    </div>
  );
};

export default ContactCard;
