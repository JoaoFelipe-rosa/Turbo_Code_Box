import WorkoutGenerationPage from "@/workoutGenerationPage";

// import { useRouter } from "next/router";

// export default function Page() {
//     const router = useRouter();
//     return <p>Post: {router.query.slug}</p>;
// }
export default function Home() {
    return (
        <>
            <WorkoutGenerationPage />
        </>
    );
}
