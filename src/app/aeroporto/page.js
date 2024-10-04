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

    const [aeroporto, setAeroporto] = useState([])

    useEffect(()=>{
        setAeroporto(JSON.parse(localStorage.getItem('aeroporto')) || [])
    }, [])

    function excluir(id) {
        if(confirm("Deseja realmente excluir o registro?")){
            const dados = aeroporto.filter(item => item.id != id)
            localStorage.setItem('empresas', JSON.stringify(dados))
            setAeroporto(dados)
        }
    }

    return (
        <Pagina titulo="Aeroporto">

            <Link 
                href="/aeroporto/create" 
                className="btn btn-primary mb-3"
            >
                <FaPlusCircle /> Novo
            </Link>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Sigla</th>
                        <th>uf</th>
                        <th>Cidade</th>
                        <th>País</th>
                    </tr>
                </thead>
                <tbody>
                    {empresas.map((item, i) => (
                        <tr key={item.id}>
                            <td>
                                <Link href={`/empresas/edit/${item.id}`}>
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
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Pagina>
    )
}