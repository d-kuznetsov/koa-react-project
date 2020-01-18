import Link from 'next/link';

const handleClick = async e => {
    e.preventDefault();
    await fetch('/logout', {
        method: 'POST'
    });
    location.href = '/';
}

const Header = () => (
    <div className="header">
        <div className="header-content">
            <div className="header-nav">
                <Link href="/chat">
                    <a className="header-nav-item">Some Page</a>
                </Link>
                <Link href="/chat">
                    <a className="header-nav-item">Some Page</a>
                </Link>
            </div>
            <a className="header-logout" href="/" onClick={handleClick}>Log Out</a>
        </div>
    </div>
)

export default Header;