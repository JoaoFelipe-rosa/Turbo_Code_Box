import WorkoutCadastration from "./Functions/workoutCadastration";
import WorkoutCards from "./Functions/workoutCards";

export default function WorkoutGenerationPage() {
    return (
        <>
            <div className="flex flex-col justify-center items-center w-full ">
                <div className="flex w-96 items-center ">
                    <div className=" text-center w-full m-10 border rounded bg-[#386180]">
                        <WorkoutCards />
                        <WorkoutCadastration />
                    </div>
                </div>
            </div>
        </>
    );
}
