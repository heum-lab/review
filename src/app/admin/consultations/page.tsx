import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { getCurrentUser } from '@/lib/auth';
import { getAllConsultations, formatDate } from '@/lib/consultations';
import { toggleHandledAction } from '../actions';

export const metadata: Metadata = {
  title: '무료 상담 신청 관리 — 어드민',
};

export const dynamic = 'force-dynamic';

export default async function ConsultationsListPage(): Promise<JSX.Element> {
  const user = await getCurrentUser();
  if (!user) redirect('/login?next=/admin/consultations');

  const items = await getAllConsultations();
  const pendingCount = items.filter((i) => i.status === 'pending').length;

  return (
    <>
      <Header />
      <main className="bg-ink-100/30">
        <div className="container-x py-14 sm:py-16">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="eyebrow">어드민</span>
                <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                  무료 상담 신청
                </h1>
                <p className="mt-2 text-sm text-ink-500">
                  랜딩페이지에서 접수된 상담 신청 목록입니다.
                </p>
              </div>
              <div className="flex gap-2 text-sm">
                <div className="rounded-lg bg-white px-4 py-2 shadow-card">
                  <span className="text-ink-500">전체 </span>
                  <span className="font-bold text-ink-900">{items.length}</span>
                </div>
                <div className="rounded-lg bg-white px-4 py-2 shadow-card">
                  <span className="text-ink-500">미처리 </span>
                  <span className="font-bold text-brand-600">{pendingCount}</span>
                </div>
              </div>
            </div>

            {items.length === 0 ? (
              <div className="mt-10 rounded-2xl border border-dashed border-ink-100 bg-white p-16 text-center">
                <p className="text-sm text-ink-500">아직 접수된 상담 신청이 없습니다.</p>
              </div>
            ) : (
              <div className="mt-8 overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-card">
                <table className="w-full text-sm">
                  <thead className="bg-ink-100/50 text-left text-xs font-semibold uppercase tracking-wide text-ink-500">
                    <tr>
                      <th className="px-4 py-3">상태</th>
                      <th className="px-4 py-3">브랜드</th>
                      <th className="px-4 py-3">담당자</th>
                      <th className="px-4 py-3">연락처</th>
                      <th className="px-4 py-3">이메일</th>
                      <th className="px-4 py-3">접수일시</th>
                      <th className="px-4 py-3 text-right">관리</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink-100">
                    {items.map((c) => (
                      <tr key={c.id} className="hover:bg-ink-100/30">
                        <td className="px-4 py-3">
                          <StatusBadge status={c.status} />
                        </td>
                        <td className="px-4 py-3 font-semibold text-ink-900">
                          <Link
                            href={`/admin/consultations/${c.id}`}
                            className="hover:underline"
                          >
                            {c.brand}
                          </Link>
                        </td>
                        <td className="px-4 py-3 text-ink-700">{c.name}</td>
                        <td className="px-4 py-3 text-ink-700">{c.phone}</td>
                        <td className="px-4 py-3 text-ink-700">{c.email}</td>
                        <td className="px-4 py-3 text-ink-500">{formatDate(c.createdAt)}</td>
                        <td className="px-4 py-3 text-right">
                          <form action={toggleHandledAction} className="inline">
                            <input type="hidden" name="id" value={c.id} />
                            <input
                              type="hidden"
                              name="status"
                              value={c.status === 'pending' ? 'handled' : 'pending'}
                            />
                            <button
                              type="submit"
                              className="rounded-md border border-ink-100 px-3 py-1 text-xs font-semibold text-ink-700 hover:bg-ink-100"
                            >
                              {c.status === 'pending' ? '처리 완료' : '미처리로'}
                            </button>
                          </form>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function StatusBadge({ status }: { status: 'pending' | 'handled' }): JSX.Element {
  if (status === 'handled') {
    return (
      <span className="inline-flex items-center rounded-full bg-ink-100 px-2.5 py-0.5 text-xs font-semibold text-ink-700">
        처리완료
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full bg-[#D14F3A]/10 px-2.5 py-0.5 text-xs font-semibold text-[#D14F3A]">
      미처리
    </span>
  );
}
