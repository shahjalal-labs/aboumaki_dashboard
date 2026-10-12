'use client';

import React, { useState } from 'react';

import Image from 'next/image';
import { FaPlus } from 'react-icons/fa';
import defaultImg from '@/assets/no-img.jpg';

import { Button } from '../ui/button';
import Pagination from '../ui/pagination';
import DataTable from '../Common/DataTable';

import { useGetAllStoresQuery } from '@/redux/api/ecommerce/store';

const ManageOnStore = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { data, isLoading } = useGetAllStoresQuery(currentPage);

    const formattedData = data?.result?.stores?.map((
        entry: { id: string, imageurl: string, name: string }
    ) => ({
        "Id": entry?.id,
        "Store Image": (
            <Image
                src={entry?.imageurl || defaultImg}
                alt="Image"
                height={50}
                width={50}
                className="w-12 h-12 rounded-lg object-cover"
                priority
            />
        ),
        "Store Name": entry?.name,
    }));

    return (
        <div>
            <DataTable
                title="All Stores"
                data={formattedData}
                isLoading={isLoading}
                isButton={true}
                buttonText='Add Store'
                icon={<FaPlus />}
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
                            <span>from {data?.result?.meta?.total}</span>
                        </div>
                        <Pagination totalPage={data?.result?.meta?.totalPages} setCurrentPage={setCurrentPage} currentPage={currentPage} />
                    </div> : null
            }
        </div>
    );
};

export default ManageOnStore;