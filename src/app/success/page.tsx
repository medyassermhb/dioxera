// src/app/success/page.tsx
import Header from '@/components/layout/Navbar';
import Footer from '@/components/Footer';
import SuccessContent from '@/components/SuccessContent';

export default async function SuccessPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ method?: string; id?: string }> 
}) {
  const { method, id } = await searchParams;
  const isBankTransfer = method === 'bank_transfer';

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 pt-40 pb-20 px-6">
        <SuccessContent id={id || "UNKNOWN"} isBankTransfer={isBankTransfer} />
      </main>
    </>
  );
}