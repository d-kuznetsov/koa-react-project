import Layout from '../components/Layout'
import Button from '../components/Button'
import {useState} from 'react';

const SignUp = props => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, name, password })
        }).then(async (res)=>{
            const {success, errorMessage} = await res.json();
            if (success) {
                location.href = '/chat';
            } else {
                setErrorMessage(errorMessage)
            }
        })
    }

    return <Layout>
        <div className="sign-up-page">
            <form className="sign-up-page-form" onSubmit={handleSubmit}>
                <input
                    className="sign-up-page-form-item"
                    type="text" value={email} placeholder="Email" required
                    onChange={(e)=>setEmail(e.target.value)}>
                </input>
                <input
                    className="sign-up-page-form-item"
                    type="text" value={name} placeholder="Name" required
                    onChange={(e)=>setName(e.target.value)}>
                </input>
                <input
                    className="sign-up-page-form-item"
                    type="password" value={password}
                    autoComplete="current-password" placeholder="Password" required
                    onChange={(e)=>setPassword(e.target.value)}>
                </input>
                <Button className="sign-up-page-form-item" type="submit">Sign Up</Button>
                <div className="sign-up-page-form-item">{errorMessage}</div>
            </form>
        </div>
    </Layout>
}

export default SignUp