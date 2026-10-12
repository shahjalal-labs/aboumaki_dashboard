'use client';

import React, { useState } from 'react';

import { Button } from '../ui/button';
import Pagination from '../ui/pagination';
import DataTable from '../Common/DataTable';

import Image from 'next/image';
import { FaPlus } from 'react-icons/fa';
import { TbCategory } from 'react-icons/tb';

import { useGetAllProductsQuery } from '@/redux/api/ecommerce/product';

const ManageProduct = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { data, isLoading } = useGetAllProductsQuery(currentPage);

    const formattedData = data?.result?.products?.map((
        entry: {
            id: string,
            name: string,
            price: number,
            imageUrl: string,
            createdAt: string,
            updatedAt: string,
            description: string,
        }) => ({
            "Id": entry?.id,
            "Product Image": (
                <Image
                    src={entry?.imageUrl || './placeholder.svg'}
                    alt="Image"
                    height={50}
                    width={50}
                    className="w-12 h-12 rounded-lg object-cover"
                    priority
                />
            ),
            "Product Name": entry?.name,
            "Description": entry?.description.slice(0, 30) + '...',
            "Price": entry?.price,
            "Created At": new Date(entry?.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            }),
            "Updated At": new Date(entry?.updatedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            }),
        }));

    return (
        <div>
            <DataTable
                title="All Products"
                data={formattedData}
                isLoading={isLoading}
                isButton={true}
                buttonText='Add Product'
                icon={<FaPlus />}
                isButtonTwo={true}
                buttonTextTwo="View Product Category"
                iconTwo={<TbCategory />}
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

export default ManageProduct;