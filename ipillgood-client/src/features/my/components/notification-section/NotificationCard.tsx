interface NotificationCardProps {
  title: string;
  children: React.ReactNode;
}

const NotificationCard = ({ title, children }: NotificationCardProps) => {
  return (
    <section className='flex flex-col gap-2'>
      <h2 className='text-[18px] typo-title-gosanja text-black'>{title}</h2>
      {children}
    </section>
  );
};

export default NotificationCard;
