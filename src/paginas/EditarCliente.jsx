import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Formulario from "../components/Formulario";


function EditarCliente() {
    const { id } = useParams();   //para leer los id que estamos utilizando
    const [cliente, setCliente] = useState({});
    const [cargando, setCargando] = useState(false);

    //Effect utilizado para ejecutar una vez al acceder a la ruta y que mande al state los datos del id 
    useEffect(()=>{ 
        setCargando(!cargando)
        const obtenerClienteAPI = async () => {
            try {
                const url = `${import.meta.env.VITE_API_URL}/${id}`
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
        <>
            <h1 className="font-black text-4xl text-blue-900 ">Editar Cliente</h1>
            <p className="mt-3">Utiliza éste formulario para editar los datos</p>

            {cliente?.nombre ? (
                <Formulario
                    cliente={cliente}
                    cargando={cargando}
                />
            ): <p>**Cliente no encontrado**</p>}
        </>
    );
}

export default EditarCliente;