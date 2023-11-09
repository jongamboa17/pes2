// @ts-nocheck

'use client';

import React, { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import cn from 'classnames';
import { Field, Form, Formik } from 'formik';
import Link from 'next/link';
import * as Yup from 'yup';

const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Correo Invalido').required('Requerido'),
  password: Yup.string().required('Requerido'),
});



const SignIn = () => {
  const supabase = createClientComponentClient();
  const [errorMsg, setErrorMsg] = useState(null);

  async function signIn(formData) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    //console.log('HOLA' + data.session.user.email);
    if (error) {
      setErrorMsg(error.message);
    }
  }

  return (
    <>
    
    <h1 className="mb-12 text-2xl font-bold sm:text-5xl">
              <span className="font-black text-green-500">Eco Centro Educativo Braulio C.</span>
              
    </h1>
    <div className="card">
      <h2 className=" w-full text-center">Inicio sesión</h2>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={SignInSchema}
        onSubmit={signIn}
      >
        {({ errors, touched }) => (
          <Form className="column w-full">
            <label htmlFor="email">Correo</label>
            <Field
              className={cn('input', errors.email && touched.email && 'bg-red-50')}
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

            <Link href="/reset-password" className="link w-full">
              Olvidó la Contraseña?
            </Link>

            <button className="button-inverse w-full" type="submit">
              Ingresar
            </button>
          </Form>
        )}
      </Formik>
      {errorMsg && <div className="text-red-600">{errorMsg}</div>}
      <Link href="/sign-up" className="link w-full">
        No tienes una cuenta? Registrate.
      </Link> 
    </div>
    </>
  );
};

export default SignIn;
