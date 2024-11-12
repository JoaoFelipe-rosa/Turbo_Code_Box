"use client";
import { useState } from "react";
import WorkoutCadastration from "./functions/workoutCadastration";
import WorkoutCards from "./functions/workoutCards";

export default function WorkoutGenerationPage() {
    const [screenCadastration, setScreenCadastration] = useState(true);
    return (
        <>
            <div className="flex flex-col justify-center items-center w-full ">
                <div className=" text-center w-[50%] m-5 p-3 border rounded bg-[#386180]">
                    {screenCadastration ? (
                        <WorkoutCards />
                    ) : (
                        <WorkoutCadastration />
                    )}
                </div>
                <button
                    onClick={() => {
                        setScreenCadastration(prev => !prev);
                    }}
                >
                    Change Screen
                </button>
            </div>
        </>
    );
}
