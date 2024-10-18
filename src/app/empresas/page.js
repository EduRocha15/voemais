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

    const [empresas, setEmpresas] = useState([])

    useEffect(()=>{
        setEmpresas(JSON.parse(localStorage.getItem('empresas')) || [])
    }, [])

    function excluir(id) {
        if(confirm("Deseja realmente excluir o registro?")){
            const dados = empresas.filter(item => item.id != id)
            localStorage.setItem('empresas', JSON.stringify(dados))
            setEmpresas(dados)
        }
    }

    return (
        <Pagina titulo="Empresas">

            <Link 
                href="/empresas/form" 
                className="btn btn-primary mb-3"
            >
                <FaPlusCircle /> Novo
            </Link>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Logo</th>
                        <th>Site</th>
                    </tr>
                </thead>
                <tbody>
                    {empresas.map((item, i) => (
                        <tr key={item.id}>
                            <td>
                                <Link href={`/empresas/form/${item.id}`}>
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
                            <td>
                                <a href={item.site}>
                                    <img src={item.logo} width={60} />
                                </a>                                
                            </td>
                            <td>{item.site}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Pagina>
    )
}