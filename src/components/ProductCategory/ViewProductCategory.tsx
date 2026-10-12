'use client';

import React, { useState } from 'react';

import { Button } from '../ui/button';
import Pagination from '../ui/pagination';
import DataTable from '../Common/DataTable';
import { DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

import Image from 'next/image';
import { FiPlus } from 'react-icons/fi';
import defaultImg from '@/assets/no-img.jpg';

import { useGetAllProductCategoriesQuery } from '@/redux/api/ecommerce/productCategory';

const ViewProductCategory = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { data, isLoading } = useGetAllProductCategoriesQuery(currentPage);

    const formattedData = data?.result?.categories?.map((
        entry: {
            id: string,
            name: string,
            imageUrl: string,
            createdAt: string,
            updatedAt: string,
        }) => ({
            "Id": entry?.id,
            "Category Logo": (
                <Image
                    src={entry?.imageUrl || defaultImg}
                    alt={entry?.name || 'No Image'}
                    height={50}
                    width={50}
                    className="w-8 h-8 rounded-full object-cover"
                    priority
                />
            ),
            "Category Name": entry?.name,
            "Created At": new Date(entry?.createdAt).toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            }),
            "Updated At": new Date(entry?.updatedAt).toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            })
        }));

    return (
        <DialogContent className="min-w-2xs md:min-w-xl lg:min-w-4xl overflow-y-auto max-h-[80vh] p-6" showCloseButton>
            <DialogHeader>
                <DialogTitle>
                </DialogTitle>
            </DialogHeader>
            <div>
                <DataTable
                    title="Manage Product Category"
                    data={formattedData}
                    isLoading={isLoading}
                    isButtonTwo={true}
                    buttonTextTwo="Add Category"
                    iconTwo={<FiPlus />}
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
        </DialogContent>
    );
};

export default ViewProductCategory;