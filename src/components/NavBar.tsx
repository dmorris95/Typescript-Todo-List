import { Nav, Navbar } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
    const { isAuthenticated, logout } = useAuth0();

    const handleLogout = () => { 
        logout({ logoutParams: { 
            returnTo: window.location.origin 
            } 
        });
    };


    return (
        <Navbar variant="dark" bg="dark" className="p-3 rounded-4 mt-2">
            <Navbar.Brand as={Link} to='/dashboard'>Task Manager</Navbar.Brand>
            <Nav>
                {isAuthenticated && 
                    <>
                        <Nav.Link as={Link} to='/dashboard'>Dashboard</Nav.Link>
                        <Nav.Link as={Link} to='/task-form'>Add Task</Nav.Link>
                        <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                    </>
                }
                {!isAuthenticated &&
                    <>
                        <Nav.Link as={Link} to='/login'>Login</Nav.Link>
                    </>
                }
            </Nav>
        </Navbar>
    )
};

export default NavBar;