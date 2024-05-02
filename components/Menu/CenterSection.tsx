import React from 'react';
import { View, Text } from 'react-native';
import VoucherSection from './VoucherSection';
import MainSection from './MainSection';
import FeatureSection from './FeatureSection';

interface CenterSectionProps {
    activeButton: 'main' | 'noti' | 'ticket';
}

const CenterSection: React.FC<CenterSectionProps> = ({ activeButton }) => {
    let sectionContent: JSX.Element | null = null;

    switch (activeButton) {
        case 'main':
            sectionContent = <MainSection />;
            break;
        case 'noti':
            sectionContent = <FeatureSection />;
            break;
        case 'ticket':
            sectionContent = <FeatureSection />;
            break;
        default:
            break;
    }

    return <View>{sectionContent}</View>;
};

export default CenterSection;
