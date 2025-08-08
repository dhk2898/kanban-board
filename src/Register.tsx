import {useContext, useEffect, useState, type FormEvent} from 'react';
import { supabase } from './lib/supabaseClient';
import { type AuthResponse } from '@supabase/supabase-js';
import { AuthContext } from './contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function Register()
{
    const [email, setEmail] = useState<string>('');
    const [password,setPassword] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const {session} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const {error} : AuthResponse = await supabase.auth.signUp({email, password});
        setMessage(error?.message ?? 'Confirmation email sent. Please check your inbox');
        if (error)
        {
            setMessage(error.message)
        } else {
            setMessage("Confirmation email sent, redirecting to login...");
            setTimeout(() => navigate('/login', {replace: true}), 1500)
        }
    };
    
    return(
    <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <input type = 'email' placeholder='Email' value = {email} onChange = {e => setEmail(e.target.value)} required/>
        <input type = 'password' placeholder = 'Password' value={password} onChange={e => setPassword(e.target.value)} required/>
        <button type = 'submit'>Sign Up</button>
        {message && <p>{message}</p>}
    </form>);
    
};

export default Register