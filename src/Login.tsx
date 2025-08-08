import { useState, type FormEvent, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './lib/supabaseClient';
import { AuthContext } from './contexts/AuthContext';
import { type AuthResponse } from '@supabase/supabase-js';

function Login(){
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMsg, setErrorMsg] = useState<string>('');
    const navigate = useNavigate();
    const {session} = useContext(AuthContext);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const {error} : AuthResponse = await supabase.auth.signInWithPassword({email, password});
        if (error)
        {
            setErrorMsg(error.message);
        } else {
            navigate('/board', {replace: true});
        }
    }

    useEffect(() => {
        if (session) {
            navigate('/board', {replace: true});
        }
    }, [session, navigate])

    return(
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <input type='email' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} required/>
            <input type='password' placeholder='Password' value={password} onChange={ e => setPassword(e.target.value)} required />
            <button type = "submit">Sign In</button>
            {errorMsg && <p>{errorMsg}</p>}
        </form>
    );
};

export default Login


