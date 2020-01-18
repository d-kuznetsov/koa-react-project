import Header from './Header';

const Layout = props => {
    const { isLogged = false } = props;
    return <div className="layout">
        {isLogged && <Header></Header>}
        <div className="layout-main">
            {isLogged && <div className="layout-sidebar">Sidebar</div>}
            <div className="layout-content">{props.children}</div>
            {isLogged && <div className="layout-sidebar">Sidebar</div>}
        </div>
    </div >
}
export default Layout;