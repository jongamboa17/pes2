// @ts-nocheck

'use client';

import React, { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import cn from 'classnames';
import { Field, Form, Formik } from 'formik';
import Link from 'next/link';
import * as Yup from 'yup';

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const SignUp = () => {
  const supabase = createClientComponentClient();
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

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
        setSuccessMsg('Bienvenido! Revisa tu correo para confirmar tu cuenta.');
        const { data } = await supabase.auth.getSession();
        let userdId = data.session.user.id;
        let arrayUser = [];
        arrayUser.push(userdId);
        //console.log(arrayUser[0]);
        
        //insertar en la tabla profiles
        const username = formData.email.split('@')[0];
        const updates = {
          username: username,
          updated_at: new Date(),
          role: 'Docente',
          email: formData.email,

        };
        //const { } = await supabase.from('profiles').update(updates).eq('id', arrayUser[0]);
        const { } = await supabase.from('profiles').update(updates).eq('id', arrayUser[0]);
        arrayUser = [];
        
      }
    } catch (exception) {
      console.error('Excepción capturada durante el registro:', exception);
      // Maneja la excepción aquí
    }
  }
  

  return (
    <div className="card">
      <h2 className="w-full text-center">Crear Usuario</h2>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={SignUpSchema}
        onSubmit={signUp}
      >
        {({ errors, touched }) => (
          <Form className="column w-full">
            <label htmlFor="email">Email</label>
            <Field
              className={cn('input', errors.email && 'bg-red-50')}
              id="email"
              name="email"
              placeholder="jane@acme.com"
              type="email"
            />
            {errors.email && touched.email ? (
              <div className="text-red-600">{errors.email}</div>
            ) : null}

            <label htmlFor="email">Contraseña</label>
            <Field
              className={cn('input', errors.password && touched.password && 'bg-red-50')}
              id="password"
              name="password"
              type="password"
            />
            {errors.password && touched.password ? (
              <div className="text-red-600">{errors.password}</div>
            ) : null}

            <button className="button-inverse w-full" type="submit">
              Guardar
            </button>
          </Form>
        )}
      </Formik>
      {errorMsg && <div className="text-red-600">{errorMsg}</div>}
      {successMsg && <div className="text-black">{successMsg}</div>}
      <Link href="/sign-in" className="link w-full">
        Ya tienes una cuenta? Inicia Sesion.
      </Link>
    </div>
  );
};

export default SignUp;
