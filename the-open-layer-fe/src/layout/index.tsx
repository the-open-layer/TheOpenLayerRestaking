import Header from '@/components/ux/header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#D8E2FD]">
      <Header />
      {children}
    </div>
  );
}
