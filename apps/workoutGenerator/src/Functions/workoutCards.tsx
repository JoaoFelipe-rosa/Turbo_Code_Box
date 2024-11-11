/* eslint-disable @next/next/no-img-element */
"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useLoading } from "../../../../Functions/hooks/IsLoading";
import Ringsloader from "../../../../Functions/Loaders/Ringsloader";

enum Sex {
    MALE = "MALE",
    FEMALE = "FEMALE",
    OTHER = "OTHER",
}

enum ExerciseType {
    CARDIO = "CARDIO",
    STRENGTH = "STRENGTH",
    FLEXIBILITY = "FLEXIBILITY",
    BALANCE = "BALANCE",
}
interface WorkoutItem {
    id: number;
    img: string | null;
    exerciseName: string;
    type: ExerciseType;
    repetition: number;
    repetitionAmount: number;
    sex: Sex;
}
interface DaysOfWeek {
    Segunda: WorkoutItem[];
    Terça: WorkoutItem[];
    Quarta: WorkoutItem[];
    Quinta: WorkoutItem[];
}

export default function WorkoutCards() {
    const apiUrl = "http://localhost:8080/exercise";
    const [loading, setLoading] = useLoading(false);
    const [Workout, setWorkout] = useState<WorkoutItem[]>([]);
    const [selectedDay, setSelectedDay] = useState<string>("Segunda");
    const [daysOfWeek, setDaysOfWeek] = useState<DaysOfWeek>({
        Segunda: [],
        Terça: [],
        Quarta: [],
        Quinta: [],
    });
    const filteredWorkout = daysOfWeek[selectedDay as keyof DaysOfWeek] || [];

    function filtrarPorTipo(
        exercicios: WorkoutItem[],
        tipoDesejado: ExerciseType
    ): WorkoutItem[] {
        return exercicios.filter(exercicio => exercicio.type === tipoDesejado);
    }

    async function getWorkout() {
        setLoading(true);
        axios
            .get(apiUrl)
            .then(response => {
                const data = response.data;
                console.log(data);
                setWorkout(data);
                setDaysOfWeek({
                    Segunda: filtrarPorTipo(Workout, ExerciseType.STRENGTH),
                    Terça: filtrarPorTipo(Workout, ExerciseType.CARDIO),
                    Quarta: filtrarPorTipo(Workout, ExerciseType.FLEXIBILITY),
                    Quinta: filtrarPorTipo(Workout, ExerciseType.BALANCE),
                });
            })
            .catch((err: string) => {
                err;
            });
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }

    // async function deleteWorkout(id: number) {
    //   setLoading(true);
    //   await axios.delete(`${apiUrl}${id}`);
    //   getWorkout();
    //   // setTimeout(() => {
    //   setLoading(false);
    //   // }, 2000);
    // }

    useEffect(() => {
        getWorkout();
    }, []);

    console.log(daysOfWeek);
    return (
        <>
            <div className="flex flex-col items-center justify-between">
                <select
                    value={selectedDay}
                    onChange={e => {
                        setSelectedDay(e.target.value);
                    }}
                    className="p-2 border rounded mb-4 text-black"
                >
                    <option value="Segunda">Segunda</option>
                    <option value="Terça">Terça</option>
                    <option value="Quarta">Quarta</option>
                    <option value="Quinta">Quinta</option>
                </select>
                {loading ? (
                    <Ringsloader />
                ) : (
                    <>
                        {!filteredWorkout || filteredWorkout.length === 0 ? (
                            <>
                                <h1>sem treino</h1>
                                <button
                                    onClick={() => {
                                        getWorkout();
                                    }}
                                >
                                    {" "}
                                    testa ai
                                </button>
                            </>
                        ) : (
                            filteredWorkout.map(exercise => (
                                <div
                                    className="flex flex-row h-32 gap-3 border rounded bg-[#386180] m-2 items-center "
                                    key={exercise.id}
                                >
                                    <div className="text-center px-10">
                                        <h1>{selectedDay}</h1>
                                    </div>
                                    <div className="flex flex-col px-5 border-x-2 h-32 justify-around w-full">
                                        <div>
                                            Exercicio: {exercise.exerciseName}
                                        </div>
                                        <div>
                                            repetiçoes: {exercise.repetition} X{" "}
                                            {exercise.repetitionAmount}
                                        </div>
                                        <div>
                                            Tipo de Exercio: {exercise.type}
                                        </div>
                                    </div>
                                    <div>
                                        {exercise.img == null ? (
                                            <h1 className="p-4">
                                                {" "}
                                                Exemplo nao cadastrada
                                            </h1>
                                        ) : (
                                            <div>
                                                <iframe
                                                    src={exercise.img}
                                                    title={
                                                        exercise.exerciseName
                                                    }
                                                    width="150"
                                                ></iframe>
                                                <img
                                                    src={exercise.img}
                                                    alt=""
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </>
                )}
            </div>
        </>
    );
}
