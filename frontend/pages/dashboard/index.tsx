import { NextPage } from "next";
import React, { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import Axios from 'axios';
import { Layout, Row, Card, Divider, Form, Input, Button, Menu } from 'antd'
import styles from '../../styles/Dashboard.module.css';
import { useRouter } from 'next/dist/client/router';
import Title from "antd/lib/typography/Title";
import ComprarPassagem from "./components/ComprarPassagem";
const { Content } = Layout

const Dashboard: NextPage = () => {
    const router = useRouter();
    const [cidade, setCidade] = useState("");
    const [userInfo, setUserInfo] = useState({});


    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position: any) => {
                Axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=7fa2088935e74c6e89efeead2987cd78`).then((resp) => {
                    setCidade(resp.data.results[0].components.city);
                })
            });
        }
        setUserInfo(JSON.parse(localStorage.getItem('userData') ?? ""));
    }, [])

    const minhasPassagens = () => {
        router.push('/minhas_passagens');
    }
    const minhaConta = () => {
        router.push('/minhas_conta');
    }

    return (
        <Layout>
            <Content className={styles.content}>
                <div className={styles.container}>
                    <Row justify="space-between"
                        align="stretch">
                        <Title>Welcome {userInfo.username ?? "User"}</Title>
                        <Row style={{  }}>
                            <Menu mode="horizontal">
                                <Menu.Item 
                                onClick={()=>{minhasPassagens();}}
                                >Minha Passagens</Menu.Item>
                                <Menu.Item
                                 onClick={()=>{minhaConta()}}
                                 >Minha Conta</Menu.Item>
                            </Menu>
                        </Row>
                    </Row>
                    <Divider style={{ marginBottom: "10px" }} />

                    <Row justify="space-around"
                        align="middle"
                        style={{ display: "block", backgroundColor: "#ddd", padding: "2rem" }}>
                        <ComprarPassagem cidade={cidade} />
                    </Row>
                </div>
            </Content>
        </Layout>
    );
}

export default Dashboard