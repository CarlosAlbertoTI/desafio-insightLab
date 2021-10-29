import { NextPage } from "next";
import { Row, Col, Card, Divider, Button, Select, Slider, Spin, Typography } from 'antd'

import Title from "antd/lib/typography/Title";
import { useEffect, useState } from "react";
import { DollarCircleOutlined } from '@ant-design/icons'
import axios from "../../../../utils/axios";
import ModalCompras from "../ModalDeCompra";
const { Text } = Typography;
const { Option } = Select;

const ComprarPassagem: NextPage = (props: any) => {
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const [companiaAereaList, setCompaniaAereaList] = useState([]);
    const [vooList, setVooList] = useState([]);
    const [showVoos, setShowVoos] = useState([]);
    const [modalDados, setModalDados] = useState({});

    const [companiaAerea, setCompaniaAerea] = useState('');
    const [destino, setDestino] = useState('');
    const [origem, setOrigem] = useState('');
    const [preco, setPreco] = useState('');

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

    const getCompaniaName = (value: string) => {
        const compania: any = companiaAereaList.filter((compania: any) => compania.objectId === value)
        if (compania != undefined) {
            return compania[0].nome;
        }
    }

    const getDestinos = (value: any) => {
        let unique = new Map(value.map((obj: any) => [obj.amount, obj] && [obj.destino, obj]));
        const uniques = Array.from(unique.values());

        console.log("TESTADD");
        console.log(uniques);
        return uniques
    }

    const changeCompaniaAerea = (value: any) => {
        setCompaniaAerea(value);
    }
    const changeDestino = (value: any) => {

        setDestino(value);
    }
    const changeOrigem = (value: any) => {
        setOrigem(value);
    }
    const changePrice = (value: any) => {
        setPreco(value);
    }

    useEffect(() => {
        setLoading(true);
        getCompaniaAereaList();
        getDestinoList();
        setOrigem(props.cidade);
        setLoading(false);
    }, [showModal])


    useEffect(() => {
        setLoading(true);
        setShowVoos(vooList.filter((voo: any) => {

            if (props.cidade == undefined) {
                if (voo.preco <= preco && (voo.companiaAerea.objectId == companiaAerea) && (destino == voo.destino)) {
                    return voo;
                }
            } else {

                if ((voo.companiaAerea.objectId == companiaAerea) || ((voo.preco <= preco) || ((destino == voo.destino) && (voo.origem == origem)))) {
                    return voo;
                }
            }
        }));
        setLoading(false);
    }, [companiaAerea, preco, vooList, destino, origem, props.cidade])



    return (
        <Col>
            <Row justify="space-between">
                <Row>

                    {(companiaAereaList.length != 0) && (
                        <>
                            <Select showSearch placeholder="Selecione uma Compania Aerea" style={{ width: '22vw' }} size="large" onChange={changeCompaniaAerea}
                            >
                                {(
                                    companiaAereaList.map((compania: any) => {
                                        return <Option size="large" key={compania.objectId} value={compania.objectId}>{compania.nome}</Option>
                                    })
                                )}
                            </Select>

                            {
                                <Select showSearch placeholder="De onde quer ir?" size="large" style={{ width: '10vw' }} onChange={changeOrigem}>
                                    {getDestinos(vooList).map((destino: any) => {
                                        return <Option size="large" key={destino.destino} value={destino.destino}>{destino.destino}</Option>
                                    })}
                                </Select>
                            }
                            <Select showSearch placeholder="Para onde deseja ir?" size="large" style={{ width: '10vw' }} onChange={changeDestino}>
                                {(
                                    getDestinos(vooList).map((destino: any) => {
                                        return <Option size="large" key={destino.destino} value={destino.destino}>{destino.destino}</Option>
                                    })
                                )}
                            </Select>
                        </>
                    )}
                </Row>

                <Row >
                    <Title level={4}>Faixa de Preço</Title>
                    <Slider min={200} max={10000} style={{ width: "40vh", marginLeft: "20px" }} onChange={changePrice} defaultValue={30} tooltipVisible />
                </Row>
            </Row>
            <Row style={{ marginTop: "20px" }} justify="center">
                {!loading && (
                    showVoos.map((voo: any) => {
                        return <Card style={{ width: "22rem", margin: "1rem" }}
                            key={voo.objectId}
                            title={voo.origem + " - " + voo.destino}
                            headStyle={{
                                fontWeight: 'bold', color: '#ccc'
                                , fontSize: '1.8rem'
                                , display: 'flex'
                                , alignItems: 'center'
                                , justifyContent: 'center'

                            }}
                        >
                            <Col>
                                <Row justify="space-between" align="middle">
                                    <Title level={5}>Data: </Title>
                                    <Text>{voo.dataVoo.split(' ')[1] + " " + (voo.dataVoo.split(' ')[0].split("-")[2] + "/" + voo.dataVoo.split(' ')[0].split("-")[1] + "/" + voo.dataVoo.split(' ')[0].split("-")[0])}</Text>
                                </Row>
                            </Col>
                            <Row justify="space-between" align="middle">
                                <Title level={5}>Tempo de Voo:  </Title><Text>{voo.tempoVoo}</Text>
                            </Row>

                            <Col>
                                <Row justify="space-between" align="middle">
                                    <Title level={5}>Companhia Aerea: </Title><Text italic>{getCompaniaName(voo.companiaAerea.objectId)}</Text>
                                </Row>
                            </Col>
                            <Divider />
                            <Col>
                                <Row justify="space-between" align="middle">
                                    <Title strong level={5}>Preço: </Title><Text type="danger">R$ {voo.preco}</Text>
                                </Row>
                            </Col>
                            <Divider />
                            <Col>
                                <Row justify="center" align="middle">
                                    <Button icon={<DollarCircleOutlined />} style={{ backgroundColor: "green" }} type="primary" onClick={(e) => {
                                        setModalDados(voo);
                                        setShowModal(true);
                                    }} >Comprar Agora</Button>
                                </Row>
                            </Col>

                        </Card>
                    })
                )}
                <Spin spinning={loading}>
                </Spin>
            </Row>
            {showModal && (
                <ModalCompras cancel={(e: any) => { setShowModal(false) }} visible={showModal} dados={modalDados} />
            )
            }
        </Col>

    );

}

export default ComprarPassagem