import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from '../components/Spinner'

function VerCliente() {
    const { id } = useParams();   //para leer los id que estamos utilizando
    const [cliente, setCliente] = useState({});
    const [cargando, setCargando] = useState(false);

    //Effect utilizado para ejecutar una vez al acceder a la ruta y que mande al state los datos del id 
    useEffect(()=>{ 
        setCargando(!cargando)
        const obtenerClienteAPI = async () => {
            try {
                const url = `http://localhost:4000/clientes/${id}`
                const respuesta = await fetch(url)
                const resultado = await respuesta.json()
                setCliente(resultado)
            } catch (error) {
                console.log(error)
            }
            setCargando(false)
        }
        obtenerClienteAPI();
    },[]);


    return (

        cargando ? <Spinner/> : 
        Object.keys(cliente).length === 0 ? 
        <p>No Hay resultados</p> : (

            <div>
                <h1 className="font-black text-4xl text-blue-900 ">Cliente</h1>
                <p className="mt-3">Información del cliente</p>

                    <>
                        <p className="text-2xl text-gray-600 mt-10">
                            <span className="text-gray-800 uppercase font-bold">Nombre: </span>
                            {cliente.nombre}
                        </p>
                        <p className="text-2xl text-gray-600 mt-4">
                            <span className="text-gray-800 uppercase font-bold">Email: </span>
                            {cliente.email}
                        </p>
                        {cliente.telefono && (
                            <p className="text-2xl text-gray-600 mt-4">
                                <span className="text-gray-800 uppercase font-bold">Teléfono: </span>
                                {cliente.telefono}
                            </p>
                        )}
                        <p className="text-2xl text-gray-600 mt-4">
                            <span className="text-gray-800 uppercase font-bold">Empresa: </span>
                            {cliente.empresa}
                        </p>
                        {cliente.notas && (
                            <p className="text-2xl text-gray-600 mt-4">
                                <span className="text-gray-800 uppercase font-bold">Notas: </span>
                                {cliente.notas}
                            </p>
                        )}
                    </>
            </div>

        )
    );
}

export default VerCliente;