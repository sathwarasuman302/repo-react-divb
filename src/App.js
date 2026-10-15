import { lazy,Suspense } from 'react';
import { Routes, Route } from "react-router-dom";
import "./App.css";

const Login=lazy(()=>import( "./components/Login"));
const Dashboard=lazy(()=>import( "./components/Dashboard"));
const AddUser=lazy(()=>import( "./components/AddUser"));
const EditUser=lazy(()=>import( "./components/EditUser"));

function App() {
    return (
        <Suspense fallback={<div className='Loading'>Loading...</div>}>
        <Routes>

            <Route path="/login" element={<Login />}/>

            <Route path="/dashboard" element={<Dashboard />} />

            <Route
                path="/users/add"
                element={<AddUser />}
            />

            <Route
                path="/users/edit/:id"
                element={<EditUser />}
            />

        </Routes>
        </Suspense>
    );
}

export default App;
