import { useAuth0 } from "@auth0/auth0-react";
import { Container } from "react-bootstrap";

const CallbackPage: React.FC = () => {
    const {error} = useAuth0();

    if (error) {
        return <div>OOPS... {error.message}</div>
    }

    return (
        <Container>
            <h1>This is the callback Page in case of errors</h1>
            <p>Try picking an option from the Navigation Bar</p>
        </Container>
    )
};

export default CallbackPage;