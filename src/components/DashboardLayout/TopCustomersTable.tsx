'use client';

import React, { useEffect, useState } from 'react';

import DataTable from '../Common/DataTable';

import Image from 'next/image';
import user from '@/assets/User.png';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import { useGetTopVendorsQuery } from '@/redux/api/admin/stat';
import { useGetTopCustomersQuery } from '@/redux/api/playground/stat';
import { useGetEcommerceTopCustomersQuery } from '@/redux/api/ecommerce/stat';
import { useGetEventTopCustomersQuery } from '@/redux/api/eventOrganizer/stat';

const TopCustomersTable = () => {
    const authState = useSelector((state: RootState) => state.auth);
    const [data, setData] = useState([]);

    const { data: topVendors, isLoading: isTopVendor } = useGetTopVendorsQuery(undefined);
    const { data: groundCustomers, isLoading: isGroundCustomer } = useGetTopCustomersQuery(undefined);
    const { data: eventCustomers, isLoading: isEventCustomer } = useGetEventTopCustomersQuery(undefined);
    const { data: ecommerceCustomers, isLoading: isEcommerceCustomer } = useGetEcommerceTopCustomersQuery(undefined);

    useEffect(() => {
        if (authState.businessCategory === 'PLAYGROUND' && groundCustomers?.result) {
            setData(groundCustomers?.result)
        }
        if (authState.businessCategory === 'EVENT' && eventCustomers?.result) {
            setData(eventCustomers?.result)
        }
        if (authState.businessCategory === 'E_COMMERCE' && ecommerceCustomers?.result) {
            setData(ecommerceCustomers?.result)
        }
    }, [groundCustomers, eventCustomers, ecommerceCustomers, authState])

    const formattedData = data?.map((entry:
        {
            id: string,
            user: { username: string, email: string, phoneNumber: string, avatar: string },
            totalBookings: number,
            totalSpent: number,
        }) => ({
            "Id": entry?.id,
            User: (
                <div className="flex items-center gap-3 w-[220px]">
                    <Image
                        src={entry?.user.avatar || user}
                        alt="Image"
                        height={50}
                        width={50}
                        className="w-8 h-8 rounded-full object-cover"
                        priority
                    />
                    <div className="font-medium text-sm">{entry?.user.username}</div>
                </div>
            ),
            "Email": entry?.user.email,
            "Phone Number": entry?.user.phoneNumber,
            "Total Bookings": entry?.totalBookings,
            "Total Spents": entry?.totalSpent,
        }));

    const adminFormattedData = topVendors?.result?.map((entry:
        {
            vendorName: string,
            businessCategory: string,
            address: string,
            totalOrders: number,
            totalRevenue: number,
        }) => ({
            "Vendor Name": entry?.vendorName,
            "Business Category": entry?.businessCategory,
            "Address": entry?.address,
            "Total Orders": entry?.totalOrders,
            "Total Revenue": entry?.totalRevenue,
        }));

    return (
        <div className='bg-white p-6 rounded-lg min-h-[320px]'>
            <h1 className='text-lg font-semibold'>
                {
                    authState.role === 'ADMIN' ?
                        'Top Vendors' :
                        'Top Customers'
                }
            </h1>
            <DataTable
                data={authState.role === 'ADMIN' ? adminFormattedData : formattedData}
                isLoading={isTopVendor || isGroundCustomer || isEventCustomer || isEcommerceCustomer}
                currentPage={1}
            />
        </div>
    );
};

export default TopCustomersTable;