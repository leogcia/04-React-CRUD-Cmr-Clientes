import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Alerta from './Alerta';
import Spinner from './Spinner';

function Formulario({cliente, cargando}) {
    const navigate = useNavigate();  //hook para redirecionar al usuario a otra pagina

    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string()
                    .min(3, 'El nombre es muy corto')
                    .max(20, 'El nombre es muy largo')
                    .required('El nombre es obligatorio'),
        empresa: Yup.string().required('Campo obligatorio'),
        email: Yup.string()
                    .email('Email no válido')
                    .required('Email es obligatorio'),
        telefono: Yup.number()
                    .integer('Número no válido')
                    .positive('Número no válido')
                    .typeError('Número no válido'),   //Cuando algun validador no acepta nuestro mensajes de errores como number(), usar typeError() para poder modificarlo
        notas:''
    })

    const handleSubmit = async (valores) => {
        let respuesta
        try {
            if(cliente.id) {
                //Editando un Registro
                const url = `${import.meta.env.VITE_API_URL}/${cliente.id}`
                respuesta = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(valores),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
            } else {
                //Nuevo Registro
                const url = import.meta.env.VITE_API_URL
                respuesta = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(valores),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
            }
            await respuesta.json()
            navigate('/clientes');   //Redirecionamos a clientes cuando completamos el formulario
        } catch (error) {
            console.log(error);
        }
    }

    return (
        cargando ? <Spinner/> : (

            <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
            <h1 className="text-gray-600 font-bold text-xl uppercase text-center">{cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}</h1>

            {/** pregunto en cada valor si existe algun parametro de cliente, en caso contrario pon un string vacio */}
            {/** enableReinitialize Ayuda a que si existen valores (provenientes de editar cliente) aparezcan en el formulario */}
            <Formik 
                initialValues={{
                    nombre: cliente?.nombre ?? '',      
                    empresa: cliente?.empresa ?? '',  
                    email: cliente?.email ?? '',  
                    telefono: cliente?.telefono ?? '',  
                    notas: cliente?.notas ?? '',  
                }} 
                enableReinitialize={true}        
                onSubmit={async (values, {resetForm})=>{
                    await handleSubmit(values)
                    resetForm()
                }}
                validationSchema={nuevoClienteSchema}
            >
                {({errors, touched})=>{

                return (
                    <Form
                        className='mt-10 '
                    >
                        <div className='mb-4'>
                            <label 
                                className='text-gray-800 '
                                htmlFor='nombre'
                            >Nombre:</label>
                            <Field
                                className="mt-2 block w-full p-3 bg-gray-50"
                                id="nombre"
                                type="text"
                                placeholder="Nombre del cliente"
                                name="nombre"
                            />
                            {errors.nombre && touched.nombre ? (
                                <Alerta>{errors.nombre}</Alerta>
                            ) : null}
                        </div>

                        <div className='mb-4'>
                            <label 
                                className='text-gray-800 '
                                htmlFor='empresa'
                            >Empresa:</label>
                            <Field
                                className="mt-2 block w-full p-3 bg-gray-50"
                                id="empresa"
                                type="text"
                                placeholder="Empresa del cliente"
                                name="empresa"
                            />
                            {errors.empresa && touched.empresa ? (
                            <Alerta>{errors.empresa}</Alerta>
                            ) : null}
                        </div>

                        <div className='mb-4'>
                            <label 
                                className='text-gray-800 '
                                htmlFor='email'
                            >Email:</label>
                            <Field
                                className="mt-2 block w-full p-3 bg-gray-50"
                                id="email"
                                type="email"
                                placeholder="Email del cliente"
                                name="email"
                            />
                            {errors.email && touched.email ? (
                                <Alerta>{errors.email}</Alerta>
                            ) : null}
                        </div>

                        <div className='mb-4'>
                            <label 
                                className='text-gray-800 '
                                htmlFor='telefono'
                            >Teléfono:</label>
                            <Field
                                className="mt-2 block w-full p-3 bg-gray-50"
                                id="telefono"
                                type="tel"
                                placeholder="Teléfono del cliente"
                                name="telefono"
                            />
                            {errors.telefono && touched.telefono ? (
                                <Alerta>{errors.telefono}</Alerta>
                            ) : null}
                        </div>

                        <div className='mb-4'>
                            <label 
                                className='text-gray-800 '
                                htmlFor='notas'
                            >Notas:</label>
                            <Field
                                className="mt-2 block w-full p-3 bg-gray-50 h-40"
                                id="notas"
                                as="textarea"
                                type="text"
                                placeholder="Notas del cliente"
                                name="notas"
                            />
                        </div>

                        <input
                            type="submit"
                            value={cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
                            className='mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg'
                        >
                        </input>
                    </Form>
                )}}
            </Formik>
        </div>

        )
    );
}

Formulario.defaultProps = {
    cliente: {},
    cargando: false
}

export default Formulario;