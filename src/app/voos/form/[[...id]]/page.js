/* Edit e delete utilizando o form */

'use client'

import Pagina from "@/components/Pagina";
import VooValidator from "@/validator/VooValidator";
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

    const voos = JSON.parse(localStorage.getItem('voos')) || []
    const dados = voos.find(item => item.id == params.id)
    const voo = dados || {
        internacional: '',
        identificador: '',
        data_checkin: '',
        data_embarque: '',
        origem: '',
        destino: '',
        empresa: '',
        preco: ''
    }

    const [empresas, setEmpresas] = useState([])
    const [aeroportos, setAeroportos] = useState([])

    useEffect(() => {
        setEmpresas(JSON.parse(localStorage.getItem('empresas')) || []);
        setAeroportos(JSON.parse(localStorage.getItem('aeroportos')) || [])
    }, [])

    function salvar(dados) {

        if (voo.id) {
            Object.assign(voo, dados)
        } else {
            dados.id = v4()
            voos.push(dados)
        }

        localStorage.setItem('voos', JSON.stringify(voos))
        return route.push('/voos')
    }

    return (
        <Pagina titulo="Voos">

            <Formik
                initialValues={voo}
                onSubmit={values => salvar(values)}
                validationSchema={VooValidator}>
                {
                    ({values, handleChange, handleSubmit, errors}) => {
                        return (
                            <Form>
                                <Form.Group className="mb-3" controlId="internacional">
                                    <Form.Label>Internacional</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="internacional"
                                        value={values.internacional}
                                        onChange={handleChange('internacional')}
                                        isInvalid={errors.internacional}/>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.internacional}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="identificador">
                                    <Form.Label>Identificador</Form.Label>
                                    <Form.Select
                                        aria-label="Default select example"
                                        name="identificador"
                                        value={values.identificador}
                                        onChange={handleChange('identificador')}
                                        isInvalid={errors.identificador}>
                                        <option>Selecione</option>
                                        {
                                            empresas.map(item => (
                                                <option key={item.identificador} value={item.identificador}>
                                                    {item.identificador}
                                                </option>
                                            ))
                                        }
                                        <Form.Control.Feedback type="invalid">
                                            {errors.identificador}
                                        </Form.Control.Feedback>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="data_checkin">
                                    <Form.Label>Data de Checkin</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="data_checkin"
                                        value={values.data_checkin}
                                        onChange={handleChange('data_checkin')}
                                        isInvalid={errors.data_checkin}/>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.data_checkin}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="data_embarque">
                                    <Form.Label>Data de Embarque</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="data_embarque"
                                        value={values.data_embarque}
                                        onChange={handleChange('data_embarque')}
                                        isInvalid={errors.data_embarque}/>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.data_embarque}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="origem">
                                    <Form.Label>Origem</Form.Label>
                                    <Form.Select
                                        aria-label="Default select example"
                                        name="origem"
                                        value={values.origem}
                                        onChange={handleChange('origem')}
                                        isInvalid={errors.origem}>
                                        <option>Selecione</option>
                                        {
                                            aeroportos.map(item => (
                                                <option key={item.nome} value={item.nome}>
                                                    {item.sigla}
                                                    {item.nome}
                                                    - {item.uf}, {item.cidade}
                                                </option>
                                            ))
                                        }
                                        <Form.Control.Feedback type="invalid">
                                            {errors.origem}
                                        </Form.Control.Feedback>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="destino">
                                    <Form.Label>Destino</Form.Label>
                                    <Form.Select
                                        aria-label="Default select example"
                                        name="destino"
                                        value={values.destino}
                                        onChange={handleChange('destino')}>
                                        <option>Selecione</option>
                                        {
                                            aeroportos.map(item => (
                                                <option key={item.nome} value={item.nome}>
                                                    {item.sigla}
                                                    {item.nome}
                                                    - {item.uf}, {item.cidade}
                                                </option>
                                            ))
                                        }
                                        <Form.Control.Feedback type="invalid">
                                            {errors.destino}
                                        </Form.Control.Feedback>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="empresa">
                                    <Form.Label>Empresa</Form.Label>
                                    <Form.Select
                                        aria-label="Default select example"
                                        name="empresa"
                                        value={values.empresa}
                                        onChange={handleChange('empresa')}>
                                        <option>Selecione</option>
                                        {
                                            empresas.map(item => (
                                                <option key={item.nome} value={item.nome}>
                                                    {item.nome}
                                                </option>
                                            ))
                                        }
                                        <Form.Control.Feedback type="invalid">
                                            {errors.empresa}
                                        </Form.Control.Feedback>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="preco">
                                    <Form.Label>Preço</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="preco"
                                        value={values.preco}
                                        onChange={handleChange('preco')}/>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.preco}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <div className="text-center">
                                    <Button onClick={handleSubmit} variant="success">
                                        <FaCheck/>
                                        Salvar
                                    </Button>
                                    <Link href="/voos" className="btn btn-danger ms-2">
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
