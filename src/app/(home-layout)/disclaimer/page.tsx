import DisclaimerComponent from '@/components/disclaimer';
import { websiteInfoRoutes } from '@/constants/end-point';
import { envConfig } from '@/lib/helpers/envConfig';
import fetchData from '@/lib/helpers/fetchData';
import { Metadata } from 'next';
import React from 'react';
export const metadata: Metadata = {
    title: 'Disclaimer | MobilesInsight.com',
    description:
        'Find the best mobile prices and deals at MobilesInsight.com. Compare prices, analysis, find discounts, and explore offers on the latest smartphones.',
    alternates: {
        canonical: `${envConfig.baseUrl}/disclaimer`
    }
};
const DisclaimerPage = async () => {
    const basePath = websiteInfoRoutes.get;
    const revalidate = 60;
    let websiteInfo;
    try {
        const response: any = await fetchData(basePath, revalidate);
        websiteInfo = response?.data?.data || '';
    } catch (error) {
        websiteInfo = {};
    }
    return <DisclaimerComponent websiteInfo={websiteInfo} />;
};

export default DisclaimerPage;