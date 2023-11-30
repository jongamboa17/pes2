// @ts-nocheck

'use client';

import React, { useState, useRef } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import cn from 'classnames';
import { Field, Form, Formik } from 'formik';
import Link from 'next/link';
import * as Yup from 'yup';

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email('Correo Invalido').required('Campo requerido'),
  password: Yup.string().required('Campo requerido'),
  nombre: Yup.string().required('Campo requerido'),
  contacto: Yup.number().required('Campo requerido'),
});



const SignUpDocente = ({ modalId }) => {
  const supabase = createClientComponentClient();
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const passwordInputRef = useRef(null);
  const [asignaturas, setAsignaturas] = useState([]);

  const cerrarModal = () => {
    document.getElementById(modalId).checked = false;
  };
 
  const limpiarFormulario = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  const copyPasswordToClipboard = () => {
    const password = passwordInputRef.current.value;
    if (password) {
      navigator.clipboard.writeText(password)
        .then(() => {
          alert("Contraseña copiada al portapapeles");
        })
        .catch(err => {
          console.error('Error al copiar la contraseña: ', err);
        });
    }
  }

  // Función para generar una contraseña aleatoria
  const generatePassword = () => {
    const length = 8;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }
  

  async function signUp(formData) {
    try {
      const { user, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        // redirectTo: `${window.location.origin}/auth/callback`,
      });
      
  
      if (error) {
        setErrorMsg(error.message);
      } else {
        setSuccessMsg('Usuario creado correctamente', user);
        await updateLastProfile(formData);
        ///
        async function updateLastProfile(formData) {
          const { data: profiles, error } = await supabase
            .from('profiles')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(1);
      
          if (error) {
            console.error('Error al obtener el último perfil:', error);
            return;
          }
      
          const lastProfile = profiles[0];
          const updates = {
            username: formData.email.split('@')[0],
            updated_at: new Date(),
            role: 'Docente',
            email: formData.email,
            activo: formData.activo,
            number: formData.contacto,
            name: formData.nombre,
          };
      
          const { error: updateError } = await supabase
            .from('profiles')
            .update(updates)
            .eq('id', lastProfile.id);

            // Cerrar el modal
          cerrarModal();
      
          if (updateError) {
            console.error('Error al actualizar el perfil:', updateError);
          }
        }
        
      }
    } catch (exception) {
      console.error('Excepción capturada durante el registro:', exception);
      // Maneja la excepción aquí
    }
  }
  

  return (
    <div className="card bg-gray-100">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                            Nuevo Docente
      </h3>
      <Formik
        initialValues={{
          email: '',
          password: '',
          contacto: '',
          activo: true,
        }}
        validationSchema={SignUpSchema}
        onSubmit={signUp}
      >
        {({ errors, touched, setFieldValue }) => (
          <Form className="column w-full">
            <Field
              className={cn('input','border-gray-600', errors.email && 'bg-red-50')}
              id="email"
              name="email"
              placeholder="Correo Electrónico"
              type="email"
            />
            {errors.email && touched.email ? (
              <div className="text-red-600">{errors.email}</div>
            ) : null}

            
            <Field
              innerRef={passwordInputRef}
              className={cn('input','border-gray-600', errors.password && touched.password && 'bg-red-50')}
              id="password"
              name="password"
              type="password"
              placeholder="Contraseña de 8 caracteres"
            />
            {errors.password && touched.password ? (
              <div className="text-red-600">{errors.password}</div>
            ) : null}

            <div class="flex justify-center space-x-4">
                <button id="generar" 
                        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={() => setFieldValue('password', generatePassword())}
                        >
                        Generar Contraseña
                </button>
                <button onClick={copyPasswordToClipboard}
                        id="copiar" 
                        class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                        Copiar
                </button>
            </div>


            
            <Field
              className={cn('input', 'border-gray-600', errors.nombre && touched.nombre && 'bg-red-50')}
              id="nombre"
              name="nombre"
              type="name"
              placeholder="Nombre Completo"
            />
            {errors.nombre && touched.nombre ? (
              <div className="text-red-600">{errors.nombre}</div>
            ) : null}


            
            <Field
              className={cn('input','border-gray-600', errors.contacto && touched.contacto && 'bg-red-50')}
              id="contacto"
              name="contacto"
              type="phone"
              placeholder="Número de contacto"
            />
            
            <label>
            <Field type="checkbox" name="activo" className=""/>
            {'  '}Activo
          </label>

            <button className="button-inverse w-full" type="submit">
              Guardar
            </button>
          </Form>
        )}
      </Formik>
      {errorMsg && <div className="text-red-600">{errorMsg}</div>}
      {successMsg && <div className="text-black">{successMsg}</div>}
     {/*} <Link href="/sign-in" className="link w-full">
        Ya tienes una cuenta? Inicia Sesion.
      </Link>*/}
    </div>
  );
};

export default SignUpDocente;
