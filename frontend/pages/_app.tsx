import '../styles/globals.css'
import 'antd/dist/antd.css';

import styles from '../styles/Home.module.css'

import Link from 'next/link'
import type { AppProps } from 'next/app'

import { RocketTwoTone, LogoutOutlined } from '@ant-design/icons'
import { ConfigProvider, Row, Col, Typography, Button, Layout } from 'antd'
import pt_BR from 'antd/lib/locale/pt_BR'
import { useRouter } from 'next/dist/client/router';


const { Title } = Typography
const { Header } = Layout;


function MyApp({ Component, pageProps }: AppProps) {

  const router = useRouter();

  const logout = () => {
    localStorage.clear();
    router.replace('/login')
  }

  return (
    <ConfigProvider locale={pt_BR}>
      <Header>
        <Header>
          <Row
            gutter={8}
            align="middle"
            justify="space-between"
            style={{ width: "95%" }}
          >
            <Col>
              <Row justify="end" align="middle">
                <Col>
                  <Title
                    level={5}
                    style={{
                      marginBottom: 0,
                      color: '#fff',
                      fontSize: '1.6rem'
                    }}
                  >Your Journey</Title>

                </Col>
              </Row>
            </Col>
            <Col>

              {(router.asPath == "/login" || router.asPath == "/cadastro_usuario" || router.asPath == "/" ) && (
                <Link href="/login">
                  <Button
                    color={"red"}
                    icon={
                      <RocketTwoTone style={{ fontSize: '20px', color: 'white' }} />
                    }
                    type="default"
                  >Hora de Aventura</Button>
                </Link>
              )}

              {(router.asPath != "/login" && router.asPath != "/cadastro_usuario" && router.asPath != "/") && (
                <Button
                  onClick={logout}
                  color={"red"}
                  icon={
                    <LogoutOutlined
                      style={{ fontSize: '15px', color: 'blue' }} />
                  }
                  type="default"
                >Logout</Button>
              )}

            </Col>
          </Row>
        </Header>
      </Header>
      <Component {...pageProps} />
    </ConfigProvider>
  )
}

export default MyApp
