import Layout from '../components/Layout'
import Button from '../components/Button'
import Router from 'next/router'
import {useState} from 'react';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        }).then(async (res)=>{
            const {success, errorMessage} = await res.json();
            if (success) {
                location.href = '/chat';
                //Router.replace('/chat');
            } else {
                setErrorMessage(errorMessage)
            }
        })
    }

    return <Layout>
      <div className="sign-in-page">
            <form className="sign-in-page-form" onSubmit={handleSubmit}>
                <input
                    className="sign-in-page-form-item"
                    type="text" value={email} placeholder="Email" required
                    onChange={(e)=>setEmail(e.target.value)}>
                </input>
                <input
                    className="sign-in-page-form-item"
                    type="password" value={password}
                    autoComplete="current-password" placeholder="Password" required
                    onChange={(e)=>setPassword(e.target.value)}>
                </input>
                <Button className="sign-in-page-form-item" type="submit">Sign In</Button>
                <div className="sign-in-page-form-item">{errorMessage}</div>
            </form>
        </div>
    </Layout>
}

export default SignIn