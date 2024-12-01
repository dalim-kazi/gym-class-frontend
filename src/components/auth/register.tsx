'use client';
import { authRoutes } from '@/constants/end-point';
import useToaster from '@/hooks/useToaster';
import { useCreateResourceMutation } from '@/redux/api/curd';
import { tagTypes } from '@/redux/tag-types';
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import Input from '../common/input';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

type FormData = {
    fullName: string,
    email: string,
    password: string
};

const Register = () => {
    const showTost = useToaster();
    const navigate = useRouter();
    const methods = useForm<FormData>({
        defaultValues: {
            fullName: '',
            email: '',
            password: ''
        }
    });

    const { handleSubmit } = methods;
    const [registerUser, { isLoading }] = useCreateResourceMutation();

    const onSubmit = async (data: FormData) => {
        try {
            const payload = { ...data, role: 'trainee' };
            const response = await registerUser({
                url: authRoutes.register,
                tags: tagTypes.auth,
                payload
            }).unwrap();
            showTost('success', 'Registration successful!');
            navigate.push('/login');
        } catch (error: any) {
            showTost('error', error.data?.message || 'Registration failed!');
        }
    };

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
            <div className='max-w-md w-full bg-white p-8 rounded-lg shadow-md'>
                <h2 className='text-2xl font-bold text-center text-black mb-6'>
                    Create an Account
                </h2>
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Full Name */}
                        <Input
                            name='fullName'
                            label='Full Name'
                            labelClassName='text-white-light'
                            placeholder='Enter your full name'
                            rules={{ required: 'Full Name is required' }}
                            formClassName='mb-4'
                        />

                        {/* Email */}
                        <Input
                            name='email'
                            label='Email'
                            type='email'
                            labelClassName='text-white-light'
                            placeholder='Enter your email'
                            rules={{
                                required: 'Email is required',
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: 'Invalid email address'
                                }
                            }}
                            formClassName='mb-4'
                        />

                        {/* Password */}
                        <Input
                            name='password'
                            label='Password'
                            type='password'
                            labelClassName='text-white-light'
                            placeholder='Enter your password'
                            rules={{
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters long'
                                }
                            }}
                            formClassName='mb-6'
                        />

                        {/* Submit Button */}
                        <Button
                            type='submit'
                            className={`w-full py-2 px-4 bg-blue text-white-light font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                                isLoading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Registering...' : 'Register'}
                        </Button>
                    </form>
                </FormProvider>
            </div>
        </div>
    );
};

export default Register;