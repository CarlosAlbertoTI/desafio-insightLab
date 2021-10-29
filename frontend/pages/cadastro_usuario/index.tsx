import { NextPage } from "next";
import React, { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import { Layout, Row, Card, Divider, Form, Input, Button, Alert } from 'antd'
import { useRouter } from 'next/dist/client/router';
import Link from "next/dist/client/link";
const { Content } = Layout

const CadastroUsuario: NextPage = () => {
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
                    style={{ background: "#fff", height: "calc(100vh - 150px)" }}>
                    <Card>
                        <Row>

                            <h2 style={{ color: '#2D4040', fontWeight: "bold", paddingTop: 45 }}>Cadastra-se para usar o Sistema</h2>
                        </Row>
                        <Divider />
                        <Form onFinish={cadastrarUsuario}>
                            {
                                messegeError != "" && (
                                    <div style={{ marginBottom: 25, color: "#F05152" }}>
                                        <Alert message={messegeError} type="error" showIcon closable />
                                    </div>
                                )
                            }

                            <Form.Item name="username" rules={[
                                {
                                    required: true,
                                    message: "Por favor, insira seu nome",
                                    min: 5
                                }

                            ]}>
                                <Input size="large" placeholder="Insira seu nome" type="text" />
                            </Form.Item>
                            <Form.Item name="email" rules={[
                                {
                                    required: true,
                                    message: "Por favor, insira sua E-mail"
                                }

                            ]}>
                                <Input size="large" placeholder="Insira seu email" type="email
                                " />
                            </Form.Item>
                            <Form.Item name="password" rules={[
                                {
                                    required: true,
                                    message: "Por favor, insira sua senha"
                                },
                                {
                                    type: "string",
                                    min: 4,
                                    message: "Por favor, insira uma senha maior do que 04 digitos"
                                }
                            ]}>
                                <Input.Password size="large" placeholder="Insira sua senha" type="password
                                " />
                            </Form.Item>
                            <Form.Item>
                                {loading && (
                                    <Button type="default" loading disabled block shape="round" htmlType="submit"> Cadastrar</Button>
                                )}
                                {!loading && (
                                    <Button type="default" block shape="round" htmlType="submit"> Cadastrar</Button>
                                )}
                            </Form.Item>
                        </Form>
                    </Card>
                </Row>
            </Content>
        </Layout>
    );
}

export default CadastroUsuario