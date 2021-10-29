import { NextPage } from "next";
import React, { useState } from 'react';
import axios from '../../utils/axios';
import { Layout, Row, Card, Divider, Form, Input, Button, Alert } from 'antd'

import { useRouter } from 'next/dist/client/router';
import Link from "next/dist/client/link";
const { Content } = Layout

const Login: NextPage = () => {

    const [loading, setLoading] = useState(false);
    const [messegeError, setMessageError] = useState("");
    const router = useRouter();
    const logar = ({ email, password }: any) => {
        setLoading(true);
        setMessageError("");
        console.log("testando API");
        console.log(email, password);
        axios.post('/login', {
            email,password
        })
            .then((resp) => {
                setLoading(false);
                localStorage.setItem('userData', JSON.stringify(resp.data))
                router.push('/dashboard')
            }).catch((err) => {
                setLoading(false);
                setMessageError("E-mail ou Senha invalidos!");
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

                            <h2 style={{ color: '#2D4040', fontWeight: "bold", paddingTop: 45 }}>Faça Login para continuar</h2>
                        </Row>
                        <Divider />
                        <Form onFinish={logar}>
                            {
                                messegeError != "" && (
                                    <div style={{ marginBottom: 25, color: "#F05152" }}>
                                        <Alert message={messegeError} type="error" showIcon closable />
                                    </div>
                                )
                            }
                            <Form.Item name="email" rules={[
                                {
                                    required: true,
                                    message: "Por favor, insira sua E-mail"
                                }
                            ]}>
                                <Input size="large" placeholder="Insira seu email" type="email" />
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
                                <Input.Password size="large" placeholder="Insira sua senha" type="password" />
                            </Form.Item>
                            <Form.Item>
                                {loading && (
                                    <>
                                        <Row style={{ marginBottom: "10px" }}>
                                            <Button type="default" loading disabled block shape="round" htmlType="submit">Entrar</Button>
                                        </Row>
                                        <Row>
                                            <Button type="dashed" loading disabled block shape="round" >Cadastrar</Button>
                                        </Row>
                                    </>
                                )}
                                {!loading && (
                                    <>
                                        <Row style={{ marginBottom: "10px" }}>
                                            <Button type="default" block shape="round" htmlType="submit">Entrar</Button>
                                        </Row>
                                        <Row>
                                            <Link href="/cadastro_usuario">
                                                <Button type="dashed" block shape="round">Cadastrar</Button>
                                            </Link>
                                        </Row>
                                    </>
                                )}
                            </Form.Item>
                        </Form>
                    </Card>
                </Row>
            </Content>
        </Layout>
    );
}

export default Login