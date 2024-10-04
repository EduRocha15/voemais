'use client'

import Pagina from "@/components/Pagina"
import Link from "next/link"
import { useEffect } from "react";
import { useState } from "react";
import { Table } from "react-bootstrap"
import { FaPlusCircle } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


export default function Page() {

    const [passageiros, setPassageiros] = useState([])

    useEffect(()=>{
        setPassageiros(JSON.parse(localStorage.getItem('passageiros')) || [])
    }, [])

    function excluir(id) {
        if(confirm("Deseja realmente excluir o registro?")){
            const dados = passageiros.filter(item => item.id != id)
            localStorage.setItem('passageiros', JSON.stringify(dados))
            setPassageiros(dados)
        }
    }

    return (
        <Pagina titulo="Lista de Passageiros">

            <Link 
                href="/passageiros/create" 
                className="btn btn-primary mb-3"
            >
                <FaPlusCircle /> Novo
            </Link>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Tipo de Documento</th>
                        <th>N° do Documento</th>
                        <th>E-mail</th>
                        <th>Telefone</th>
                        <th>Data de Nascimento</th>
                    </tr>
                </thead>
                <tbody>
                    {passageiros.map((item, i) => (
                        <tr key={item.id}>
                            <td>
                                <Link href={`/passageiros/form/${item.id}`}>
                                <FaEdit
                                    className="text-primary"
                                    title="editar"
                                />
                                </Link>  &nbsp;
                                <MdDelete
                                    title="excluir"
                                    className="text-danger"
                                    onClick={()=>excluir(item.id)}
                                />
                            </td>
                            <td>{item.nome}</td>
                            <td>{item.tipo_documento}</td>
                            <td>{item.documento}</td>
                            <td>{item.email}</td>
                            <td>{item.telefone}</td>
                            <td>{item.data_nascimento}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Pagina>
    )
}