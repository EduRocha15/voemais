/* Edit e delete utilizando o form */
'use client'

import Pagina from "@/components/Pagina";
import apiLocalidade from "@/services/apiLocalidade";
import AeroportoValidator from "@/validator/AeroportoValidator";
import {Formik} from "formik";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useState, useEffect} from "react";
import {Button, Form} from "react-bootstrap";
import {FaCheck} from "react-icons/fa";
import {MdOutlineArrowBack} from "react-icons/md";
import {v4} from 'uuid';

export default function Page({params}) {

    const route = useRouter()

    const aeroportos = JSON.parse(localStorage.getItem('aeroportos')) || []
    const dados = aeroportos.find(item => item.id == params.id)
    const aeroporto = dados || {
        nome: '',
        sigla: '',
        pais: 'Brasil',
        uf: '',
        cidade: ''
    }

    const [paises, setPaises] = useState([])
    const [ufs, setUfs] = useState([])
    const [cidades, setCidades] = useState([])
    const [camposBrasil, setCamposBrasil] = useState(false)

    useEffect(() => {

        apiLocalidade
            .get(`paises?orderBy=nome`)
            .then(resultado => {
                setPaises(resultado.data)

            })

        apiLocalidade
            .get(`estados?orderBy=nome`)
            .then(resultado => {
                setUfs(resultado.data)
            })

    })

    function salvar(dados) {

        if (aeroporto.id) {
            Object.assign(aeroporto, dados)
        } else {
            dados.id = v4()
            aeroportos.push(dados)
        }

        localStorage.setItem('aeroportos', JSON.stringify(aeroportos))
        return route.push('/aeroportos')
    }

    return (
        <Pagina titulo="Aeroporto">

            <Formik
                initialValues={aeroporto}
                onSubmit={values => salvar(values)}
                validationSchema={AeroportoValidator}>
                {
                    ({values, handleChange, handleSubmit, errors}) => {
                        useEffect(() => {
                            setCamposBrasil(values.pais == 'Brasil')
                        }, [values.pais])

                        useEffect(() => {
                            apiLocalidade
                                .get(`estados/${values.uf}/municipios`)
                                .then(resultado => {
                                    setCidades(resultado.data)
                                })
                        }, [values.uf])

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
                                <Form.Group className="mb-3" controlId="sigla">
                                    <Form.Label>Sigla</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="sigla"
                                        value={values.sigla}
                                        onChange={handleChange('sigla')}
                                        isInvalid={errors.sigla}/>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.sigla}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="pais">
                                    <Form.Label>País</Form.Label>
                                    <Form.Select
                                        aria-label="Default select example"
                                        name="pais"
                                        value={values.pais}
                                        onChange={handleChange('pais')}
                                        isInvalid={!!errors.pais}>
                                        <option>Selecione</option>
                                        {
                                            paises.map(
                                                item => (<option key={item.nome} value={item.nome}>{item.nome}</option>)
                                            )
                                        }
                                    </Form.Select>
                                </Form.Group>
                                {
                                    camposBrasil && <> < Form.Group className = "mb-3" controlId = "uf" > <Form.Label>UF</Form.Label>

                                        <Form.Select
                                            aria-label="Default select example"
                                            name="uf"
                                            value={values.uf}
                                            onChange={handleChange('uf')}>
                                            <option>Selecione</option>
                                            {
                                                ufs.map(item => (
                                                    <option key={item.sigla} value={item.sigla}>
                                                        {item.sigla}
                                                        - {item.nome}
                                                    </option>
                                                ))
                                            }
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="cidade">
                                        <Form.Label>Cidade</Form.Label>
                                        <Form.Select
                                            aria-label="Default select example"
                                            name="cidade"
                                            value={values.cidade}
                                            onChange={handleChange('cidade')}>
                                            <option>Selecione</option>
                                            {
                                                cidades.map(item => (
                                                    <option key={item.nome} value={item.nome}>
                                                        {item.nome}
                                                    </option>
                                                ))
                                            }
                                        </Form.Select>
                                    </Form.Group>
                                </>
                                }
                                <div className="text-center">
                                    <Button onClick={handleSubmit} variant="success">
                                        <FaCheck/>
                                        Salvar
                                    </Button>
                                    <Link href="/aeroportos" className="btn btn-danger ms-2">
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
