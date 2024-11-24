import { useNavigate, useParams } from "react-router-dom";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import Task from "../reducer/interfaces/Task";
import { useState, useEffect } from "react";
import { useTaskContext } from "../context/TaskContext";


const TaskForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [title, setTitle] = useState<string>('');
    const [dueDate, setDueDate] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const { state, dispatch } = useTaskContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            const existingTask = state.tasks.find(task => task.id === Number(id));
            if (existingTask) {
            setTitle(existingTask.title);
            setDueDate(existingTask.dueDate);
            setDescription(existingTask.description);
        }
        }
        
    }, [id, state.tasks]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        //Build Task object
        const task: Task = { 
            id: id ? Number(id) : Date.now(),
            title, 
            dueDate, 
            description
        };

        if (id) {
            //Edit the existing task
            dispatch({ type: 'EDIT_TASK', payload: task });
        } else {
            //Create a new task
            dispatch({ type: 'ADD_TASK', payload: task });
        }

        //Navigate to dashboard after update/add
        navigate('/dashboard')
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={6}>
                <h1 className="my-4 text-center">
                {id ? 'Edit Task' : 'Create Task'}
                </h1> 
                <Form className="bg-dark text-white p-3 rounded-3" onSubmit={handleSubmit}> 
                    <Form.Group controlId="formTitle"> 
                        <Form.Label>Title</Form.Label> 
                        <Form.Control 
                            type="text" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            required /> 
                    </Form.Group> 
                    <Form.Group controlId="formDueDate"> 
                        <Form.Label>Due Date</Form.Label> 
                        <Form.Control 
                        type="date" 
                        value={dueDate} 
                        onChange={(e) => setDueDate(e.target.value)} 
                        required /> 
                    </Form.Group> 
                    <Form.Group controlId="formDescription"> 
                        <Form.Label>Description</Form.Label> 
                        <Form.Control as="textarea" rows={3} 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        required /> 
                    </Form.Group> 
                    <Button variant="light" type="submit" className="mt-3"> 
                        {id ? 'Update Task' : 'Create Task'} 
                    </Button> 
                </Form>
                </Col>
            </Row> 
           
        </Container>
    );
};

export default TaskForm;