import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTaskContext } from "../context/TaskContext";
import Task from "../reducer/interfaces/Task";
import { Button, Card, Container } from "react-bootstrap";

const TaskDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { state, dispatch } = useTaskContext();
    const [task, setTask] = useState<Task | null>(null);

    //Check for task
    useEffect(() => {
        const existTask = state.tasks.find(task => task.id === Number(id));
        if (existTask) {
            setTask(existTask);
        }
    }, [id, state.tasks]);

    const handleEdit = () => {
        navigate(`/edit-task/${task?.id}`);
    };

    const handleDelete = () => {
        dispatch({ type: 'REMOVE_TASK', payload: Number(id) });
        //After delete navigate to dashboard
        navigate('/dashboard');
    };

    return (
        <Container>
            <h1 className="text-center display-2">Task Details</h1>
            {task ? (
                <Card className="bg-dark text-white">
                    <Card.Body>
                        <Card.Title className="text-center display-5">{task.title}</Card.Title>
                        <Card.Text className="text-center">
                            <h4>Due Date: {task.dueDate}</h4><br/>
                            <p>Description: {task.description}</p>
                        </Card.Text>
                        <div className="d-flex justify-content-center">
                            <Button variant="light" className="m-2" onClick={handleEdit}>Edit</Button>
                            <Button variant="danger" className="m-2" onClick={handleDelete}>Delete</Button>
                        </div>
                        
                    </Card.Body>
                </Card>
            ) : (
                <h4 className="text-center" onClick={() => navigate('/dashboard')}>Sorry no task selected. Try returning to the dashboard.</h4>
            )}
        </Container>
    )
};

export default TaskDetails;