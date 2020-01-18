import Router from 'next/router';
import Layout from '../components/Layout';
import Button from '../components/Button';

function HomePage() {
    return <Layout>
        <div className="home-page">
            <div className="home-page-content">
                <p className="home-page-text">
                    Welcome to the chat!
                </p>
                <Button className="home-page-button" onClick={()=>Router.push('/signup')}>
                    Sign Up
                </Button>
                <Button className="home-page-button" thema="white" onClick={()=>Router.push('/signin')}>
                    Sign In
                </Button>
            </div>
        </div>
    </Layout>
}

export default HomePage