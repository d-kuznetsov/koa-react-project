import Layout from '../components/Layout'
import Button from '../components/Button'
import { useContext } from 'react';
import { UserContext } from '../context';

const Chat = () => {
    const { user } = useContext(UserContext)
    return <Layout isLogged>
        <div>Name: {user.name}</div>
        <div>Email: {user.email}</div>
    </Layout>
}

export default Chat;