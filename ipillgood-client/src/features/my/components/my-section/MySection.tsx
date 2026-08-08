import ProfileCard from './ProfileCard';
import LogoutSection from './LogoutSection';
import MenuListSection from './MenuListSection';

const MySection = () => {
  return (
    <section className='flex flex-col pb-24.5 px-5 pt-6.5 gap-8 flex-1'>
      <ProfileCard />
      <MenuListSection />
      <LogoutSection />
    </section>
  );
};

export default MySection;
