import { useNavigate } from "react-router-dom";
import { useTaskContext } from "../context/TaskContext";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const { state, dispatch } = useTaskContext();
    const { tasks } = state;

    const handleNav = () => {
        //Navigate to create task
        navigate('/task-form');
    };

    return (
        <Container>
            <h1 className="text-center display-2">Task Manager Dashboard</h1>
            {tasks.length === 0 ? (
                <div className="text-center">
                    <p>No tasks yet! Try adding a task first!</p>
                    <Button variant="dark" onClick={handleNav}>
                        Add Task
                    </Button>
                </div>
            ) : (
                <Row>
                    {tasks.map(task => (
                    <Col key={task.id} sm={12} md={6} lg={4} className="mb-4">
                        <Card className="bg-dark text-white">
                            <Card.Body>
                                <Card.Title>{task.title}</Card.Title>
                                <Card.Text>
                                    <strong>Due Date: {task.dueDate}</strong>
                                </Card.Text>
                                <Button variant="light" onClick={() => navigate(`/task-details/${task.id}`)}>
                                    View Details
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    ))}
                </Row>
            )}
        </Container>
    )
}

export default Dashboard;