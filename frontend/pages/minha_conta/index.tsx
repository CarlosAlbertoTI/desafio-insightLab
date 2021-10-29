import { NextPage } from "next";
import React, { useState } from 'react';
import axios from '../../utils/axios';
import { Layout, Row, Card, Divider, Form, Input, Button, Alert } from 'antd'
import { useRouter } from 'next/dist/client/router';
const { Content } = Layout

const MinhaConta: NextPage = () => {
    const [loading, setLoading] = useState(false);
    const [messegeError, setMessageError] = useState("");
    const router = useRouter();

    const cadastrarUsuario = ({ username, email, password }: any) => {
        setLoading(true);
        axios.post('/classes/_User', { username, email, password })
            .then(response => {
                setLoading(false);
                router.replace('login');
            })
            .catch(error => {
                setLoading(false);
                setMessageError('Tivemos um erro, tente mais tarde');
            })
    }

    return (
        <Layout>
            <Content>
                <Row justify="space-around"
                    align="middle"
                    style={{ background: "grey", height: "calc(100vh - 150px)" }}>
                    <Card>
                        <Row>

                            <h2 style={{ color: '#2D4040', fontWeight: "bold", paddingTop: 45 }}>Faça Login para continuar</h2>
                        </Row>
                        <Divider />
                        
                    </Card>
                </Row>
            </Content>
        </Layout>
    );
}

export default MinhaConta