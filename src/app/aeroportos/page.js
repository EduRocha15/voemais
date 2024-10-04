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

    const [aeroportos, setAeroportos] = useState([])

    useEffect(()=>{
        setAeroportos(JSON.parse(localStorage.getItem('aeroportos')) || [])
    }, [])

    function excluir(id) {
        if(confirm("Deseja realmente excluir o registro?")){
            const dados = aeroportos.filter(item => item.id != id)
            localStorage.setItem('aeroportos', JSON.stringify(dados))
            setAeroportos(dados)
        }
    }

    return (
        <Pagina titulo="Lista de Aeroportos">

            <Link 
                href="/aeroportos/create" 
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
                    {aeroportos.map((item, i) => (
                        <tr key={item.id}>
                            <td>
                                <Link href={`/aeroportos/form/${item.id}`}>
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
                            <td>{item.sigla}</td>
                            <td>{item.uf}</td>
                            <td>{item.cidade}</td>
                            <td>{item.pais}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Pagina>
    )
}