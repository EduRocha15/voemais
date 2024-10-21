/* Edit e delete utilizando o form */

'use client'

import Pagina from "@/components/Pagina";
import PassageiroValidator from "@/validator/PassageiroValidator";
import {Formik} from "formik";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {useState} from "react";
import {Button, Form} from "react-bootstrap";
import {FaCheck} from "react-icons/fa";
import {MdOutlineArrowBack} from "react-icons/md";
import {v4} from 'uuid';

export default function Page({params}) {

    const route = useRouter()

    const passageiros = JSON.parse(localStorage.getItem('passageiros')) || []
    const dados = passageiros.find(item => item.id == params.id)
    const passageiro = dados || {
        nome: '',
        tipo_documento: '',
        documento: '',
        email: '',
        telefone: '',
        data_nascimento: ''
    }

    function salvar(dados) {

        if (passageiro.id) {
            Object.assign(passageiro, dados)
        } else {
            dados.id = v4()
            passageiros.push(dados)
        }

        localStorage.setItem('passageiros', JSON.stringify(passageiros))
        return route.push('/passageiros')
    }

    return (
        <Pagina titulo="Passageiro">

            <Formik
                initialValues={passageiro}
                onSubmit={values => salvar(values)}
                validationSchema={PassageiroValidator}>
                {
                    ({values, handleChange, handleSubmit, errors}) => {
                        return (
                            <Form>
                                <Form.Group className="mb-3" controlId="nome">
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="nome"
                                        value={values.nome}
                                        onChange={handleChange('nome')}
                                        isInvalid={errors.nome}/>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.nome}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="tipo_documento">
                                    <Form.Label>Tipo do Documento</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="tipo_documento"
                                        value={values.tipo_documento}
                                        onChange={handleChange('tipo_documento')}
                                        isInvalid={errors.tipo_documento}/>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.tipo_documento}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="documento">
                                    <Form.Label>Documento</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="documento"
                                        value={values.documento}
                                        onChange={handleChange('documento')}
                                        isInvalid={errors.documento}/>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.documento}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>E-mail</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange('email')}
                                        isInvalid={errors.email}/>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="telefone">
                                    <Form.Label>Telefone</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="telefone"
                                        value={values.telefone}
                                        onChange={handleChange('telefone')}
                                        isInvalid={errors.telefone}/>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.telefone}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="data_nascimento">
                                    <Form.Label>Data de Nascimento</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="data_nascimento"
                                        value={values.data_nascimento}
                                        onChange={handleChange('data_nascimento')}
                                        isInvalid={errors.data_nascimento}/>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.data_nascimento}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <div className="text-center">
                                    <Button onClick={handleSubmit} variant="success">
                                        <FaCheck/>
                                        Salvar
                                    </Button>
                                    <Link href="/passageiros" className="btn btn-danger ms-2">
                                        <MdOutlineArrowBack/>
                                        Voltar
                                    </Link>
                                </div>
                            </Form>
                        )
                    }
                }
            </Formik>
        </Pagina>
    )
}
