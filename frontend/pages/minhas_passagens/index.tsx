import { NextPage } from "next";
import React, { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import { RocketTwoTone } from '@ant-design/icons'
import { Layout, Row, Col, Card, Button, Typography } from 'antd'
import { useRouter } from 'next/dist/client/router';
const { Content } = Layout
const { Title, Text } = Typography

const MinhasPassagens: NextPage = () => {
    const [loading, setLoading] = useState(false);

    const [vooList, setVooList] = useState([]);
    const [assentosList, setAssentosList] = useState([]);

    const router = useRouter();

    const pegarPassagens = () => {
        setLoading(true);
        axios.get('/classes/Assento')
            .then(response => {
                setLoading(false);
                setAssentosList(response.data.results)
            })
            .catch(error => {
                setLoading(false);
            })
    }

    const getCompaniaName = (value: string) => {
        const compania: any = companiaAereaList.filter((compania: any) => compania.objectId === value)
        if (compania != undefined) {
            return compania[0].nome;
        }
    }

    const getVoo = (value: string) => {
        const voo: any = vooList.filter((voo: any) => voo.objectId === value)
        if (voo != undefined) {
            return voo[0];
        }
    }


    const getCompaniaAereaList = () => {
        setLoading(true);
        axios.get('/classes/CompaniaAerea')
            .then((response) => {
                setLoading(false);
                setCompaniaAereaList(response.data.results);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            })
    }
    const getDestinoList = () => {
        setLoading(true);
        axios.get('/classes/Voo').then((resp) => {
            setLoading(false);
            setVooList(resp.data.results);
        }).catch((err) => {
            setLoading(false);
            console.log(err);
        })

    }

    useEffect(() => {
        pegarPassagens()
        getDestinoList()
        getCompaniaAereaList()
    }, [])

    return (
        <Layout>
            <Content>
                <Row justify="space-around"
                    align="middle"
                    style={{ background: "#fff", width: "calc(100vw - 150px)", margin: " 5em auto", display: "block", padding:"2em" }}>
                    <Row align="top">
                        <Title style={{ color: '#2D4040', fontWeight: "bold", paddingTop: 45, marginLeft: "5em" }}>Suas Passagens</Title>
                    </Row>
                    <Card style={{ margin: "2em" }}>
                        {assentosList.length == 0 && (
                            <Card>
                                <Col>
                                    <Row justify="center" align="middle">
                                        <Title italic level={3}>Ops! Parece que você não tem nenhuma passagem comprada, vamos conhecer esse mundão?</Title>
                                    </Row>
                                    <Row justify="center" align="middle">
                                        <Button
                                            color={"red"}
                                            icon={
                                                <RocketTwoTone style={{ fontSize: '20px', color: 'white' }} />
                                            }
                                            type="default"
                                            onClick={(e) => {
                                                router.push('/dashboard');
                                            }}
                                        >Hora de Aventura</Button>

                                    </Row>
                                </Col>
                            </Card>
                        )}
                        <Col>
                            {!(assentosList.length == 0) && (
                                assentosList.map((assento: any) => {
                                    
                                    return <Card key={assento.objectId}>
                                        <Col>
                                            <Row justify="space-between" align="middle">
                                                <Text>Quantidade</Text>
                                                <Text strong >{assento.quantidade}</Text>
                                            </Row>
                                        </Col>
                                        <Col>
                                            <Row justify="space-between" align="middle">
                                                <Text>Preço:</Text>
                                                <Text strong type="success">R$ {assento.preco}</Text>
                                            </Row>
                                        </Col>
                                    </Card>
                                })
                            )}
                        </Col>
                    </Card>
                </Row>
            </Content>
        </Layout>
    );
}

export default MinhasPassagens