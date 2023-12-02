import { Menu } from "./_components/menu";
import { Footer } from "./_components/footer";

const MarketingPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-full bg-slate-100'>
      <Menu />
      <main className='pt-40 pb-20 bg-slate-100'>{children}</main>
      <Footer />
    </div>
  );
};

export default MarketingPage;
