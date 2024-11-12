"use client";
import { Formik, Form, Field } from "formik";
import axios from "axios";

export default function WorkoutCadastration() {
    const apiUrl = "http://localhost:8080/exercise/";

    function sendWorkout(value: object) {
        axios.post(apiUrl, value);
    }

    return (
        <>
            <h1>Cadastro de Treino</h1>
            <Formik
                initialValues={{
                    exerciseName: "",
                    repetition: "",
                    repetitionAmount: "",
                    sex: "",
                    type: "",
                }}
                onSubmit={values => {
                    sendWorkout(values);
                    console.log(values);
                }}
            >
                {() => (
                    <Form className=" flex flex-col text-black justify-between m-10">
                        <label htmlFor="name">Nome do exercicio</label>
                        <Field name="exerciseName" id="name" />
                        <label htmlFor="repetition">
                            Quantidade de Repetiçoes
                        </label>
                        <Field
                            name="repetition"
                            id="repetition"
                            type="number"
                        />
                        <label htmlFor="Type">Series</label>
                        <Field
                            id="repetitionAmount"
                            name="repetitionAmount"
                            type="number"
                        />
                        <label htmlFor="sex">Sexo</label>
                        <Field as="select" id="sex" name="sex" multiple={false}>
                            <option value="MALE">Homen</option>
                            <option value="FEMALE">Mulher</option>
                            <option value="OTHER">Outro</option>
                            <option value="" label="Selecione" />
                        </Field>
                        <label htmlFor="Type">Tipo de Treino</label>
                        <Field
                            as="select"
                            id="type"
                            name="type"
                            multiple={false}
                        >
                            <option value="CARDIO">Cardio</option>
                            <option value="STRENGTH">Força</option>
                            <option value="FLEXIBILITY">Flexibilidade</option>
                            <option value="BALANCE">Equilíbrio</option>
                            <option value="" label="Selecione" />
                        </Field>
                        <div className="flex container-login-form-btn justify-center mt-10">
                            <button
                                type="submit"
                                className="bg-slate-900 py-2 px-14 transition-all duration-500 ease-in-out hover:px-20 text-white rounded-3xl"
                            >
                                Entrar
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
}
