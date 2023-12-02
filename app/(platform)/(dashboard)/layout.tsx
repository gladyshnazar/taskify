import { Menu } from "./_components/Menu";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-full'>
      <Menu />
      {children}
    </div>
  );
};

export default DashboardLayout;
