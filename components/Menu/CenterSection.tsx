import React from 'react';
import { View, Text } from 'react-native';
import VoucherSection from './VoucherSection';
import MainSection from './MainSection';

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
            sectionContent = <Text>NotiSection</Text>;
            break;
        case 'ticket':
            sectionContent = <VoucherSection />;
            break;
        default:
            break;
    }

    return <View>{sectionContent}</View>;
};

export default CenterSection;
