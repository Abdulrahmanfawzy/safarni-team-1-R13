"use client";

import { BackButton } from "@/components/shared/BackButton";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Camera, ChevronLeft, Star } from "lucide-react";
import { useRef, useState } from "react";

interface IProps {
    onBack: () => void;
}

export default function AddReview({ onBack }: IProps) {
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [photoName, setPhotoName] = useState("");
    const photoInputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="flex flex-col items-start gap-5  border-t-[0.5px] border-gray-200 ">
            
           

            <div className="mt-3 flex w-full flex-col items-center gap-2">
                <Button
                    type="button"
                    variant="ghost"
                    onClick={onBack}
                    className="relative flex w-full items-center justify-center gap-1.5 self-center p-0 text-lg font-medium text-primary hover:bg-transparent"
                >
                    <ChevronLeft className="absolute left-0 size-4 sm:size-5" />
                   <span className="w-full px-8 text-center text-xs text-gray-500 capitalize sm:text-sm lg:text-xl">Your Overall Rating Of This Product</span>
                </Button>
                
                <div
                    className="flex items-center gap-1"
                    role="group"
                    aria-label="Choose a rating"
                    onMouseLeave={() => setHoveredRating(0)}
                >
                    {Array.from({ length: 5 }, (_, index) => {
                        const starRating = index + 1;
                        const isActive = starRating <= (hoveredRating || rating);

                        return (
                            <button
                                key={starRating}
                                type="button"
                                onClick={() => setRating(starRating)}
                                onMouseEnter={() => setHoveredRating(starRating)}
                                aria-label={`${starRating} ${starRating === 1 ? "star" : "stars"}`}
                                aria-pressed={rating === starRating}
                                className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                            >
                                <Star
                                    size={20}
                                    className={isActive ? "fill-[#FCBA42] text-[#FCBA42]" : "text-gray-300"}
                                />
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="flex w-full flex-col items-start gap-2">
                <p className="text-sm font-medium text-gray-900 lg:text-lg">Add detailed review</p>
                <Textarea
                    aria-label="Add detailed review"
                    placeholder="Enter here"
                    className="min-h-24 w-full resize-y sm:min-h-28 lg:min-h-32"
                />
                <input
                    ref={photoInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) => setPhotoName(event.target.files?.[0]?.name ?? "")}
                />
                <Button
                    type="button"
                    variant="ghost"
                    onClick={() => photoInputRef.current?.click()}
                    className="flex items-center gap-1.5 self-start p-0 text-lg font-medium text-primary hover:bg-transparent"
                >
                    <Camera />
                    Add photo
                </Button>
                {photoName && <p className="text-sm text-gray-600">{photoName}</p>}
            </div>

            <Button className="h-12! w-full lg:h-14!">Submit</Button>

        </div>
    );
}
