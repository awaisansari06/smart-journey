import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

const PRESET_DAYS = [1, 2, 3, 5, 7, 10, 14];

interface UiProps {
    onSelect: (value: number) => void;
    selected?: number;
    disabled?: boolean;
}

function TripDurationUi({ onSelect, selected, disabled }: UiProps) {
    const [customDays, setCustomDays] = React.useState<string>("");

    const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        if (val === '' || /^\d+$/.test(val)) {
            setCustomDays(val);
            if (val && parseInt(val) > 0) {
                onSelect(parseInt(val));
            }
        }
    };

    return (
        <div className="w-full bg-white dark:bg-gray-800 p-4 rounded-xl border shadow-sm">
            <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5 text-blue-500" />
                <h3 className="font-semibold text-gray-700 dark:text-gray-200">Select Trip Duration</h3>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
                {PRESET_DAYS.map((day) => (
                    <Button
                        key={day}
                        variant={selected === day ? "default" : "outline"}
                        className={cn(
                            "h-10 w-12 rounded-lg transition-all",
                            selected === day ? "bg-blue-600 hover:bg-blue-700" : "hover:bg-blue-50 dark:hover:bg-gray-700"
                        )}
                        onClick={() => !disabled && onSelect(day)}
                        disabled={disabled}
                    >
                        {day}
                    </Button>
                ))}
            </div>

            <div className="flex items-center gap-3 border-t pt-4">
                <span className="text-sm text-gray-500">Or custom days:</span>
                <Input
                    type="number"
                    placeholder="Ex. 5"
                    className="w-20 rounded-lg text-center"
                    value={customDays}
                    onChange={handleCustomChange}
                    min={1}
                    max={30}
                    disabled={disabled}
                />
                {selected && (
                    <div className="ml-auto bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                        Selected: {selected} Days
                    </div>
                )}
            </div>
        </div>
    );
}

export default TripDurationUi;
