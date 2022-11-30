import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Detail from './pages/detail'
import Login from './pages/login'
import Register from './pages/register'

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/pages/:id" element={<Detail />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router