'use client'

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler } from 'react-hook-form'

import { auth } from '@/app/firebase'
type Inputs = {
  email: string
  password: string
}

export default function Register() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    await signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user
        router.push('/')
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        if (errorCode === 'auth/invalid-login-credentials') {
          alert('そのようなユーザーは存在しません。')
        } else {
          alert(errorMessage)
        }
      })
  }

  return (
    <>
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            ログイン
          </h2>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-6' action='#' method='POST'>
            <div>
              <label htmlFor='email' className='block text-sm font-medium leading-6 text-gray-900'>
                Email
              </label>
              <div className='mt-2'>
                <input
                  {...register('email', {
                    required: 'メールアドレスは必須です。',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'メールアドレスの形式が正しくありません。',
                    },
                  })}
                  id='email'
                  name='email'
                  type='email'
                  // autoComplete='email'
                  // required
                  className='p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
                {errors.email && (
                  <span className='text-red-600 text-sm'>{errors.email.message}</span>
                )}
              </div>
            </div>

            <div>
              <div className='flex items-center justify-between'>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Password
                </label>
              </div>
              <div className='mt-2'>
                <input
                  {...register('password', {
                    required: 'パスワードは必須です。',
                    minLength: {
                      value: 8,
                      message: 'パスワードは8文字以上で入力してください。',
                    },
                  })}
                  id='password'
                  name='password'
                  type='password'
                  // autoComplete='current-password'
                  // required
                  className='p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
                {errors.password && (
                  <span className='text-red-600 text-sm'>{errors.password.message}</span>
                )}
              </div>
            </div>

            <div>
              <button
                type='submit'
                className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                サインイン
              </button>
            </div>
            <div className='text-sm'>
              <Link
                href='/auth/register'
                className='font-semibold text-indigo-600 hover:text-indigo-500'
              >
                初めての方はこちら
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
