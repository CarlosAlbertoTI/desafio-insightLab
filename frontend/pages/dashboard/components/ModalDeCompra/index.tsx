import { NextPage } from "next";
import axios from '../../../../utils/axios';
import { Row, Col, Card, Divider, Button, Spin, Typography, Modal, InputNumber } from 'antd'
import { useState } from "react";
const { Title, Text } = Typography
const ModalCompras: NextPage = (props: any) => {
    const [countPassagens, setCountPassagens] = useState(1);
    const [loadingCompra, setLoadingCompra] = useState(false);

    const changeCountPassagens = (value: any) => {
        setCountPassagens(value);
    }

    const diminuirQuantidadePassagens = () => {
        axios.put(`/classes/Voo/${props.dados.objectId}`,{
            "quantidade_assentos":props.dados.quantidade_assentos-countPassagens
        }).then(response => {
            console.log("DEU BOM COM O BD")
        }).catch(error =>{
            console.log("DEU RUIM COM O BD")
        })
    }

    const consolidarComprar = () => {
        setLoadingCompra(true);
        const userData = localStorage.getItem('userData');
        const data = {
            "quantidade": countPassagens,
            "preco": countPassagens * props.dados.preco,
            "preco_unitario": props.dados.preco,
            "codigoVoo": {
                "__type": "Pointer",
                "className": "Voo",
                "objectId": props.dados.objectId
            },
            "codigoPassageiro": {
                "__type": "Pointer",
                "className": "_User",
                "objectId": userData.objectId
            }
        }
        axios.post('/classes/Assento',data).then((response) => { 
            setLoadingCompra(false);
            diminuirQuantidadePassagens()
            console.log(response.data.results)

        }).catch((error) => { 
            setLoadingCompra(false);
        })
    }

    return (
        <Modal
            title={"Detalhes da compra"}
            visible={props.visible}
            onOk={props.ok}
            onCancel={props.cancel}
            footer={[]}
        >
            <Spin spinning={loadingCompra}>
                <Card>
                    <Row justify="center" align="middle">
                        <Title>{props.dados.origem + " - " + props.dados.destino}</Title>
                    </Row>
                    <Divider />
                    <Card>
                        <Col>
                            <Row justify="center">
                                <Title style={{ fontSize: "1.2em" }}>Sobre a Passagem</Title>
                            </Row>
                        </Col>
                        <Col>
                            <Row justify="space-between">
                                <Text>Preço:</Text>
                                <Text strong type="success">R$ {props.dados.preco}</Text>
                            </Row>
                        </Col>
                        <Col flex="2">
                            <Row justify="space-between" align="middle">
                                <Text style={{ textAlign: 'left' }} >Quanidade de Assentos:</Text>
                                <Text style={{ textAlign: 'left' }} strong type="danger">{props.dados.quantidade_assentos}</Text>
                            </Row>
                        </Col>
                    </Card>
                    <Card>
                        <Col>
                            <Row justify="center">
                                <Title style={{ fontSize: "1.2em" }}>Quantidade de passagens a comprar</Title>
                            </Row>
                        </Col>
                        <Col flex="2">
                            <Row justify="space-between" align="middle">
                                <Text style={{ textAlign: 'left' }} >Quanidade de Assentos:</Text>
                                <InputNumber min={1} max={props.dados.quantidade_assentos} defaultValue={countPassagens} onChange={changeCountPassagens} />
                            </Row>
                            <Divider />
                            <Row justify="space-between" align="middle">
                                <Text>Total: </Text>
                                <Text strong type="success">R$ {countPassagens * props.dados.preco}</Text>
                            </Row>
                            <Row style={{ marginTop: "2rem" }}>
                                <Button type="primary" block onClick={consolidarComprar}>
                                    Comprar
                                </Button>
                            </Row>
                        </Col>
                    </Card>
                </Card>
            </Spin>

        </Modal>
    )
};

export default ModalCompras;