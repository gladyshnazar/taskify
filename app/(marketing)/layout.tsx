import { Menu } from "./_components/menu";
import { Footer } from "./_components/footer";

const MarketingPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-full'>
      <Menu />
      <main className='pt-40 pb-20'>{children}</main>
      <Footer />
    </div>
  );
};

export default MarketingPage;
