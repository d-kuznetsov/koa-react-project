const Button = props => {
    let { 
        className, 
        children, 
        onClick, 
        thema = 'black', 
        type ='button'
    } = props;
    className += ` button button-thema-${thema}`;
    return <button className={className} onClick={onClick} type={type}>
        {children}
    </button>
}

export default Button;