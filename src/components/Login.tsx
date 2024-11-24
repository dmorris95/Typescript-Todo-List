import { useAuth0 } from "@auth0/auth0-react"
import { Container, Button, Row } from "react-bootstrap"

const Login: React.FC = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    const handleLogin = async () => {
        await loginWithRedirect({
            appState: {
                returnTo: "/dashboard"
            },
            authorizationParams: {
                prompt: "login",
            },
        });
    };

    return (
        <Container className="justify-content-center align-items-center">
            <h1 className="display-4 p-3 my-2 text-center">User Login</h1>
            
            <Row className="d-flex justify-content-center">
                <Button style={{ width: '15%' }} type="submit" className="m-1" onClick={handleLogin}>
                Login
                </Button>
            </Row>
        </Container>
    )
};

export default Login;