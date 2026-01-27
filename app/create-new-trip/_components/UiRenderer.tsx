import React from 'react';
import GroupSizeUi from './GroupSizeUi';
import BudgetUi from './BudgetUi';
import TripDurationUi from './TripDurationUi';
import GenerativeTripUi from './GenerativeTripUi';
import InterestsUi from './InterestsUi';
import TripStyleUi from './TripStyleUi';
import TravelPaceUi from './TravelPaceUi';
import HotelCardItem from './HotelCardItem';

interface UiRendererProps {
    uiType: string;
    onSelect: (value: any) => void;
    tripData?: any;
    loading?: boolean;
    onGenerate?: () => void;
    onEdit?: () => void;
    disabled?: boolean;
}

function UiRenderer({ uiType, onSelect, tripData, loading, onGenerate, onEdit, disabled }: UiRendererProps) {

    switch (uiType) {
        case 'groupSize':
            return <GroupSizeUi onSelect={onSelect} selected={tripData?.groupSize} disabled={disabled} />;

        case 'budget':
            return <BudgetUi onSelect={onSelect} selected={tripData?.budget} disabled={disabled} />;

        case 'tripDuration':
            return <TripDurationUi onSelect={onSelect} selected={tripData?.tripDuration} disabled={disabled} />;

        case 'interests':
            return <InterestsUi onSelect={onSelect} selected={tripData?.interests ? tripData.interests.split(',') : []} />;

        case 'tripStyle':
            return <TripStyleUi onSelect={onSelect} value={tripData?.tripStyle} />;

        case 'travelPace':
            return <TravelPaceUi onSelect={onSelect} value={tripData?.travelPace} />;

        case 'tripResult':
            return (
                <div className="space-y-4 w-full">
                    <h3 className="font-bold text-lg">Recommended Hotels</h3>
                    {tripData?.hotels?.length ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {tripData.hotels.map((hotel: any, index: number) => (
                                <HotelCardItem key={index} hotel={hotel} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">No hotels found in the plan.</p>
                    )}
                </div>
            );

        case 'final':
            return (
                <GenerativeTripUi
                    tripData={tripData}
                    onGenerate={onGenerate!}
                    onEdit={onEdit!}
                    loading={loading || false}
                />
            );

        default:
            return null;
    }
}

export default UiRenderer;
