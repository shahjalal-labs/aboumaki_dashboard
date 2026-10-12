'use client';

import React from 'react';
import DataTable from '../Common/DataTable';
import { useGetTransactionListQuery } from '@/redux/api/admin/stat';

const ManageTransactions = () => {
    const { data, isLoading } = useGetTransactionListQuery(undefined);

    const formattedData = data?.result?.data?.map((entry: {
        amount: number,
        businessCategory: string,
        currency: string,
        status: string,
        createdAt: string,
        transactionId: string
    }) => ({
        "Transaction ID": entry?.transactionId,
        "Amount": `${entry?.amount} ${entry?.currency}`,
        "Business Category": entry?.businessCategory,
        "Created At": new Date(entry?.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }),
        "Status": (
            <button
                className={`${entry?.status === 'PAYOUT_PROCESSING' ? 'bg-[#FF6B00]' : 'bg-green-700'} text-white px-3 py-1.5 rounded-2xl`}
            >
                {entry?.status}
            </button>
        ),
    }));

    return (
        <DataTable
            title="All Transactions"
            data={formattedData}
            isLoading={isLoading}
            currentPage={1}
        />
    );
};

export default ManageTransactions;