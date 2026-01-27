import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Edit2, Plane } from 'lucide-react';

interface GenerativeTripProps {
    tripData: any;
    onGenerate: () => void;
    onEdit: () => void;
    loading: boolean;
}

function GenerativeTripUi({ tripData, onGenerate, onEdit, loading }: GenerativeTripProps) {
    return (
        <div className="w-full bg-white dark:bg-gray-800 rounded-xl border p-5 shadow-lg space-y-4">
            <div className="flex items-center gap-3 border-b pb-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                    <Plane className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                    <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100">Ready to Plan?</h3>
                    <p className="text-xs text-gray-500">Here's your trip summary</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                    <span className="text-gray-400 text-xs block">Destination</span>
                    <span className="font-medium">{tripData?.destination || 'N/A'}</span>
                </div>
                <div>
                    <span className="text-gray-400 text-xs block">Duration</span>
                    <span className="font-medium">{tripData?.tripDuration} Days</span>
                </div>
                <div>
                    <span className="text-gray-400 text-xs block">Travelers</span>
                    <span className="font-medium">{tripData?.groupSize}</span>
                </div>
                <div>
                    <span className="text-gray-400 text-xs block">Budget</span>
                    <span className="font-medium">{tripData?.budget}</span>
                </div>
            </div>

            <div className="flex gap-3 pt-2">
                <Button
                    variant="outline"
                    className="flex-1 gap-2"
                    onClick={onEdit}
                    disabled={loading}
                >
                    <Edit2 className="h-4 w-4" /> Edit
                </Button>
                <Button
                    variant="default"
                    className="flex-1 gap-2 bg-linear-to-r from-blue-600 to-violet-600 text-white hover:from-blue-700 hover:to-violet-700 border-none"
                    onClick={onGenerate}
                    disabled={loading}
                >
                    {loading ? <Sparkles className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                    {loading ? 'Generating...' : 'Generate Plan'}
                </Button>
            </div>
        </div>
    );
}

export default GenerativeTripUi;
