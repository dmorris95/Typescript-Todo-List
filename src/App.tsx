import React from 'react';
import './App.css';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import AuthenticationGuard from './components/Authentication-guard';
import Dashboard from './components/Dashboard';
import CallbackPage from './components/CallbackPage';
import TaskDetails from './components/TaskDetails';
import TaskForm from './components/TaskForm';
import Login from './components/Login';
import NavBar from './components/NavBar';
import { Container, Row } from 'react-bootstrap';


const App: React.FC = () => {
  const { isLoading } = useAuth0();

  if(isLoading) return (<div>Loading...</div>)
  
  return (<TaskProvider>
    <Container>
      <Row>
        <NavBar />
      </Row>
      <Row>
      
        <Routes>
          <Route path='/' element={<Navigate to='/login'></Navigate>}/>
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard'
            element={<AuthenticationGuard component={Dashboard} />}
          />
          <Route path='/edit-task/:id'
            element={<AuthenticationGuard component={TaskForm} />} /> 
          <Route path='/task-form'
            element={<AuthenticationGuard component={TaskForm} />}
          />
          <Route path='/task-details/:id'
            element={<AuthenticationGuard component={TaskDetails} />}
          />
          <Route path='/callback' element={<CallbackPage />} />
        </Routes>

      
      </Row>
    </Container></TaskProvider>
  );
}

export default App;
