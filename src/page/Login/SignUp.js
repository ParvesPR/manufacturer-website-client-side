import React from 'react';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import useToken from '../../hooks/useToken';
import Loading from '../Shared/Loading';


const SignUp = () => {
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    const navigate = useNavigate();

    const [token] = useToken(gUser || user)

    let signUpError;
    if (gLoading || loading || updating) {
        return <Loading></Loading>
    };

    if (token) {
        navigate('/home')
    }

    if (error || gError || updateError) {
        signUpError = <p className='text-red-500 font-semibold text-sm mb-3'>{error?.message || gError.message || updateError}</p>
    };

    const onSubmit = async data => {
        await createUserWithEmailAndPassword(data.email, data.password);
        await updateProfile({ displayName: data.name });
        console.log(data);
    };
    return (
        <div className='flex h-screen justify-center items-center'>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-center font-bold text-2xl">Sign Up</h2>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* NAME FIELD */}
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="name"
                                placeholder="Name"
                                className="input input-bordered w-full max-w-xs"
                                {...register("name", {
                                    required: {
                                        value: true,
                                        message: 'Enter Your Name'
                                    },
                                })}
                            />
                            <label className="label">
                                {errors.name?.type === 'required' && <span className="label-text-alt font-semibold text-red-500">{errors.name.message}</span>}
                                {errors.name?.type === 'pattern' && <span className="label-text-alt font-semibold text-red-500">{errors.name.message}</span>}
                            </label>
                        </div>

                        {/* EMAIL FIELD */}
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="input input-bordered w-full max-w-xs"
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: 'Enter Your Email'
                                    },
                                    pattern: {
                                        value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                        message: 'Enter a valid email address'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.email?.type === 'required' && <span className="label-text-alt font-semibold text-red-500">{errors.email.message}</span>}
                                {errors.email?.type === 'pattern' && <span className="label-text-alt font-semibold text-red-500">{errors.email.message}</span>}
                            </label>
                        </div>

                        {/* PASSWORD FIELD */}
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Password"
                                className="input input-bordered w-full max-w-xs"
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: 'Password'
                                    },
                                    minLength: {
                                        value: 6,
                                        message: 'Password must be 6 character or more'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.password?.type === 'required' && <span className="label-text-alt font-semibold text-red-500">{errors.password.message}</span>}
                                {errors.password?.type === 'minLength' && <span className="label-text-alt font-semibold text-red-500">{errors.password.message}</span>}
                            </label>
                        </div>

                        {signUpError}
                        <input
                            className='btn w-full max-w-xs'
                            value="Sign up"
                            type="submit" />
                        <p className='text-md mt-3'>Already have an Account? <Link className='text-primary' to="/login">Please Login</Link></p>
                    </form>

                    <div className="divider">OR</div>
                    <button className="btn btn-outline"
                        onClick={() => signInWithGoogle()}
                    >Continue with Google</button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;