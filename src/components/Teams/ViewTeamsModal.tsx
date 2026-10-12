'use client';

import React, { useState } from 'react';

import { Button } from '../ui/button';
import Pagination from '../ui/pagination';
import DataTable from '../Common/DataTable';
import { DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

import Image from 'next/image';
import { FiPlus } from 'react-icons/fi';

import { useGetAllTeamsQuery } from '@/redux/api/eventOrganizer/team';

const ViewTeamsModal = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { data, isLoading } = useGetAllTeamsQuery(currentPage)

    const formattedData = data?.result?.teams?.map((
        entry: {
            id: string,
            name: string,
            logoUrl: string,
            createdAt: string,
            updatedAt: string,
        }) => ({
            "Id": entry?.id,
            "Team Logo": (
                <Image
                    src={entry?.logoUrl}
                    alt="Image"
                    height={50}
                    width={50}
                    className="w-8 h-8 rounded-full object-cover"
                    priority
                />
            ),
            "Team Name": entry?.name,
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
                    title="Manage Teams"
                    data={formattedData}
                    isLoading={isLoading}
                    isButtonTwo={true}
                    buttonTextTwo="Add Team"
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

export default ViewTeamsModal;