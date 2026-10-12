'use client';

import React, { useState } from 'react';

import { Button } from '../ui/button';
import Pagination from '../ui/pagination';
import DataTable from '../Common/DataTable';

import Image from 'next/image';
import defaultImg from '@/assets/no-img.jpg';

import { getCountryName } from '@/lib/utils';
import { useGetAllVendorsQuery } from '@/redux/api/admin/user';

const ManageVendor = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { data, isLoading } = useGetAllVendorsQuery(currentPage);

    const formattedData = data?.result?.users?.map((
        entry: {
            id: string,
            role: string,
            email: string,
            avatar: string,
            status: string,
            country: string,
            username: string,
            isVerify: boolean,
            phoneNumber: string,
            vendor: { businessCategory: string, docStatus: string }
        }) => ({
            "Id": entry?.id,
            "User Image": (
                <Image
                    src={entry?.avatar || defaultImg}
                    height={50}
                    width={50}
                    alt="Image"
                    className="w-8 h-8 rounded-full object-cover"
                    priority
                />
            ),
            "User Name": entry?.username,
            "Email": entry?.email,
            "Phone Number": entry?.phoneNumber,
            "Is Verified": entry?.isVerify ? 'Verified' : 'Not Verified',
            "Role": entry?.role,
            "Business Category": entry?.vendor?.businessCategory,
            "Doc Status": (
                <button className={`${entry?.vendor?.docStatus === 'PENDING' ? 'bg-[#FF6B00]' : 'bg-green-700'} text-white px-3 py-1.5 rounded-2xl`}>
                    {entry?.vendor?.docStatus === 'PENDING' ? 'PENDING' : 'APPROVED'}
                </button>
            ),
            "Country": getCountryName(entry?.country),
        }));

    return (
        <div>
            <DataTable
                title="All Vendors"
                data={formattedData}
                isLoading={isLoading}
                currentPage={currentPage}
            />

            {
                formattedData?.length ?
                    <div className='flex flex-col md:flex-row justify-between items-center gap-6 mt-8'>
                        <div className='text-base text-[#4A4A4A] flex items-center justify-start gap-2'>
                            <span>Show</span>
                            <Button
                                variant="default"
                                size="icon"
                                className="h-8 w-8 rounded-none bg-[#FF6B001A] text-[#FF6B00] hover:bg-[#FF6B001A]"
                            >
                                {formattedData?.length}
                            </Button>
                            <span>from {data?.result?.mate?.total}</span>
                        </div>
                        <Pagination totalPage={data?.result?.mate?.totalPages} setCurrentPage={setCurrentPage} currentPage={currentPage} />
                    </div> : null
            }
        </div>
    );
};

export default ManageVendor;